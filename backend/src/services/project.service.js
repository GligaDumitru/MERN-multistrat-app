const httpStatus = require("http-status");
const { Project } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create project
 * @param {Object} project
 * @returns {Promise<project>}
 */
const createProject = async (project) => {
  if (await Project.isNameTaken(project.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "The name of the project is already taken");
  }
  return Project.create(project);
};

/**
 * Gel All Projects
 * @returns {Promise<Project>}
 */
const getProjects = async () => {
  const projects = await Project.find({});
  return projects;
};

/**
 * Get Project by ID
 * @param {ObjectId} id
 * @returns {Promise<Project>}
 */
const getProjectById = async (id) => {
  return Project.findById(id);
};

/**
 * Update Project by id
 * @param {ObjectId} projectId
 * @param {Object} updatedBody
 * @returns {Promise<Project>}
 */
const updateProjectById = async (projectId, updatedBody) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
  }
  Object.assign(project, updatedBody);
  await project.save();
  return project;
};

/**
 * Delete Project by id
 * @param {ObjectId} id
 * @returns {Promise<Project>}
 */
const deleteProjectById = async (projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  await project.remove();
  return project;
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
