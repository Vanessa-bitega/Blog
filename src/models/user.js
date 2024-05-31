import mongoose from 'mongoose' ;
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    resetTokenExpiration: { type: Date, required: false },
},
{
    timestamps:true
});


const  User = mongoose.model("User", userSchema);
export default User;
