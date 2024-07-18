
import multer from 'multer'
import path from 'path'
import {v4 as uuid} from 'uuid'


const uploadFolder = "imageUpload"
const storage = multer.diskStorage({
    destination:(req,file,cb)=> cb(null,uploadFolder),
    filename:(req,file,cb ) =>{
        console.log("file Console------>",file);
        const filename = uuid() + path.extname(file.originalname);
        cb(null,filename)
    }
})

const upload = multer({
    storage:storage
}).single("imageUrl");

export const uploadFile = (req,res)=>{
    console.log("profileImage----------->" ,req.body)
    upload(req,res, async(error)=>{
        if(error){
            return res.status(400).json({error:error.message})
        }
        console.log("whole data",req.file);

        const fileData = {
            originalName:req.file.originalname,
            newName:req.file.filename,
            size:req.file.size
        }
        console.log("--------------->fileDATA",fileData);
        return res.status(200).json({message:"File uploaded successfully",file:req.file})
    })
}

export const profileUpdate = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}