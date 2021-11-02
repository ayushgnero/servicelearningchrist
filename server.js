const express = require('express');
const cors = require('cors')
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const fileUpload = require('express-fileupload');
mongoose.connect("mongodb+srv://Max:amanaditya@service-learning.moeta.mongodb.net/mytable?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});()=>{
    console.log("connected to DB")
}
app.use(fileUpload());

//user schema 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    regno:{
        type:String,
        required:true
    },
    Class:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    bitrthdate:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const User = new mongoose.model("User", userSchema)

//routes routes
app.post("/Login",(req,res)=>{
    console.log(req.body) 
    const {regno,password} =req.body;
    User.findOne({regno:regno},async (err,user)=>{
        console.log(user)
        if(user){
            const validPassword = await bcrypt.compare(password, user.password);
           if(validPassword){
               res.send({message:"login success",user:user,flag:true})
               console.log("login success")
           }else{
               res.send({message:"wrong credentials",flag:false})
               console.log("wrong credentials")
           }
        }else{
            res.send("not register")
        }
    })
});
app.post("/Register", async (req,res)=>{
    console.log(req.body) 
    
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const {name,regno,role,Class,password,gender,address,phone,city,bitrthdate} =req.body;
    User.findOne({regno:regno},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({name,regno,role,Class,password,gender,address,phone,city,bitrthdate})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"sucessfull"})
                }
            })
        }
    })
}) 
app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    sampleFile = req.files.sampleFile;
    uploadPath ='public/' + sampleFile.name;
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
      else
        res.redirect('htttps://localhost:3000/bulkupload')
    });
  });
  app.get('/download/:id',(req,res)=>{
    picModel.find({_id:req.params.id},(err,data)=>{
         if(err){
             console.log(err)
         }
         else{
             var x= __dirname+'/public/'+data[0].picpath;
             res.download(x)
         }
    })
})
if (process.env.NODE_ENV === "production"){
    app.use(express.static("max/build"))
}
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("started")
})
