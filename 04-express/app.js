import express from 'express'
import { jobsRouter } from './routes/jobs.js'
import { corsMiddleware } from './middleware/cors.js'
import { DEFAULTS } from './config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT

const app = express()

app.use(corsMiddleware())
app.use(express.json()) //Middleware

app.use('/jobs', jobsRouter)

app.listen(PORT, () => {
    console.log(`Servidor levantando en http://localhost:${PORT}`)
})