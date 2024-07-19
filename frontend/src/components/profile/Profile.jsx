import React, { useState, useEffect } from 'react';
import { uploadImage } from '../../utils/Api';

const Profile = () => {
    
    const [imagePreview, setImagePreview] = useState('');
    const [inputValue,setInputValue] =useState('');
    // const [imageChange,setImageC]

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFileChange = async(e) => {
        console.log(e);
       console.log("file Change_ ", e.target.files[0])
       const fileName = e.target.files[0];
       console.log(fileName);
       const data = await uploadImage({fileName});
       console.log(data);
       console.log(data.file.originalName);
       setImagePreview(URL.createObjectURL(fileName));
       
    };
    // console.log(imagePreview);

    const handleSave = () => {
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-3xl">
                <div className="md:flex">
                    <div className="w-full p-6 bg-gray-100">
                        <h2 className="text-2xl font-bold mb-4">Profile</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    className="mb-4 w-full h-auto max-h-60 object-cover rounded-md"
                                />
                            )}
                            <input 
                                type="file" 
                                name="image" 
                                onChange={handleFileChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Daily Note</label>
                            <textarea 
                                name="dailyNote"
                                value={inputValue} 
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Write your daily note here"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button 
                                onClick={handleSave} 
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
