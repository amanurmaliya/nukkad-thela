// v2 must be imported
const cloudinary = require("cloudinary").v2

const fs = require("fs")

// this is used to get the secret variables
require("dotenv").config()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

// const uploadOnCloudinary = async (localFilePath) =>
// {
//     try {
//         // agar usse local file path nahi mili iska mtlb ye hai ki yaha pe koi image nahi aayi toh by default image return kar do 
//         if(!localFilePath)
//         {
//             return "defaultimagelink"
//         }

//         // logic to upload the file in the cloudinary
//         const cloudinaryResponse = await cloudinary.uploader.upload(localFilePath, {
//             // these are the optional paramenters you can read in cloudinary website too

//             // This will automatically detect the type of the file that we are uploading 
//             resource_type  : "auto"
//         })

//         // since the image is uploaded successfully now we can return the response 

//         // Here in return we are only concerned about the public link of the images hence
//         return cloudinaryResponse.url;
//     } catch (error) {
        
//         // if the file upload has failed kindly delete the file present in the local directory
//         // Here sync means first delete the file then process to some other work
//         fs.unlinkSync(localFilePath)

//         return "default image"
//     }
// }

const uploadOnCloudinary = async (fileBuffer, fileFormat) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", format: fileFormat }, 
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.url);
                }
            }
        );
        uploadStream.end(fileBuffer); // Send file buffer to Cloudinary
    });
};


module.exports = uploadOnCloudinary