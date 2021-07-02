import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.modules';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ProductsModule,
    DatabaseModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
