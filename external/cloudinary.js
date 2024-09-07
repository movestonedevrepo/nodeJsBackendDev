


const {v2} = require('cloudinary');
const fs = require('fs')

const cloudinary=v2;

const cloudinaryConfig = cloudinary.config({

    cloud_name:process.env.CLOUDINARY_CLOUD,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async(localFilePath)=>{

    try {

        if (!localFilePath) {

            throw ({message:'unable to find path'})
            
        }

       const uploadedFie = await  cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
            fetch_format: 'auto',
            quality: 'auto'
        })

        console.log("file is uploded on ", uploadedFie);

        return uploadedFie;

        
    } catch (error) {

        fs.unlinkSync(localFilePath);
        console.log(error.message)
        throw ({errorMessage:"error caught in cloudinary level", message:error.message}); 
        
    }




}
module.exports={cloudinaryConfig,uploadOnCloudinary}