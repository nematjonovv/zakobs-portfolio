const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
const blogController = require("../controllers/blog.controller");
const blogUpload = require("../upload/blog.upload");
const router = express.Router();

router.post(
  "/api/blog",
  authMiddleware,
  isAdmin,
  blogUpload.single("blog_cover"),
  blogController.create
);

{
  /**
   * @swagger
   * /api/blog:
   *   post:
   *     summary: Create a new blog post
   *     tags: [Blog]
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
   *               - blog_cover
   *               - title
   *               - subtitle
   *               - content
   *             properties:
   *               blog_cover:
   *                 type: string
   *                 format: binary
   *                 description: Cover image for the blog post
   *               title:
   *                 type: string
   *                 description: Blog post title
   *               subtitle:
   *                 type: string
   *                 description: Blog post subtitle
   *               content:
   *                 type: string
   *                 description: Full content of the blog post
   *     responses:
   *       201:
   *         description: Blog post successfully created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 coverImage:
   *                   type: string
   *                 title:
   *                   type: string
   *                 subtitle:
   *                   type: string
   *                 content:
   *                   type: string
   *                 publishedDate:
   *                   type: string
   *                   format: date-time
   *                 public_id:
   *                   type: string
   *       400:
   *         description: Validation error or no file uploaded
   *       401:
   *         description: Unauthorized (invalid or missing token)
   *       403:
   *         description: Admin privileges required
   */
}

router.get("/api/blog", blogController.getAll);
{
  /**
   * @swagger
   * /api/blog:
   *   get:
   *     summary: Get all blog posts
   *     tags: [Blog]
   *     responses:
   *       200:
   *         description: Successfully retrieved blog posts
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   coverImage:
   *                     type: string
   *                   title:
   *                     type: string
   *                   subtitle:
   *                     type: string
   *                   content:
   *                     type: string
   *                   publishedDate:
   *                     type: string
   *                     format: date-time
   *                   public_id:
   *                     type: string
   *       500:
   *         description: Server error
   */
}
router.get("/api/blog/:id", blogController.getOne);
{
  /**
   * @swagger
   * /api/blog/{id}:
   *   get:
   *     summary: Get a single blog post by ID
   *     tags: [Blog]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Blog post ID
   *     responses:
   *       200:
   *         description: Successfully retrieved the blog post
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 coverImage:
   *                   type: string
   *                 title:
   *                   type: string
   *                 subtitle:
   *                   type: string
   *                 content:
   *                   type: string
   *                 publishedDate:
   *                   type: string
   *                   format: date-time
   *                 public_id:
   *                   type: string
   *       404:
   *         description: Blog post not found
   *       500:
   *         description: Server error
   */
}
router.delete("/api/blog/:id", authMiddleware, isAdmin, blogController.delete);
{
  /**
   * @swagger
   * /api/blog/{id}:
   *   delete:
   *     summary: Delete a blog post
   *     tags: [Blog]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Blog post ID
   *     responses:
   *       200:
   *         description: Blog post deleted successfully
   *       401:
   *         description: Unauthorized (invalid or missing token)
   *       403:
   *         description: Admin privileges required
   *       404:
   *         description: Blog post not found
   *       500:
   *         description: Server error
   */
}
router.put(
  "/api/blog/:id",
  authMiddleware,
  isAdmin,
  blogUpload.single("blog_cover"),
  blogController.update
);
{
  /**
   * @swagger
   * /api/blog/{id}:
   *   put:
   *     summary: Update a blog post
   *     tags: [Blog]
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
   *         description: Blog post ID
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               blog_cover:
   *                 type: string
   *                 format: binary
   *                 description: New blog cover image (optional)
   *               title:
   *                 type: string
   *                 description: Blog post title
   *               subtitle:
   *                 type: string
   *                 description: Blog post subtitle
   *               content:
   *                 type: string
   *                 description: Full content of the blog post
   *     responses:
   *       200:
   *         description: Blog post updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 coverImage:
   *                   type: string
   *                 title:
   *                   type: string
   *                 subtitle:
   *                   type: string
   *                 content:
   *                   type: string
   *                 publishedDate:
   *                   type: string
   *                   format: date-time
   *                 public_id:
   *                   type: string
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized (invalid or missing token)
   *       403:
   *         description: Admin privileges required
   *       404:
   *         description: Blog post not found
   *       500:
   *         description: Server error
   */
}

module.exports = router;
