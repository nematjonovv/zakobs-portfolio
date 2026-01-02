const authController = require("../controllers/auth.controller");
const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Yangi admin qo'shish
 *     tags: [Authentication    ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: hikmatillo
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Foydalanuvchi allaqachon mavjud yoki noto'g'ri ma'lumot kiritilgan
 *       500:
 *         description: Server xatosi
 */
router.post("/auth/register", authMiddleware, isAdmin, authController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Tizimga kirish
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: hikmatillo
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Token muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token created successfully
 *       400:
 *         description: Foydalanuvchi allaqachon mavjud yoki noto'g'ri ma'lumot kiritilgan
 *       500:
 *         description: Server xatosi
 */
router.post("/auth/login", authController.login);

router.get("/auth/me", authMiddleware, authController.me);
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Token orqali foydalanuvchi ma'lumotlarini olish
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token valid va foydalanuvchi ma'lumotlari qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: hikmatillo
 *                 role:
 *                   type: string
 *                   example: admin
 *       401:
 *         description: Token yo'q yoki noto'g'ri / invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No token or invalid token
 *       500:
 *         description: Server xatosi
 */

module.exports = router;
