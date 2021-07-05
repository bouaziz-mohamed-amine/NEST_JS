import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./product.model";
import { ProductsModule } from "./products.modules";

@Injectable()
export class ProductsServise{

    constructor(@InjectModel('Product') private readonly productModel:Model<ProductDocument>){}
    
    // private   products : Product[] = [];

    async  insertProduct(title:string,description:string,price:number){

        //const newid =Math.random().toString();

        const newproduct = new  this.productModel({title : title , description : description , price: price}) ;

        //this.products.push(newproduct);
        const res= await  newproduct.save() ;
            
            
        return res.id as string ;
    }

    

    async getAllProducts(){
            
            const allProducts =  await this.productModel.find().exec();

            return  [...allProducts]; 
    }
    
    async   getSingleProduct(id:string){
            
       // const  findproduct=  this.findproduct(id) ;
        const findproduct= await this.productModel.findById(id) ;
        if( findproduct ){
                
            return  findproduct ;
            
        }else  throw  new NotFoundException('not found  try again') ;          
    }
    
    async editProduct(id:string,title:string,description:string,price:number){

        //const [product,index]=this.findproduct(id) ;
        //const updateProduct = {...product}
        const updateProduct=  await this.findproduct(id) ;
        if(title){
            updateProduct.title=title;
        }  
        if(description){
            updateProduct.description=description ;
        }
        if(price){
            updateProduct.price=price ; 
        }
        updateProduct.save() ;

        return updateProduct ; 
        
   
    }
    
    async  deleteProduct(id:string){

         await this.productModel.deleteOne({_id : id}).exec()  ;
       
       //this.products.splice(index,1)
      // return this.products.filter(prod =>prod.id !== id);
        
    }

    
    private async findproduct(id:string){
        
        
        const  product= await this.productModel.findById(id) ;    
            
        if( product ){
                
            return  product ;
            
        }else  throw  new NotFoundException('not found  try again') ;     
    }
    
}