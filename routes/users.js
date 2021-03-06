const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cred = require('../cred/database');
const genRandom = require('../config/genrandom');
const jwtDecode = require('jwt-decode');
const formateForMail = require('../config/formatesformail');
const nodeMailer = require('../config/nodemailer');
//Register
router.post('/register', (req, res) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		userName: req.body.userName,
		password: req.body.password
	});

	//To check if the email has been registered
	User.getUserByEmail(newUser.email, (err, user) => {
		if (err) {
			throw err;
		} else {
			if (user == null) {
				//Saving the user data in database
				User.addUser(newUser, (err, user) => {
					if (err) {
						res.json({
							success: false,
							msg: 'FAILED to Register  the User',
							err: err
						});
					} else {
						res.json({
							success: true,
							msg: 'Successfully User Registered '
						});
					}
				});
			} else {
				res.json({
					success: false,
					msg: 'Email addresss is alredy been Registered. Try with a new one'
				});
			}
		}
	});
});

//Authenticate
router.post('/authenticate', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	User.getUserByEmail(email, (err, user) => {
		if (err) {
			throw err;
		}
		if (!user) {
			return res.json({
				success: false,
				msg: 'Email or Password is wrong'
			});
		}
		User.comparePassword(password, user.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				const token = jwt.sign(
					{
						data: user
					},
					cred.secret,
					{
						expiresIn: 604800 //1 week
					}
				);

				res.json({
					success: true,
					msg: 'Successfully Login ',
					token: 'JWT ' + token,
					user: {
						name: user.name,
						username: user.username,
						email: user.email
					}
				});
			} else {
				return res.json({
					success: false,
					msg: 'Email or Password is wrong'
				});
			}
		});
	});
});

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		name: req.user.name,
		userName: req.user.userName,
		email: req.user.email
	});
});

//ChangePassword
router.post('/changepassword', passport.authenticate('jwt', { session: false }), (req, res) => {
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;
	User.getUserByEmail(req.user.email, (err, user) => {
		if (err) {
			throw err;
		}
		if (!user) {
			return res.json({
				success: false,
				msg: 'Something Went Wrong'
			});
		}
		User.comparePassword(oldPassword, user.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				// Update New Password
				User.updatePassword(req.user.email, newPassword, (err, user) => {
					if (err) {
						throw err;
					}
					if (!user) {
						return res.json({
							success: false,
							msg: 'Password is not Changed'
						});
					} else {
						return res.json({
							success: true,
							msg: 'Password is Changed'
						});
					}
				});
			} else {
				return res.json({
					success: false,
					msg: 'Wrong Password'
				});
			}
		});
	});
});

//ForgotPassword
router.post('/forgotpassword', (req, res) => {
	const email = req.body.email;
	User.getUserByEmail(email, (err, user) => {
		if (err) {
			throw err;
		} else {
			if (user == null) {
				res.json({
					success: false,
					msg: 'Email addresss is not registered'
				});
			} else {
				const token = jwt.sign(
					{
						data: {
							email: email
						}
					},
					cred.secret,
					{
						expiresIn: 600
					}
				);
				const msg = formateForMail.formateForMail('forgotPassword', token);
				nodeMailer.nodeMailer(email, 'ProjectZeros Password Assistance', msg);
				return res.json({
					success: true,
					msg: 'Mail is sent to the registered mail address'
				});
			}
		}
	});
});

//ResetPassword
router.post('/resetpassword', (req, res) => {
	const password = req.body.newPassword;
	const email = jwtDecode(req.body.token).data.email;
	User.getUserByEmail(email, (err, user) => {
		if (err) {
			throw err;
		}
		if (!user) {
			return res.json({
				success: false,
				msg: 'Something Went Wrong'
			});
		}
		User.updatePassword(email, password, (err, user) => {
			if (err) {
				throw err;
			}
			return res.json({
				success: true,
				msg: 'Password is Changed'
			});
		});
	});
});

module.exports = router;
