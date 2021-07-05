import { Body, Controller, Post,Param, Patch, Delete, UseGuards, Req } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsServise } from "./products.service";
import {addProductDto} from './product.dto'
import { Get } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
@Controller('products')
export class ProductsController {
    
    constructor(private readonly productsservice :ProductsServise){};

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async addproduct(
        @Req() req, 
               @Body() body:addProductDto,
    
        ): Promise<any> {
        console.log("user",req.user)
        const {title, description, price}=body

        const  newIdProduct= await this.productsservice.insertProduct(title,description,price);
        
        return {  id : newIdProduct }; 
    }

    
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllProducts(){
        const newProducts = this.productsservice.getAllProducts();
        return newProducts  ;
    }
    
    @Get(':id')
    async  getProduct(
        @Param('id') id:string){
            const findproduct=this.productsservice.getSingleProduct(id);
            return findproduct ; 
    }

    
    @Patch(':id')
    async editProduct(
        @Body() body:addProductDto,
        @Param('id') id:string,
        ){
        const {title, description, price}=body
        
        const prod =   await  this.productsservice.editProduct(id,title, description, price);
        return prod ; 
    }
    
    @Delete(':id') 
    async  deleteProduct(@Param('id') id:string)
    {
        await  this.productsservice.deleteProduct(id);
            
    }


}