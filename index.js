import ProductController from './src/controller/product.controller.js';
import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import middlewareValidation from './src/middleware/middleware.validation.js';
import { uploadFile } from './src/middleware/file_upload.middleware.js';

const server = express();
server.use(express.static('public'));

//parse from data:
server.use(express.urlencoded({extended:true}))

//setup view engine settings:
server.set('view engine','ejs');
server.set('views', path.join(path.resolve(),'src','views'));

//express-ejs-layout
server.use(expressEjsLayouts)
server.use(express.static('src/views'));
//create an instance of product controller:
const productController = new ProductController();

server.get('/',productController.getProducts);
server.get('/new',productController.getAddProduct);
server.get('/add-product',productController.getAddProduct);
server.get('/update_product/:id',productController.getUpdateProductView);
server.post('/delete_product/:id',productController.deleteProduct);

server.post("/",uploadFile.single('imageUrl'), middlewareValidation, productController.postAddProduct);
server.post('/update-product',productController.postUpdateProduct); 



server.listen(3100,()=>{
    console.log("we are listing on port 3100");
});

