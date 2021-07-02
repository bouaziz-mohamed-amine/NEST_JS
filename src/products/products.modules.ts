import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsServise } from "./products.service";


@Module({
    controllers: [ProductsController],
    providers:[ProductsServise],
}) 
export class ProductsModule {
    
}