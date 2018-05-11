const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Users } = require('./modules/users');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.post('/users', (req, res) => {
	 console.log(req.body);
	const user = new Users( {		
		email: req.body.email,
		password: req.body.password,
		isAdmin: req.body.isAdmin
	});

	user.save().then((doc) => {
		res.status(200).send(doc);
	}, (e) => {
		console.log('error');
		res.status(400).send(e);
	})
});

app.get('/users/:id', (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Users.findById(id).then((user) =>	{
		if (!user) {
			return res.status(404).send();
		}

		res.status(200).send({user});
	}).catch((e) => {
		res.status(400).send();
	})
	// res.status(200).send(req.params);
});

app.delete('/users/:id', (req, res) => {
		const id = req.params.id;

		if (!ObjectID) {
			return res.status(404).send();
		}

		Users.findByIdAndRemove(id).then((user) => {
			if (!user) {
				return res.status(404).send();
			}

			res.status(200).send(user)
		}).catch((e) => {
			res.status(400).send();
		})
})


app.get('/users', (req, res) => {
	Users.find().then((users) => {
		res.status(200).send({users});
	}, (e) => {
		res.status(400).send(e);
	})
});

app.patch('/users/:id', (req, res) => {
	const id = req.params.id;
	const body = _.pick(req.body, ['isChanged', 'password']);

	if (!ObjectID) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.isChanged) && body.isChanged) {
		body.changedAt	 = new Date().getTime();
		body.password = req.params.passworrd
		body.isChanged = true;
	} else {
		console.log('hallo');
		body.isChanged = false;
		body.changedAt = null;
	}

	Users.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}

		res.status(200).send({todo});
	}).catch((e) => {
		res.status(400).send();
	})
})

app.listen(3000, () => {
	console.log(`Started on port 3000`);//${port}
});