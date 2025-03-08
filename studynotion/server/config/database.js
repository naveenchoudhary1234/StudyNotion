const mongoose=require("mongoose");
require("dotenv").config();



exports.Connect=()=>{
mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("Db Connect Succesfully");
})

.catch((error)=>{
    console.log("Failed to connect with db try again");
    console.error(error);
    process.exit(1);
})






};