const express = require("express");
const requestsController = require("../controllers/requests.controller");
const authMiddleware = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
const router = express.Router();

router.post("/api/requests", requestsController.create);
{
  /**
   *
   *   @swagger
   *   /api/requests:
   *     post:
   *       summary: Create a new request
   *       description: Allows users to send a new request or message through the contact form.
   *       tags: [Requests]
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               required:
   *                 - name
   *                 - email
   *                 - message
   *               properties:
   *                 name:
   *                   type: string
   *                   example: John Doe
   *                 email:
   *                   type: string
   *                   example: johndoe@example.com
   *                 message:
   *                   type: string
   *                   example: I would like to know more about your services.
   *       responses:
   *         201:
   *           description: Request successfully created
   *         400:
   *           description: Validation error
   *         500:
   *           description: Internal server error
   *
   */
}

router.get("/api/requests", authMiddleware, isAdmin, requestsController.getAll);
/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all requests
 *     description: Retrieve a list of all contact form requests (admin access only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of requests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Request'
 *       401:
 *         description: Unauthorized - authentication required
 *       403:
 *         description: Forbidden - admin access required
 *       500:
 *         description: Internal server error
 */
router.get(
  "/api/requests/:id",
  authMiddleware,
  isAdmin,
  requestsController.getOne
);
/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Get a single request by ID
 *     description: Retrieve detailed information about a specific request (admin only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ID of the request
 *     responses:
 *       200:
 *         description: Request found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Request'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Request not found
 *       401:
 *         description: Unauthorized - authentication required
 *       403:
 *         description: Forbidden - admin access required
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/api/requests/:id",
  authMiddleware,
  isAdmin,
  requestsController.delete
);
/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Delete a request
 *     description: Permanently remove a request from the database (admin only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request to delete
 *     responses:
 *       200:
 *         description: Request successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 deletedId:
 *                   type: string
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Request not found
 *       401:
 *         description: Unauthorized - authentication required
 *       403:
 *         description: Forbidden - admin access required
 *       500:
 *         description: Internal server error
 */
module.exports = router;

module.exports = router;
