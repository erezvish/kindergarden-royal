// Minimal Simple REST API Handler (With MongoDB and Socket.io)
// Plus support for simple login and session
// Plus support for file upload
// Author: Yaron Biton misterBIT.co.il

"use strict"

var cl = console.log;

const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongodb = require('mongodb')

const sessions = require('client-sessions')
const upload = require('./uploads');
const app = express();

var corsOptions = {
	origin: /http:\/\/localhost:\d+/,
	credentials: true
};

const serverRoot = 'http://localhost:3003/';
const baseUrl = serverRoot + 'data';

app.use(sessions({
	cookieName: 'mySession', // cookie name dictates the key name added to the request object 
	secret: 'pukiwwwnttothemountains', // should be a large unguessable string 
	duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms 
	activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds 
}))

app.use(express.static('uploads'));

app.use(cors(corsOptions));

app.use(bodyParser.json());

const http = require('http').Server(app);
const io = require('socket.io')(http);


function dbConnect() {

	return new Promise((resolve, reject) => {
		// Connection URL
		var url = 'mongodb://admin:admin@ds155582.mlab.com:55582/kinderyadb';
		// Use connect method to connect to the Server
		mongodb.MongoClient.connect(url, function (err, db) {
			if (err) {
				cl('Cannot connect to DB', err)
				reject(err);
			}
			else {
				//cl("Connected to DB");
				resolve(db);
			}
		});
	});
}

// GETs a list
app.get('/data/:objType', function (req, res) {
	const objType = req.params.objType;
	if (objType === 'user') {
		res.status(403).json({ error: 'Un Authorized!' })
		return
	}
	dbConnect().then(db => {
		const collection = db.collection(objType);

		collection.find({}).toArray((err, objs) => {
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl("Returning list of " + objs.length + " " + objType + "s");
				res.json(objs);
			}
			db.close();
		});
	});
});

// GETs a single
app.get('/data/:objType/:id', function (req, res) {
	const objType = req.params.objType;
	if (objType === 'user') {
		res.status(403).json({ error: 'Un Authorized!' })
		return
	}
	const objId = req.params.id;
	cl(`Getting you an ${objType} with id: ${objId}`);
	const pm = dbConnect()
		.then((db) => {
			const collection = db.collection(objType);
			let _id;
			try {
				_id = new mongodb.ObjectID(objId);
			}
			catch (e) {
				return Promise.reject(e);
			}
			return collection.findOne({ _id: _id })
				.then((obj) => {
					cl("Returning a single" + objType);
					res.json(obj);
					db.close();
				})
				.catch(err => {
					cl('Cannot get you that ', err)
					res.json(404, { error: 'not found' })
					db.close();
				})
		})
		.catch(err => res.status(404).json({ error: 'not found' }))
});

// DELETE
app.delete('/data/:objType/:id', function (req, res) {
	const objType = req.params.objType;
	const objId = req.params.id;
	cl(`Requested to DELETE the ${objType} with id: ${objId}`);
	dbConnect().then((db) => {
		const collection = db.collection(objType);
		collection.deleteOne({ _id: new mongodb.ObjectID(objId) }, (err, result) => {
			if (err) {
				cl('Cannot Delete', err)
				res.json(500, { error: 'Delete failed' })
			} else {
				cl("Deleted");
				res.json({});
			}
			db.close();
		});
	});
});

// POST - adds 
app.post('/data/:objType', upload.single('file'), function (req, res) {
	//console.log('req.file', req.file);
	// console.log('req.body', req.body);

	const objType = req.params.objType;
	cl("POST for " + objType);

	const obj = req.body;
	delete obj._id;
	// If there is a file upload, add the url to the obj
	if (req.file) {
		obj.imgUrl = serverRoot + req.file.filename;
	}

	dbConnect().then((db) => {
		const collection = db.collection(objType);

		collection.insert(obj, (err, result) => {
			if (err) {
				cl(`Couldnt insert a new ${objType}`, err)
				res.json(500, { error: 'Failed to add' })
			} else {
				cl(objType + " added");
				res.json(obj);
			}
			db.close();
		});
	});
});

// PUT - updates
app.put('/data/:objType/:id', function (req, res) {
	const objType = req.params.objType;
	const objId = req.params.id;
	const newObj = req.body;
	if (newObj._id && typeof newObj._id === 'string') newObj._id = new mongodb.ObjectID(newObj._id);

	cl(`Requested to UPDATE the ${objType} with id: ${objId}`);
	dbConnect().then((db) => {
		const collection = db.collection(objType);
		collection.updateOne({ _id: new mongodb.ObjectID(objId) }, newObj,
			(err, result) => {
				if (err) {
					cl('Cannot Update', err)
					res.json(500, { error: 'Update failed' })
				} else {
					res.json(newObj);
				}
				db.close();
			});
	});
});

// Basic Login/Logout/Protected assets
app.post('/login', function (req, res) {
	dbConnect().then((db) => {
		db.collection('user').findOne({ username: req.body.username, pass: req.body.pass }, function (err, user) {
			if (user && (user.type === 'admin' || user.type === 'basic')) {
				cl('Login Succesful');
				delete user.pass;
				req.mySession.user = user;  //refresh the session value
				res.json(user)
				res.end()
			} else {
				cl('Login NOT Succesful');
				req.mySession.user = null;
				res.status(403).json({ error: 'Login failed' })
			}
		});
	});
});

app.get('/logout', function (req, res) {
	console.log('logged out')
	req.mySession.reset();
	res.end('Loggedout');
})

function requireLogin(req, res, next) {
	if (!req.mySession.user) {
		res.status(403).end('Un Authenticated!')
	} else {
		next();
	}
}

app.get('/protected', requireLogin, function (req, res) {
	console.log('req.mySession.user', req.mySession.user);
	res.send('<h1>Hello Admin</h1>');
})

// Kickup our server 
// Note: app.listen will not work with cors and the socket
// app.listen(3003, function () {
http.listen(3003, function () {
	console.log(`misterREST server is ready at ${baseUrl}`);
	console.log(`GET (list): \t\t ${baseUrl}/{entity}`);
	console.log(`GET (single): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`DELETE: \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`PUT (update): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`POST (add): \t\t ${baseUrl}/{entity}`);

});


io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	socket.on('chat message', function (msg) {
		// console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
	socket.on('emoji message', function (_id, emoji) {
		console.log('received emoji, sending to all', _id, emoji)
		io.emit('emoji message', _id, emoji);
	})
	socket.on('parent message', function (msg) {//duplicating some code instead of a dedicated function,
		// because there might be a single server for demonstration and people may need the original code
		console.log('message: ' + msg);
		io.emit('parent message', msg);
		const objType = 'msg';
		cl("POST for " + objType);

		const obj = msg;
		delete obj._id;
		dbConnect().then((db) => {
			const collection = db.collection(objType);

			collection.insert(obj, (err, result) => {
				if (err) {
					cl(`Couldnt insert a new ${objType}`, err)
					// TODO: send some response with emit and wait at client side
				} else {
					cl(objType + " added");
					// TODO: send some response with emit and wait at client side
				}
				db.close();
			});
		});
	});
	socket.on('toggle present', function (kid) {
		kid._id = new mongodb.ObjectID(kid._id);
		dbConnect().then((db) => {
			const collection = db.collection('kid');
			collection.updateOne({ _id: new mongodb.ObjectID(kid._id) }, kid, () => db.close())
		});
		io.emit('toggle notice', kid);
	});
});

cl('WebSocket is Ready');