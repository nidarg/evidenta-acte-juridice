import { register, login, updateUser}  from '../controllers/authController.js'
import authorize from '../middleware/auth.js'

import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max:10,
  message:'Too many requests from this IP address'
})

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/updateUser').patch(authorize, updateUser)

export default router