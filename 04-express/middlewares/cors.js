import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:8888'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
    return cors(
        {
            origin: (origin, callback) => {
              if (acceptedOrigins.includes(origin)) {
                return callback(null, true)
              }
        
              return callback(new Error('Origen no permitido'))
            }
          })
}

