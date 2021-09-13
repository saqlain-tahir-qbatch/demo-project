import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    first_name: { 
        type: String, 
        default: null 
    },
    last_name: { 
        type: String, 
        default: null 
    },
    email: { 
        type: String, 
        unique: true 
    },
    password: { 
        type: String 
    },
    token: { 
        type: String 
    },
});
const Users = new mongoose.model("User", userScheme)

export default Users;
