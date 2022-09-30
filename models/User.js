const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        googleId:{
            type:String,
            required:true,
        },
        pictures:[
            {
                    id:{
                        type:Number,
                        required:true
                    },
                    ps:{
                        type:String,
                        required:true
                    },
                    mac:{
                        type:String,
                        required:true
                    },
                    peri:{
                        type:String,
                        required:true
                    },
                    dp:{
                        type:String,
                        required:true
                    },
                    meta_pm:{
                        category:{
                            type:String,
                            required:true
                        },
                        lesions:{
                            type:[String],
                            required:true
                        }
                    },
                    other:{
                        type:[String],
                        required:true
                    }
            }   
        ]
        
    },{timestamps:true}
);

module.exports=mongoose.model('User',userSchema);