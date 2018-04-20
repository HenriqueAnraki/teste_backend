const { json, send } = require('micro')
const { router, get, post } = require('microrouter')
const { Model } = require('objection');
const nodemailer = require('nodemailer');

const Email = require('./models/Email')
const User = require('./models/User')

const Knex = require('knex')
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig.development);

Model.knex(knex);


const notFound = (req, res) => send(res, 404, 'Not found')

const storeUser = async (user) => {
	storeduser = await User
		.query()
		.where('emailAddress', user.email)

	if(storeduser.length > 0){
		return storeduser[0].id
	} else {
		storeduser = await User
			.query()
			.insert({emailAddress: user.email, name: user.name})

		console.log (storeduser instanceof User)

		return storeduser.id
	}
}

const storeEmail = async (address, content) => {
	const storedemail = await Email
		.query()
		.insert({content: content, address: address})

	//console.log (storedemail instanceof Email)
	//console.log(storedemail.content)

	return storedemail
}

const associateUserWithEmail = async (usersid, emailinstance) => {
	for(var i = 0; i < usersid.length; i++){
		const email_user = await emailinstance
			.$relatedQuery('addressees')
			.relate(usersid[i])
	}

	console.log('email associated with user')
}

const sendEmail = async (email, users) => {
	const { address, content } = email

	const emailinstance = await storeEmail(address, content)

	var usersid = []
	var useremail = []
	for(var i = 0; i < users.length; i++){
		usersid.push(await storeUser(users[i]))
		useremail.push(users[i].email)
	}
	
	await associateUserWithEmail(usersid, emailinstance);

	console.log(useremail)

	let smtpConfig = {
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: 'd7qt5gk2xcbt5qmw@ethereal.email',
			pass: 'HDWPUxjEExdTFwHjME'
		}
	};

	let transporter = nodemailer.createTransport(smtpConfig, {
		from: address
	});

	//criar array de emails para 'to'
	let message = {
		from: address,
		to: useremail,
		//subject: ,
		text: content
	}

	transporter.sendMail(message, (error, info) => {
		if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	});
}

const getData = async (req, res)  => {
  const data = await json(req)

  const {email, users} = data;

  await sendEmail(email, users)

  return 'End'
}

module.exports = router(
	post('/*', getData), get('/*', notFound)
)