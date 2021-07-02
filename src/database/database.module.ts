import { Module } from '@nestjs/common';
import { dataBaseProvider } from './dataBase.provider';

@Module({
    providers :[...dataBaseProvider],
    exports :[...dataBaseProvider]
})
export class DatabaseModule {}
