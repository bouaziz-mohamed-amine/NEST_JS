import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000,()=>{
    try {
      console.log('Server is up ')

    }catch(error){
      console.log(error)
    }
  });
}
bootstrap();
