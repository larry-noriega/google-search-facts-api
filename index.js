const PORT = 8000

const express = require('express')
const app = express()

const googlefactss = require('./routes/googlefactss')

app.use(express.json())
app.use('/googlefactss', googlefactss)

app.get('/', (req, res) => {
    res.json('Welcome to my Google Search Facts API')
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))