const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, 'private-key');
		next();
	} catch (error) {
		return res.status(401).json({message: 'Unauthorized'});
	}

}
