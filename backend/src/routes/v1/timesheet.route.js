const router = require("express").Router();
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const timesheetValidation = require("../../validations/timesheet.validation");
const timesheetController = require("../../controllers/timesheet.controller");
const { ROLES_DEFINITION } = require("../../config/roles");

router
  .route("/")
  .get(auth(ROLES_DEFINITION.GET_PROJECTS), timesheetController.getTimesheets)
  .post(
    auth(ROLES_DEFINITION.CREATE_PROJECT),
    validate(timesheetValidation.createTimesheet),
    timesheetController.createTimesheet
  );

router
  .route("/:id")
  .get(
    auth(ROLES_DEFINITION.GET_PROJECTS),
    validate(timesheetValidation.getTimesheet),
    timesheetController.getTimesheetById
  )
  .patch(
    auth(ROLES_DEFINITION.UPDATE_PROJECT),
    validate(timesheetValidation.updateTimesheet),
    timesheetController.updateTimesheet
  )
  .delete(
    auth(ROLES_DEFINITION.DELETE_PROJECT),
    validate(timesheetValidation.deleteTimesheet),
    timesheetController.deleteTimesheet
  );

module.exports = router;


/**
 * @swagger
 * tags:
 *  name: Projects
 *  description: CRUD operation on timesheet schema
 */
/**
 * @swagger
 * /timesheets:
 *   post:
 *    summary: Create new timesheet
 *    description: Only users that have create_timesheet permission can do this.It's used for creating a new timesheet from api
 *    tags: [Timesheets]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *               - startDate
 *               - managedBy
 *               - userId
 *            properties:
 *              managedBy:
 *                type: string
 *                description: mongoose.ObjectId
 *              userId:
 *                type: string
 *              startDate:
 *                type: string
 *              status:
 *                type: string
 *              tasks:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    projectId:
 *                      type: string
 *                    subtaskId:
 *                      type: string
 *                    days:
 *                      type: array
 *                      items:
 *                        type: string
 *            example:
 *                startDate: 03/01/2022
 *                userId: 618964ab5a4756ae27956fab
 *                status: open
 *                managedBy: 618964ab5a4756ae27956fab
 *                tasks: [{"projectId":"618964ab5a4756ae27956fab", "subtaskId": "fronted", "days":["0", "0"]}]
 *    responses:
 *      "201":
 *        description: Project Created Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Timesheet'
 *      "400":
 *         $ref: '#/components/responses/DuplicateNameProject'
 *      "401":
 *         $ref: '#/components/responses/Unauthorized'
 *      "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *      summary: Get all timesheets
 *      description: Only users that have get_timesheets permission can do this.
 *      tags: [Timesheets]
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
 *                     $ref: '#/components/schemas/Timesheet'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /timesheets/{id}:
 *   get:
 *     summary: Get a timesheet
 *     description: Only users that have get_timesheets permission can do this.
 *     tags: [Timesheets]
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
 *                $ref: '#/components/schemas/Timesheet'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a timesheet
 *     description: Only users that have update_timesheets permission can do this.
 *     tags: [Timesheets]
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
 *                 id: 5ebac534954b54139806c112
 *                 managedBy: 5ebac534954b54139806c112
 *                 startDate: 03/01/2022
 *                 userId: 5ebac534954b54139806c112
 *                 status: open
 *                 tasks: [{ "projectId": "5ebac534954b54139806c112", "subtaskId":"frontend_development", "days":["0", "0"] }]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Timesheet'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete a timesheet
 *     description: Only users that have delete_timesheets permission can do this.
 *     tags: [Timesheets]
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
