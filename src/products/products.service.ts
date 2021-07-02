import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsServise{
    
     private   products : Product[] = [];

    insertProduct(title:string,description:string,price:number){

        const newid =Math.random().toString();

        const newproduct = new Product(newid,title,description,price);

        this.products.push(newproduct);
        
        return newproduct ;
    }

    getAllProducts(){
        return [...this.products] ; 
    }

    getSingleProduct(id:string):any {
            
        const  findproduct=  this.products.find(product => product.id === id) ;
            
        if( findproduct ){
                
            return  findproduct ;
            
        }else  throw  new NotFoundException('not found  try again') ;          
    }

    editProduct(id:string,title:string,description:string,price:number){

        const [product,index]=this.findproduct(id) ;
        const updateProduct = {...product}
        
        if(title){
            updateProduct.title=title;
        }  
        if(description){
            updateProduct.description=description ;
        }
        if(price){
            updateProduct.price=price ; 
        }
        this.products[index]=updateProduct ;
        
   
    }

    deleteProduct(id:string){

       const [product ,index]=this.findproduct(id) ; 
       
       this.products.splice(index,1)
      // return this.products.filter(prod =>prod.id !== id);
        
    }


    private findproduct(id:string):[Product,number]{
        
        const productIndex=this.products.findIndex(prod => prod.id === id ) ; 
        const  product=this.products.find(prod => prod.id ===id) ;    
            
        if( product ){
                
            return  [product,productIndex] ;
            
        }else  throw  new NotFoundException('not found  try again') ;     
    }
}