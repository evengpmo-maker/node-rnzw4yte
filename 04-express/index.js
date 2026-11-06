import express, { response } from 'express'

const PORT = process.env.PORT ?? 1234
const app = express()

app.use((request, response, next) => {
    const timeString = new Date().toLocaleTimeString()
    console.log(`[${timeString}] ${request.method} ${request.url}`)
    next()
})

//
app.get('/' ,(request, response) =>{
    return response.send('Hello World!')
})
//a
app.get('/health', (request, response) =>{
    return response.json({
        status: 'ok',
        uptime: process.uptime()
    })
})

app.get('/get-jobs', (req,res)=>{
    return res.json({
        jobs: [
            { id: 1, title: 'Fronted Develeoper'},
            { id: 2, title: 'Backend Develeoper'},
            { id: 3, title: 'FullStack Develeoper'}
        ]
    })
}
)

app.listen(PORT, ()=>{
    console.log(`Servidor levantando en http://localhost:${PORT}`)
})