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
 * /users/create:
 *   post:
 *    summary: Create a new Employee
 *    description: Only users that have create_user permission can do this.It's used for creating a new user from api. It will automatically send a verification email to verify email
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
 *               - email
 *               - password
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *                description: new user email, that should be uniq
 *              password:
 *                type: string
 *                format: password
 *                minLength: 8
 *                description: At least one number and one letter
 *              managedBy:
 *                type: string
 *                description: mongoose.ObjectId
 *            example:
 *                name: fake name
 *                email: fake@example.com
 *                password: password1
 *                managedBy: 618964ab5a4756ae27956fab
 *    responses:
 *      "201":
 *        description: Created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *      "401":
 *         $ref: '#/components/responses/Unauthorized'
 *      "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /users:
 *   post:
 *    summary: Create a user
 *    description: Only users that have create_user permission can do this.
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
 *               - email
 *               - password
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *                description: new user email, that should be uniq
 *              password:
 *                type: string
 *                format: password
 *                minLength: 8
 *                description: At least one number and one letter
 *            example:
 *                name: fake name
 *                email: fake@example.com
 *                password: password1
 *    responses:
 *      "201":
 *        description: Created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *      "401":
 *         $ref: '#/components/responses/Unauthorized'
 *      "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *      summary: Get all users
 *      description: Only users that have get_user permission can do this.
 *      tags: [Projects]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Project name
 *        - in: query
 *          name: role
 *          schema:
 *            type: string
 *          description: Project role
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: maxim number of rows
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
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
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
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
 *     summary: Update a user
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
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
 *
 *   delete:
 *     summary: Delete a user
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
