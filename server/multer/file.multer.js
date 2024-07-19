
// import multer from 'multer'
// import path from 'path'
// import {v4 as uuid} from 'uuid'
// import FileModel from '../models/file.model.js'


// const uploadFolder = "imageUpload"
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=> cb(null,uploadFolder),
//     filename:(req,file,cb ) =>{
//         console.log("file Console------>",file);
//         const filename = uuid() + path.extname(file.originalname);
//         cb(null,filename)
//     }
// })

// const upload = multer({
//     storage:storage
// }).single("imageUrl");

// export const uploadFile = (req,res)=>{
//     console.log("profileImage----------->" ,req.body)
//     upload(req,res, async(error)=>{
//         if(error){
//             return res.status(400).json({error:error.message})
//         }
//         console.log("whole data",req.file);

//         const fileData = {
//             originalName:req.file.originalname,
//             newName:req.file.filename,
//             size:req.file.size
//         }
//         console.log("--------------->fileDATA",fileData);
//         const newImageFile = await FileModel.create(fileData)
//         return res.status(200).json({message:"File uploaded successfully",file_id : newImageFile._id})
//     })
// }

// export const shareableLink = async(req,res)=>{
//     try {
//         const fileId = req.params.fileId;
//         if(!fileId){
//             console.log("Please provide a file");
//             return res.status(400).json({message: "File ID is required"})
//         }
//         console.log(fileId);
//         const shareLink = `/file/download/${fileId}`

//         const fileCheck = await FileModel.findById(fileId)

//         if(!fileCheck){
//             console.log("File not found in db");
//             return res.status(404).json({message: "File not found"})
//         }

//         res.status(200).json({
//             message: "Shareable link generated successfully",
//             shareLink
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal Server Error in shareable link",
//             error: error.message
//         })
//     }
// }


// export const downloadFile = async (req, res) => {
//     const fileId = req.params.fileId;
//     const fileData = await FileModel.findById(fileId);
//     if (!fileData) {
//       // File is not available for this ID
//       return res.status(400).end("Invalid URL");
//     }
//     console.log(fileData);
//     const path = `imageUpload/${fileData.newName}`;
//     res.download(path, fileData.originalName);
//   };