import { Router } from 'express';
import { products } from './products.router.js';
import { io } from '../app.js';

const router = Router ()
let carts = [];


//endpoint para leer todos los carritos
// http://localhost:8080/carts/
router.get('/', (req, res) => {
    res.status(200).json({ carts })
})

//endpoint para crear a un nuevo carrito
router.post('/add-to-cart', (req, res) => {
    const { productId, cartId, quantity } = req.body;



    let cart = carts.find((c) => c.id === cartId) 

    if (!cart) { 
        cart = {
            id :cartId,
            products : [],
        };
        carts.push(cart);
    }

let existProduct = cart.products.find ( (p) => p.productId === productId);

    if (existProduct) {
        existProduct.quantity += Number(quantity);
    } else { 
        const product = products.find( (p) => p.id === productId)

            if (product){
                const newProduct = {
                    productId,
                    quantity: Number(quantity),
                };
                cart.products.push(newProduct)
            }else{
                return res.status(404).json({ error : 'producto no encontrado'});
            }
        
    }

const updatedProducts = carts.reduce(
    (result, cart) => result.concat(cart.products),
    []
    );
    io.emit('productUpdated', updatedProducts);



res.status(200).json({message: ' Producto agregado al carrito'})

});



export default router
