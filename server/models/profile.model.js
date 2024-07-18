import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image:{
        type:String
    },
    dailyNote:{
        type:String
    }
})


const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
