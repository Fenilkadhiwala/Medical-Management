const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        //MONGODB CONNECTION STRING
        const con=await mongoose.connect(process.env.MONGO_URL,{
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
            // useFindAndModify:false,
            // useCreateIndex:true
        })

        console.log(`MongoDb Connected:${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports=connectDB