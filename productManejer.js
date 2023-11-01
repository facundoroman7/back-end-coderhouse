class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Todos los campos son obligatorios.');
        return;
      }
  
      const existeProduct = this.products.find((product) => product.code === code);
      if (existeProduct) {
        console.log('Ya existe un producto con el mismo código.');
        return;
      }
  
      const product = {
        id: this.nextId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
      this.nextId++;
  
      console.log('Producto exitoso');
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        console.log('No encontramos el producto');
        return null;
      }
    }
  }
  
  
  const productManager = new ProductManager();
  
  productManager.addProduct('Producto A', 'Descripción A', 21.99, 'thumbnail1.jpg', 'ABC123', 13);
  productManager.addProduct('Producto B', 'Descripción B', 55.99, 'thumbnail2.jpg', 'DEF456', 25);
  
  console.log(productManager.getProducts());
  
  const product = productManager.getProductById(2);
  if (product) {
    console.log('Producto encontrado:', product);
  }
  
  const noExisteProduct = productManager.getProductById(3);
  