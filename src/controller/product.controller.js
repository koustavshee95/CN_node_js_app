import path from 'path';
import ProductModel from '../model/product.model.js';

export default class ProductController{
    getProducts(req,res){
        let products = ProductModel.get();
        console.log(products);
        res.render("products",{products:products});


       // return res.sendFile(path.join(path.resolve(),"src","views","products.html"))
    }

    getAddProduct(req,res){                            //no arrow function for method.
       return res.render("new_product",{errorMessage:null})
    }

    postAddProduct(req,res){
        
        //access data from form.
        console.log(req.body);
        ProductModel.add(req.body)
         let products = ProductModel.get();
       return res.render("products",{products}); 
    }

    getUpdateProductView(req,res,next){

        //1.if product exist then return view:

        const {id} = req.params;  // access you to all the url parameter.

        const productFound = ProductModel.getById(id);
        if (productFound) {
            res.render('update_product',{product:productFound,errorMessage:null});
        


        //2.else return errors:
            } else {
           res.status(401).send("Product not found");
        }
        
    }

    postUpdateProduct(req,res){
         ProductModel.update(req.body);
         var products = ProductModel.get();
         res.render("products",{products}); 
    };
    
    deleteProduct(req,res){
        const id= req.params.id;
        const productFound= ProductModel.getById(id);
        if (!productFound) {
            return res.status(401).send('Product not found.')
        };

        ProductModel.delete(id);
        var products = ProductModel.get();
        res.render('products',{products}); 
    };             
};

