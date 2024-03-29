const router = require("express").Router();
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const projectValidation = require("../../validations/project.validation");
const projectController = require("../../controllers/project.controller");
const { ROLES_DEFINITION } = require("../../config/roles");

router
  .route("/")
  .get(auth(ROLES_DEFINITION.GET_PROJECTS), projectController.getProjects)
  .post(
    auth(ROLES_DEFINITION.CREATE_PROJECT),
    validate(projectValidation.createProject),
    projectController.createProject
  );

router
  .route("/:id")
  .get(
    auth(ROLES_DEFINITION.GET_PROJECTS),
    validate(projectValidation.getProject),
    projectController.getProjectById
  )
  .patch(
    auth(ROLES_DEFINITION.UPDATE_PROJECT),
    validate(projectValidation.updateProject),
    projectController.updateProject
  )
  .delete(
    auth(ROLES_DEFINITION.DELETE_PROJECT),
    validate(projectValidation.deleteProject),
    projectController.deleteProject
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Projects
 *  description: CRUD operation on project schema
 */
/**
 * @swagger
 * /projects:
 *   post:
 *    summary: Create new project
 *    description: Only users that have create_project permission can do this.It's used for creating a new project from api
 *    tags: [Projects]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *               - name
 *               - managedBy
 *            properties:
 *              managedBy:
 *                type: string
 *                description: mongoose.ObjectId
 *              name:
 *                type: string
 *              imageLink:
 *                type: string
 *              description:
 *                type: string
 *              address:
 *                type: string
 *              subtasks:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *            example:
 *                name: Project Name
 *                imageLink: www.placeholder.com/500
 *                description: this a Description
 *                address: Iasi, Romania
 *                managedBy: 618964ab5a4756ae27956fab
 *                subtasks: [{"name":"fronted development"}]
 *    responses:
 *      "201":
 *        description: Project Created Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      "400":
 *         $ref: '#/components/responses/DuplicateNameProject'
 *      "401":
 *         $ref: '#/components/responses/Unauthorized'
 *      "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *      summary: Get all projects
 *      description: Only users that have get_projects permission can do this.
 *      tags: [Projects]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project
 *     description: Only users that have get_projects permission can do this.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a project
 *     description: Only users that have update_projects permission can do this.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                - name
 *                - managedBy
 *             properties:
 *               managedBy:
 *                 type: string
 *                 description: mongoose.ObjectId
 *               name:
 *                 type: string
 *               imageLink:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               subtasks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *             example:
 *                 name: Project Name
 *                 imageLink: www.placeholder.com/500
 *                 description: this a Description
 *                 address: Iasi, Romania
 *                 managedBy: 618964ab5a4756ae27956fab
 *                 subtasks: [{"name":"fronted development"}]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Project'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete a project
 *     description: Only users that have delete_projects permission can do this.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
