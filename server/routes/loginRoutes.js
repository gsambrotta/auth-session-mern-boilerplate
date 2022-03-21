const UserSchema = require('../Models/UserSchema')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ msg: 'Password and email are required' })
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: 'Password should be at least 8 characters long' })
  }

  const user = await UserSchema.findOne({ email })
  if (user) return res.status(400).json({ msg: 'User already exists' })

  const newUser = new UserSchema({ email, password })
  console.log({ newUser })

  bcrypt.hash(password, 7, async (err, hash) => {
    console.log({ hash })
    if (err)
      return res.status(400).json({ msg: 'error while saving the password' })

    newUser.password = hash
    const savedUserRes = await newUser.save()
    console.log({ savedUserRes })
    if (savedUserRes)
      return res.status(200).json({ msg: 'user is succesfully saved' })
  })
})

router.post(`/login`, async (req, res) => {
  const session = req.session
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: 'Something missing' })
  }

  const user = await UserSchema.findOne({ email: email }) // finding user in db
  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const matchPassword = await bcrypt.compare(password, user.password)
  if (matchPassword) {
    const userSession = { name: user.name, email: user.email } // creating user session to keep user loggedin also on refresh
    session.userSession = userSession // attach user session to session object from express-session
    return res
      .status(200)
      .json({ message: 'You have logged in successfully', userSession }) // attach user session id to the response. It will be transfer in the cookies
  } else {
    return res.status(400).json({ message: 'Invalid credential' })
  }
})

router.delete(`/logout`, async (req, res) => {
  req.session.destroy((error) => {
    if (error) throw error

    res.clearCookie('session-id') // cleaning the cookies from the user session
    res.status(200).send('Logout Success')
  })
})

module.exports = router
