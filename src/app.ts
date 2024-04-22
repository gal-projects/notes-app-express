import express from 'express'
import { defaultRouter } from './routes/default';
import { infoRouter } from './routes/info'
import { notesRouter } from './routes/notes'

// we define our server

const app = express();

// Setup custom middleware

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Setup routes

app.use('/', defaultRouter)
app.use('/info', infoRouter)
app.use('/notes', notesRouter)


export default app;