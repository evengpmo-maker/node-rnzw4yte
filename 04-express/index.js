import express from 'express'
import jobs from './jobs.json' with { type: 'json' }
import { DEFAULTS } from './config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

app.use(express.json()) //Middleware

app.use((request, response, next) => {
    const timeString = new Date().toLocaleTimeString()
    console.log(`[${timeString}] ${request.method} ${request.url}`)
    next()
})

//
app.get('/', (request, response) => {
    return response.send('Hello World!')
})
//a
app.get('/health', (request, response) => {
    return response.json({
        status: 'ok',
        uptime: process.uptime()
    })
})
//
app.get('/jobs', (req, res) => {
    console.log(req.query)
    const { text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET} = req.query
    let filteredJobs = jobs

    if (text){
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job =>            
            job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
       )
        
    }

    if (technology) {
        filteredJobs = filteredJobs.filter(job =>
            job.tecnologias.includes(technology)
        )
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

    return res.json(paginatedJobs)
})

app.get('/jobs/:id', (req, res) => {
    const { id } = req.params
    
    const job = jobs.find(job => job.id === id)

    if (!job) {
        return res.status(404).json({ error: 'Job not found' })
    }

    return res.json(job)
})

app.post('/jobs', (req, res) => {
    const { titulo, empresa, ubicacion, data } = req.body

    const newJob = {
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion,
        data
    }

    jobs.push(newJob)

    return res.status(201).json(newJob)

})

app.put('/jobs/:id', (req, res)=> {

})

app.listen(PORT, () => {
    console.log(`Servidor levantando en http://localhost:${PORT}`)
})