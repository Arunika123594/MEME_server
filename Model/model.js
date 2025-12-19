import mongoose from "mongoose";

const lmsschema = mongoose.Schema({
    name: { type:String, required:true},
    email: { type:String, required:true},
    password: { type:String, required:true},
    role: { type:String, default:'user'},
}
)

const lmsCollection = mongoose.model("users", lmsschema)  
export default lmsCollection