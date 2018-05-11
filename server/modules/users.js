const mongoose = require('mongoose');

const Users = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	},
	password: {
		type: String,
		default: false,
		required: true,
		trim: true,
		minLength: 6
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	isChanged: {
		type: Boolean,
		default: false,
	},
	changedAt: {
		type: Boolean,
		default: null
	}
});

module.exports = {Users};