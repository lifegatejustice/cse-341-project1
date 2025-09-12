
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get('/', usersController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: A contact object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 */
router.get('/:id', usersController.getSingle);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The created contact ID
 *       400:
 *         description: Bad request - missing required fields
 */
router.post('/', usersController.create);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       204:
 *         description: Contact updated successfully
 *       400:
 *         description: Bad request - missing required fields
 *       404:
 *         description: Contact not found
 */
router.put('/:id', usersController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */
router.delete('/:id', usersController.remove);

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The contact ID
 *         firstName:
 *           type: string
 *           description: The contact's first name
 *         lastName:
 *           type: string
 *           description: The contact's last name
 *         email:
 *           type: string
 *           format: email
 *           description: The contact's email address
 *         favoriteColor:
 *           type: string
 *           description: The contact's favorite color
 *         birthday:
 *           type: string
 *           format: date
 *           description: The contact's birthday
 *     ContactInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         firstName:
 *           type: string
 *           description: The contact's first name
 *         lastName:
 *           type: string
 *           description: The contact's last name
 *         email:
 *           type: string
 *           format: email
 *           description: The contact's email address
 *         favoriteColor:
 *           type: string
 *           description: The contact's favorite color
 *         birthday:
 *           type: string
 *           format: date
 *           description: The contact's birthday
 */

module.exports = router;
