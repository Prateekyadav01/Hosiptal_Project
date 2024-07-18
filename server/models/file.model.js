import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  newName: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const FileModel = mongoose.model("FileModel", fileSchema)

 export default FileModel;
