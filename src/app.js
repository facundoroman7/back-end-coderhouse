import Express from "express";
import ProductoManager from "./desafios/ProductoManejer.js";

const app = Express();

app.use(Express.urlencoded({extended : true}));

const productos = new ProductoManager()

const readProducto = productos.readProduct()

app.get(`/products` , async (req, res) => {

   const limitado = parseInt(req.query.limitado) 

   if (!limitado) {
    return res.send(await readProducto)
   }
   let productAll = await readProducto
   const productLimitado = productAll.slice(0, limitado) 
   res.send( await productLimitado);
});

app.get(`/products:id` , async (req, res) =>{
    let id = parseInt(req.params.id)
    let productAll = await readProducto
    let prodById = productAll.find(prod => prod.id === id)
    res.send(prodById)

    
})

const puerto = 8080; // o 5000

const servidor = app.listen(puerto, ()=>{
    console.log("el puerto esta abierto!");
})


servidor.on("error", (err) =>{
    console.log(`error del servidor ${err}`);
});




