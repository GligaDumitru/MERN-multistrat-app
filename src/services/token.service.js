const jwt = require("jsonwebtoken");
const moment = require("moment");
const httpStatus = require("http-status");
const config = require("../config/getEnv");
const Token = require("../models/token.model");
const ApiError = require("../utils/ApiError");
const tokenTypes = require("../config/token.type");

/**
 * Generate a token jwt based on userId and a secret
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {String} type
 * @param {String} secret
 * @returns {String}
 */

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token to DB
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} blackListed
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blackListed) => {
  const resToken = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blackListed,
  });

  return resToken;
};

/**
 * Verify token and return tokan from db or throw error is it is not valid
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blackListed: false,
  });
  if (!tokenDoc) {
    throw new ApiError("Token not found");
  }
  return tokenDoc;
};

/**
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  // set the expiration for access token
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  // generate access token
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpiratonDays,
    "days"
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  // save token to DB
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
