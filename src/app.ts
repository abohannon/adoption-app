import express from 'express'
import animalsApi from './components/animals/animalsApi'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hello worlds!')
})

app.use('/animals', animalsApi)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
