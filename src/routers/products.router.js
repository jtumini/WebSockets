import {Router} from 'express';

const router = Router ()

let products = [
        {
            "id": "1",
            "title": "botin adidassssss",
            "description": "botin adidas futbol 11",
            "price": "$3000",
            "thumbnail": "img",
            "code": "1238940",
            "stock": "10"
        },
        {
            "id": "2",
            "title": "botin topper",
            "description": "botin topper futbol 5",
            "price": "$20000",
            "thumbnail": "img",
            "code": "1238956",
            "stock": "8"
        },
        {
            "id": "3",
            "title": "botin puma",
            "description": "botin puma color rojo",
            "price": "$25000",
            "thumbnail": "asd",
            "code": "2389234",
            "stock": "25"
        },
        {
            "id": "4",
            "title": "botin puma",
            "description": "botin puma color rojo",
            "price": "$25000",
            "thumbnail": "asd",
            "code": "2389234",
            "stock": "25"
        },
        {
            "id": "5",
            "title": "botin kappa",
            "description": "botin kappa color verde",
            "price": "$1500",
            "thumbnail": "asd",
            "code": "2389234",
            "stock": "25"
        }
];


//endpoint para leer todos los productos
// http://localhost:8080/products/
router.get('/', (req, res) => {
    res.status(200).json({ products })
})

//endpoint para leer un solo producto a partir de su ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    const product = products.find(item => item.id == id)
    if (!product) return res.status(404).json({ message: 'This products doesnot exists'})
    res.json({ product })
})

//endpoint para crear a un nuevo producto
router.post('/', (req, res) => {
    const ultimoId = parseInt(products[products.length - 1].id);
    const nuevoId = (ultimoId + 1).toString();
    const { title, description, price, thumbnail, code, stock } = req.body;
    const nuevoProducto = {
        id: nuevoId,
        title,
        description,
        price,
        thumbnail,      
        code,
        stock
    };
    products.push(nuevoProducto)
    res.json({ message: 'producto registrado con éxito!' })
})

//endpoint para actualizar los datos de un producto
router.put('/:id', (req, res) => {
    const id = req.params.id
    const data = req.body

    if ('id' in data) {
        res.status(400).json({ message: 'No se puede modificar el ID del producto' });
        return;
    }    
    const productsIndex = products.findIndex(item => item.id == id)

    products[productsIndex] = { ...products[productsIndex], ...data }
    res.json({ message: `Actualización exitosa de productos con id = ${id}` })
})

//endpoint para eliminar un productos
router.delete('/:id', (req, res) => {
    const id = req.params.id
    products = products.filter(item => item.id != id)
    res.json({ message: `productos con id = ${id} eliminado` })
})

export default router
export { products };