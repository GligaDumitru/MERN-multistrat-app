const urlToCall = "http://localhost:5000/v1/auth/register";

export const getToken = (type) => {
  const tokens = JSON.parse(window.localStorage.getItem("ems-tokens"));
  if (tokens) {
    return tokens[type] ? tokens[type].token : null;
  }
  return null;
};

const register = (data) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(urlToCall, requestOptions)
      .then((res) => res.json())
      .then((resjson) => resolve(resjson))
      .catch((err) => reject(err));
  });
};

export const getAPI = (url) => {
  return new Promise((resolve, reject) => {
    const tokens = JSON.parse(window.localStorage.getItem("ems-tokens"));
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens?.access?.token}`,
      },
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((resjson) => resolve(resjson))
      .catch((err) => reject(err));
  });
};

export const fetchAPIWithBearer = (data, url, method = 'POST') => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("access")}`,
      },
      body: JSON.stringify(data),
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((resjson) => resolve(resjson))
      .catch((err) => reject(err));
  });
};

export const fetchAPI = (data, url, method = "POST") => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((resjson) => resolve(resjson))
      .catch((err) => reject(err));
  });
};

export default register;
