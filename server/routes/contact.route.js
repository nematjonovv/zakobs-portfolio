const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");
const contactController = require("../controllers/contact.controller");
const router = express.Router();

router.post("/api/contact", authMiddleware, isAdmin, contactController.create);
/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Create or update contact/social links
 *     description: |
 *       Creates a new contact entry with social media links and email.
 *       This is typically a single-entry resource for the portfolio owner's contact information.
 *       Only administrators can create/update this data.
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - instagram
 *               - dribbble
 *               - linkedin
 *               - email
 *             properties:
 *               instagram:
 *                 type: string
 *                 format: uri
 *                 example: https://instagram.com/yourusername
 *                 description: Valid Instagram profile URL
 *               dribbble:
 *                 type: string
 *                 format: uri
 *                 example: https://dribbble.com/yourusername
 *                 description: Valid Dribbble profile URL
 *               linkedin:
 *                 type: string
 *                 format: uri
 *                 example: https://www.linkedin.com/in/yourusername
 *                 description: Valid LinkedIn profile URL
 *               email:
 *                 type: string
 *                 format: email
 *                 example: hello@yourdomain.com
 *                 description: Contact email address
 *     responses:
 *       201:
 *         description: Contact information successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     instagram:
 *                       type: string
 *                     dribbble:
 *                       type: string
 *                     linkedin:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *
 *       400:
 *         description: Validation error (missing or invalid fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Instagram link is required", "Please enter a valid email address"]
 *
 *       401:
 *         description: Unauthorized - authentication required
 *
 *       403:
 *         description: Forbidden - admin access required
 *
 *       409:
 *         description: Conflict - contact entry already exists (if you allow only one record)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *
 *       500:
 *         description: Internal server error
 */

router.get("/api/contact", contactController.getAll);
/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get contact/social links
 *     description: |
 *       Retrieves portfolio owner's contact and social media information.
 *       This is a public endpoint.
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: Contact information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     instagram:
 *                       type: string
 *                     dribbble:
 *                       type: string
 *                     linkedin:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *
 *       404:
 *         description: Contact information not found
 *
 *       500:
 *         description: Internal server error
 */

router.put(`/api/contact/:id`, authMiddleware, isAdmin, contactController.update);
{
  /**
   * @swagger
   * /api/contact/{id}:
   *   put:
   *     summary: Update contact/social links
   *     description: |
   *       Updates existing contact information.
   *       At least one field must be provided.
   *       Only administrators can update this data.
   *     tags: [Contact]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               instagram:
   *                 type: string
   *                 format: uri
   *                 example: https://instagram.com/newusername
   *               dribbble:
   *                 type: string
   *                 format: uri
   *                 example: https://dribbble.com/newusername
   *               linkedin:
   *                 type: string
   *                 format: uri
   *                 example: https://www.linkedin.com/in/newusername
   *               email:
   *                 type: string
   *                 format: email
   *                 example: contact@yourdomain.com
   *     responses:
   *       200:
   *         description: Contact information successfully updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     instagram:
   *                       type: string
   *                     dribbble:
   *                       type: string
   *                     linkedin:
   *                       type: string
   *                     email:
   *                       type: string
   *                     updatedAt:
   *                       type: string
   *                       format: date-time
   *
   *       400:
   *         description: Validation error (empty body or invalid fields)
   *
   *       401:
   *         description: Unauthorized
   *
   *       403:
   *         description: Forbidden - admin access required
   *
   *       404:
   *         description: Contact information not found
   *
   *       500:
   *         description: Internal server error
   */
}

module.exports = router;
