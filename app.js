require('dotenv').config()
const express = require('express')
const clientesRoutes = require('./api-clientes/src/routes/clientes')

const app = express()
app.use(express.json())

app.use('/clientes', clientesRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))