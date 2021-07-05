import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./product.model";
import { ProductsController } from "./products.controller";
import { ProductsServise } from "./products.service";


@Module({
    imports : [MongooseModule.forFeature([{name :'Product',schema :ProductSchema}])],
    controllers: [ProductsController],
    providers:[ProductsServise],
}) 
export class ProductsModule {
    
}