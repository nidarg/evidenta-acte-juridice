import {UnauthenticatedError} from '../errors/index.js'
import jwt from 'jsonwebtoken'

const authorize = async(req, res, next)=>{
 
  const authorizationHeader = req.headers.authorization
  //  console.log(authorizationHeader);

  if(!authorizationHeader || !authorizationHeader.startsWith('Bearer')){
    throw new UnauthenticatedError('Authentication Invalid')
  }

  const token = authorizationHeader.split(' ')[1]

  try {
    // payload returns {userId, iat, exp} object -> see USer model createJWT method
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {userId:payload.userId}
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  } 

}

export default authorize