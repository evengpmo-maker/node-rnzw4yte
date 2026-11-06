import express from 'express'
import jobs from './jobs.json' with { type: 'json'}


const PORT = process.env.PORT ?? 1234
const app = express()

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

app.get('/get-jobs', (req, res) => {
    console.log(req.query)
    const { text, title, level, limit, technology, offset} = req.query
    let filteredJobs = jobs

    if(text){
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job => {
            console.log(job)
            job.descripcion.toLowerCase().includes(searchTerm)
        })
        
    }
    return res.json(filteredJobs)
})

app.get('/get-single-job/:id', (req, res) => {
    const { id } = req.params
    const idNumber = Number(id)

    return res.json({
        job: { id: idNumber, title: `Job with id ${id}` }
    })

}
)

app.get('/ab{c}de', (req, res) => {
    return res.send(`abcde o abde`)
}
)

app.get('/bb*bb', (req, res) => {
    return res.send(`bb*bb`)
}
)

app.get('/file/*filename', (req, res) => {
    return res.send(`file/*`)
}
)


app.listen(PORT, () => {
    console.log(`Servidor levantando en http://localhost:${PORT}`)
})