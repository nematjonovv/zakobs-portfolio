const express = require("express");
const uploadProject = require("../upload/project.upload");
const projectsController = require("../controllers/projects.controller");
const authMiddleware = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
const route = express.Router();

route.post(
  "/api/projects",
  uploadProject.single("projectImage"),
  authMiddleware,
  isAdmin,
  projectsController.create
);
/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Yangi loyiha uchun rasm yuklash
 *     tags: [Projects]
 *     security:
 *      - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - projectImage
 *             properties:
 *               projectImage:
 *                 type: string
 *                 format: binary
 *                 description: Yuklanadigan loyiha rasmi
 *     responses:
 *       201:
 *         description: Rasm muvaffaqiyatli yuklandi va URL qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 url:
 *                   type: string
 *                   example: https://res.cloudinary.com/your-cloud/projectImage.png
 *       400:
 *         description: Fayl tanlanmagan yoki noto‘g‘ri format
 *       500:
 *         description: Server xatosi
 */

route.get("/api/projects", projectsController.getAll);
/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Barcha loyihalarni olish
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Loyihalar ro‘yxati muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       image:
 *                         type: string
 *                         example: https://res.cloudinary.com/your-cloud/project.png
 *                       createdAt:
 *                         type: string
 *                         example: 2025-01-01T12:00:00Z
 *       500:
 *         description: Server xatosi
 */

route.get("/api/projects/:id", projectsController.getOne);
/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Bitta loyihani ID orqali olish
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Loyiha IDsi
 *     responses:
 *       200:
 *         description: Loyiha muvaffaqiyatli topildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     image:
 *                       type: string
 *                       example: https://res.cloudinary.com/your-cloud/project.png
 *                     createdAt:
 *                       type: string
 *                       example: 2025-01-01T12:00:00Z
 *       404:
 *         description: Loyiha topilmadi
 *       500:
 *         description: Server xatosi
 */

route.delete(
  "/api/projects/:id",
  authMiddleware,
  isAdmin,
  projectsController.delete
);
/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Loyihani o‘chirish
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O‘chiriladigan loyiha IDsi
 *     responses:
 *       200:
 *         description: Loyiha muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Project deleted successfully
 *       404:
 *         description: Loyiha topilmadi
 *       500:
 *         description: Server xatosi
 */

module.exports = route;
