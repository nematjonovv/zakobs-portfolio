const express = require("express");
const isAdmin = require("../middleware/isAdmin.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const clientsController = require("../controllers/clients.controller");
const clientUpload = require("../upload/client.upload");
const route = express.Router();

route.post(
  "/api/clients",
  authMiddleware,
  isAdmin,
  clientUpload.single("clientImage"),
  clientsController.create
);
/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client with image
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - clientImage  # ← bu muhim! clientUpload.single("clientImage") shu nom bilan
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: Apple
 *               clientImage:
 *                 type: string
 *                 format: binary
 *                 description: Client logo PNG/JPG
 *               bgcolor:
 *                 type: string
 *                 example: "#6b32b3"
 *                 description: Background color for client card
 *     responses:
 *       201:
 *         description: Client created successfully
 *       400:
 *         description: Validation error (missing fields)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 *       500:
 *         description: Server error
 */
route.get("/api/clients", clientsController.getAll);
/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       clientName:
 *                         type: string
 *                         example: Apple
 *                       image:
 *                         type: string
 *                         example: https://res.cloudinary.com/your-cloud/client.png
 *                       createdAt:
 *                         type: string
 *                         example: 2025-01-01T12:00:00Z
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       403:
 *         description: Forbidden (admin access required)
 *       500:
 *         description: Internal server error
 */

route.delete(
  "/api/clients/:id",
  authMiddleware,
  isAdmin,
  clientsController.delete
);
/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - public_id
 *             properties:
 *               public_id:
 *                 type: string
 *                 example: clients/apple_123
 *                 description: Cloudinary public_id to remove image
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Client deleted successfully
 *       404:
 *         description: Client not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

route.put(
  "/api/clients/:id",
  authMiddleware,
  isAdmin,
  clientUpload.single("clientImage"),
  clientsController.update
);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Update client data and optional image
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: Apple Inc
 *               bgcolor:
 *                 type: string
 *                 example: "#6b32b3"
 *               clientImage:
 *                 type: string
 *                 format: binary
 *                 description: New image (optional)
 *     responses:
 *       200:
 *         description: Client updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Client not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
module.exports = route;
