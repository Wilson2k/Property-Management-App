import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import connectRedis from 'connect-redis';
import bodyParser from 'body-parser';
import { createClient } from 'redis';
import session from 'express-session'
import { loginUser } from './components/users/userController'

dotenv.config();

const app = express()
const client = createClient()
const RedisStore = connectRedis(session)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(session({
    store: new RedisStore({host: '127.0.0.1', port: 6379, client}),
    cookie: {
        // Set true on production
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}))

// Routes
app.get('/login', loginUser)

export default app