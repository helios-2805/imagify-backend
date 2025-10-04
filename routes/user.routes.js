import { registerUser, loginUser, userCredits } from '../controllers/user.controller.js'
import { Router } from 'express'
import { userAuth } from '../middlewares/auth.middleware.js'

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCredits)

export default userRouter

// this is a routing mechanism to http://localhost:PORT/api/v1/user/ the given posts to the paths.