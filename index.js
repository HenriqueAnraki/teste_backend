const { json, send } = require('micro')
const { router, get, post } = require('microrouter')

const notFound = (req, res) => send(res, 404, 'Not found')

const storeUser = async (useremail) => {}
const storeEmail = async (content) => {}
const associateUserWithEmail = async (userid, eailid) => {}

const sendEmail = async (email, users) => {
	const { address, content } = email

	
}

const getData = async (req, res)  => {
  const data = await json(req)

  const {email, users} = data;
  //console.log(data)

  await sendEmail(email, users)

  return 'End'
}

module.exports = router(
	post('/*', getData), get('/*', notFound)
)