/*
export class Product {
    
    id:string;
    title:string;
    description :string;
    price: number;
    
    constructor(id:string,title:string,description :string,price: number) {
        this.id=id;
        this.title=title;
        this.description = description ;
        this.price = price ;  
    }
}
*/

import { Prop ,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



export type ProductDocument = Product & Document ;

@Schema()
export class  Product {
    
 
    @Prop()
    title : string ;

    @Prop()
    description : string ;

    @Prop()
    price : number ;
}

export const ProductSchema = SchemaFactory.createForClass(Product) ; 