const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
const uploadTestimonial = require("../upload/testimonial.upload");
const testimonialsController = require("../controllers/testimonials.controller");

const router = express.Router();

router.post(
  "/api/testimonials",
  authMiddleware,
  isAdmin,
  uploadTestimonial.single("testimonial_avatar"),
  testimonialsController.create
);
{
  /**
   * @swagger
   * /api/testimonials:
   *   post:
   *     summary: Create a new testimonial
   *     tags: [Testimonials]
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
   *               - testimonial_avatar
   *               - author
   *               - role
   *               - opinion
   *             properties:
   *               testimonial_avatar:
   *                 type: string
   *                 format: binary
   *                 description: Testimonial author image
   *               author:
   *                 type: string
   *                 example: Samantha Green
   *                 description: Name of the person giving the testimonial
   *               role:
   *                 type: string
   *                 example: Marketing Manager
   *                 description: Author's position or role
   *               opinion:
   *                 type: string
   *                 example: Excellent service, very professional and reliable.
   *                 description: Testimonial content
   *     responses:
   *       201:
   *         description: Testimonial created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     image:
   *                       type: string
   *                       example: https://res.cloudinary.com/your-cloud/image.png
   *                     public_id:
   *                       type: string
   *                       example: testimonials/avatar_123
   *                     author:
   *                       type: string
   *                       example: Samantha Green
   *                     role:
   *                       type: string
   *                       example: Marketing Manager
   *                     opinion:
   *                       type: string
   *                       example: Excellent service, very professional and reliable.
   *                     createdAt:
   *                       type: string
   *                       example: 2025-01-01T12:00:00Z
   *       400:
   *         description: Validation error (missing or empty fields)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Please complete all fields and add an image!
   *       401:
   *         description: Unauthorized (invalid or missing token)
   *       403:
   *         description: Forbidden (admin access required)
   *       500:
   *         description: Internal server error
   */
}

router.get("/api/testimonials", testimonialsController.getAll);
{
  /**
   * @swagger
   * /api/testimonials:
   *   get:
   *     summary: Get all testimonials
   *     tags: [Testimonials]
   *     responses:
   *       200:
   *         description: List of all testimonials
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
   *                       image:
   *                         type: string
   *                         example: https://res.cloudinary.com/your-cloud/image.png
   *                       public_id:
   *                         type: string
   *                         example: testimonials/avatar_123
   *                       author:
   *                         type: string
   *                         example: Samantha Green
   *                       role:
   *                         type: string
   *                         example: Marketing Manager
   *                       opinion:
   *                         type: string
   *                         example: Excellent service, very professional and reliable.
   *                       createdAt:
   *                         type: string
   *                         example: 2025-01-01T12:00:00Z
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Internal server error
   */
}
router.delete(
  "/api/testimonials/:id",
  authMiddleware,
  isAdmin,
  testimonialsController.delete
);
{
  /**
   * @swagger
   * /api/testimonials/{id}:
   *   delete:
   *     summary: Delete a testimonial
   *     tags: [Testimonials]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           example: 1
   *         description: ID of the testimonial to delete
   *     responses:
   *       200:
   *         description: Testimonial deleted successfully
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
   *                   example: Testimonial deleted successfully
   *       400:
   *         description: Invalid testimonial ID
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Invalid testimonial ID
   *       401:
   *         description: Unauthorized (invalid or missing token)
   *       403:
   *         description: Forbidden (admin access required)
   *       404:
   *         description: Testimonial not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Testimonial not found
   *       500:
   *         description: Internal server error
   */
}
router.put(
  "/api/testimonials/:id",
  authMiddleware,
  isAdmin,
  uploadTestimonial.single("testimonial_avatar"),
  testimonialsController.update
);
{
  /**
   * @swagger
   * /api/testimonials/{id}:
   *   put:
   *     summary: Update an existing testimonial
   *     tags: [Testimonials]
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
   *               - testimonial_avatar
   *               - author
   *               - role
   *               - opinion
   *             properties:
   *               testimonial_avatar:
   *                 type: string
   *                 format: binary
   *                 description: Testimonial author image
   *               author:
   *                 type: string
   *                 example: Samantha Green
   *                 description: Name of the person giving the testimonial
   *               role:
   *                 type: string
   *                 example: Marketing Manager
   *                 description: Author's position or role
   *               opinion:
   *                 type: string
   *                 example: Excellent service, very professional and reliable.
   *                 description: Testimonial content
   *     responses:
   *       200:
   *         description: Testimonial updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 1
   *                     image:
   *                       type: string
   *                       example: https://res.cloudinary.com/your-cloud/image.png
   *                     public_id:
   *                       type: string
   *                       example: testimonials/avatar_123
   *                     author:
   *                       type: string
   *                       example: Samantha Green
   *                     role:
   *                       type: string
   *                       example: Marketing Manager
   *                     opinion:
   *                       type: string
   *                       example: Excellent service, very professional and reliable.
   *                     updatedAt:
   *                       type: string
   *                       example: 2025-01-02T10:00:00Z
   *       400:
   *         description: Validation error (missing or empty fields)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Please complete all fields and add an image!
   *       401:
   *         description: Unauthorized (invalid or missing token)
   *       403:
   *         description: Forbidden (admin access required)
   *       404:
   *         description: Testimonial not found
   *       500:
   *         description: Internal server error
   */
}

module.exports = router;
