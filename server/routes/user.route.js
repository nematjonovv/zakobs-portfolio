const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
const usersController = require("../controllers/users.controller");
const route = express.Router();

route.get("/api/users", usersController.getAll);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users (Admin panel)
 *     description: |
 *       Returns a list of all users with their `username` and `role`.
 *       ❗ Password is never returned for security reasons.
 *       ❗ Only users with **admin** or **super-admin** roles can access this endpoint.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: johndoe
 *                   role:
 *                     type: string
 *                     example: admin
 *       401:
 *         description: Unauthorized – token is missing or invalid
 *       403:
 *         description: Forbidden – insufficient permissions
 */

route.delete("/api/users/:id", authMiddleware, isAdmin, usersController.delete);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin panel)
 *     description: |
 *       Deletes a user identified by the given ID.
 *       ❗ Only **admin** or **super-admin** users can perform this action.
 *       ❗ An admin cannot delete their own account.
 *       ❗ Password is not required for deletion, only the user's ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       401:
 *         description: Unauthorized – token is missing or invalid
 *       403:
 *         description: Forbidden – insufficient permissions or self-deletion attempt
 *       404:
 *         description: User not found
 */

module.exports = route;
