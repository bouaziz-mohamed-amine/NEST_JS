import { Body, Controller, Post,Param, Patch, Delete } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsServise } from "./products.service";
import {addProductDto} from './product.dto'
import { Get } from "@nestjs/common";
@Controller('products')
export class ProductsController {
    
    constructor(private readonly productsservice :ProductsServise){};

    @Post('create')
    addproduct(
        
        @Body() body:addProductDto,
    
        ): any {
        
        const {title, description, price}=body

        const  newProduct= this.productsservice.insertProduct(title,description,price);
        
        return newProduct ; 
    }

    @Get()
    getAllProducts():any{
        const newProducts = this.productsservice.getAllProducts();
        return newProducts
    }

    @Get(':id')
    getProduct(
        @Param('id') id:string):any{
            const findproduct=this.productsservice.getSingleProduct(id);
            return findproduct ; 
    }


    @Patch(':id')
    editProduct(
        @Body() body:addProductDto,
        @Param('id') id:string,
    ):any {
        const {title, description, price}=body
        
        this.productsservice.editProduct(id,title, description, price);
        return null ; 
    }
      
    @Delete(':id') 
    deleteProduct(
        @Param('id') id:string)
        {
            this.productsservice.deleteProduct(id);
            return null ;
        }


}