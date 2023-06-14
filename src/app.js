import express from 'express'
import { Server } from 'socket.io'

const app = express()

app.use(express.static('./src/public'))

const serverHttp = app.listen(8080,() => console.log('server up'))
const io = new Server(serverHttp)

io.on('conection', () => {
    console.log('se ah realizado una conexion!')
})