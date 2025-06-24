const express = require('express');
const Auth = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const invalidResponse = (res) => {
	res.status(401).json({error: 'Invalid Credentials'});
}

router.post('/login', (req, res, next) => {
	const { email, password } = req.body;
	Auth.findOne({email: email})
		.then(user => {
			if (!user) {
				return invalidResponse(res);
			}
			return bcrypt.compare(password, user.password);
		})
		.then(result => {
			if (!result) {return invalidResponse(res)}
			const token = jwt.sign({ email }, 'private-key', {
				expiresIn: '1h',
			});
			res.status(200).json(token);
		})
		.catch((error) => invalidResponse(res))
});

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
});

module.exports = router;
