import  mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI as string)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('Connected to MongoDB')
        })

        connection.on('error', (err) => {
            console.log('Database error: ' + err)
            process.exit()
        })
    }catch(err: unknown){
        if(err instanceof Error){
            console.log(err.message)
        }
        else{
            console.log('Unexpeced Error')
        }
    }
}