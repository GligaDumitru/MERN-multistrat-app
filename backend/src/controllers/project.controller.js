const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { projectService, tokenService, emailService } = require("../services");

const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.body);
  res.status(httpStatus.CREATED).send({ project });
});

const getProjects = catchAsync(async (req, res) => {
  const projects = await projectService.getProjects();
  res.status(httpStatus.OK).send({
    projects,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "Project not found",
    ]);
  }
  res.status(httpStatus.OK).send({ project });
});

const updateProject = catchAsync(async (req, res) => {
  const project = await projectService.updateProjectById(
    req.params.id,
    req.body
  );
  res.status(httpStatus.OK).send({ project });
});

const deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteProjectById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
