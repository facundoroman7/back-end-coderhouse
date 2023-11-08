import {promises as fs} from "fs"

class ProductoManager {
    constructor(){
        this.patch = "./productos.txt";
        this.prods = [];
    }

    static id = 0


    addProduct = async (title, description, price, thumbnail, code, stock ) =>{

        ProductoManager.id++

        let newProducto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductoManager.id
        };


        this.prods.push(newProducto)

        

        await fs.writeFile(this.patch, JSON.stringify(this.prods))
    };


    readProduct = async () =>{
        let res = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(res)
    }

    getProduct = async () =>{
        let esperandoPromise = await this.readProduct()
       return console.log(esperandoPromise);
    };


    getProductById = async (id) =>{
        let esperandoOtraPromise = await this.readProduct()
        let filtrado = esperandoOtraPromise.find((prod) => prod.id === id)

       console.log(filtrado);
    }


    deleteProductById =  async (id) => {
        let esperandoOtraPromise = await this.readProduct()

        let prodFiltrado = esperandoOtraPromise.filter(products => products.id != id)

        await fs.writeFile(this.patch, JSON.stringify(prodFiltrado))
        
    }; 


    UpdateProduct = async ({id, ...productos}) =>{
        await this.deleteProductById(id);
        let prodviejo = await this.readProduct()
        console.log(prodviejo);
        let modicarProd = [
            {id, ...productos},
            ...prodviejo
        ]
        await fs.writeFile(this.patch, JSON.stringify(modicarProd))
    }

}


const productos = new ProductoManager

// productos.addProduct('Producto A', 'Descripción A', 21.99, 'thumbnail1.jpg', 'Atf321', 13)
// productos.addProduct('Producto B', 'Descripción B', 55.99, 'thumbnail2.jpg', 'RET456', 25);


productos.getProduct()

productos.getProductById(1)

productos.deleteProductById(2)

 productos.UpdateProduct({
    title: 'Producto c',
    description: 'Descripción c',
    price: 155.39,
    thumbnail: 'thumbnailc.jpg',
    code: 'RET567',
    stock: 25,
    id: 3
 })