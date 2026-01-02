const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const ServicesCtrl = require("../controllers/services.controller");
const isAdmin = require("../middleware/isAdmin.middleware");

router.post("/api/services", authMiddleware, isAdmin, ServicesCtrl.create);
{
  /**
   * @swagger
   * /api/services:
   *   post:
   *     summary: Create service
   *     tags: [Services]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - description
   *               - icon
   *             properties:
   *               title:
   *                 type: string
   *                 example: Branding
   *               description:
   *                 type: string
   *                 example: New demos are continually added and buying a single license for Mak gives you access to all of whats shown below, plus everything that will be added in the future.
   *               icon:
   *                  type: string
   *                  example: bi bi-star
   *     responses:
   *       201:
   *         description: Service created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Service created successfully
   *       400:
   *         description: 400 Bad Request — The request could not be understood by the server.
   *       500:
   *         description: Server xatosi
   */
}

router.get("/api/services/", ServicesCtrl.getAll);
{
  /**
   * @swagger
   * /api/services:
   *   get:
   *     summary: Get all services
   *     tags: [Services]
   *     responses:
   *       200:
   *         description: List of services
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     example: 1
   *                   title:
   *                     type: string
   *                     example: Branding
   *                   description:
   *                     type: string
   *                     example: New demos are continually added and buying a single license for Mak gives you access to all of whats shown below, plus everything that will be added in the future.
   *                   icon:
   *                     type: string
   *                     example: bi bi-star
   *       500:
   *         description: Server xatosi
   */
}

router.delete(
  "/api/services/:id",
  authMiddleware,
  isAdmin,
  ServicesCtrl.delete
);
{
  /**
   * @swagger
   * /api/services/{id}:
   *   delete:
   *     summary: Delete service
   *     tags: [Services]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Service ID
   *     responses:
   *       200:
   *         description: Service deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Service deleted successfully
   *       404:
   *         description: Service not found
   *       500:
   *         description: Server xatosi
   */
}
router.put("/api/services/:id", authMiddleware, isAdmin, ServicesCtrl.update)
{/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Title
 *               description:
 *                 type: string
 *                 example: Updated description text here...
 *               icon:
 *                 type: string
 *                 example: bi bi-pencil
 *             description: At least one field is required to update
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service updated successfully
 *       400:
 *         description: No update fields provided
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server xatosi
 */
}

module.exports = router;
