import * as mongoose from 'mongoose'
export const dataBaseProvider = [
    {
        provide: "DATABASEPROVIDER",
        useFactory: async () => {
            return await mongoose.connect("mongodb+srv://user:user@cluster0.vxkxs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
                { useNewUrlParser: true, useUnifiedTopology: true }
            )
        }
    }
]