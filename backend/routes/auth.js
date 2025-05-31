const express = require('express');
const Auth = require('../models/auth');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', (req, res) => {})

router.post('/signup', (req, res, next) => {
	bcrypt.hash(req.body.password, 10)
		.then((hash) => {
			const auth = new Auth({
				email: req.body.email,
				password: hash,
			});
			auth.save()
				.then((result) => {
					res.status(201).json({
						message: 'User created successfully',
						result
					});
				})
				.catch((error) => {
					res.status(500).json({error})
				})
		})
})

module.exports = router;
