import express from 'express'
import { Server } from 'socket.io'
import productsRouter , { products }  from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import handlebars from 'express-handlebars';


const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(express.static('./src/public'))
app.use(express.json())

app.use('/products',productsRouter)
app.use('/carts',cartsRouter)

const serverHttp = app.listen(8080,() => console.log('server up'))
const io = new Server(serverHttp)

io.on('conection', () => {
    console.log('se ah realizado una conexion!')
})

export { app, io };