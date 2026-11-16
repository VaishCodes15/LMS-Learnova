import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import e from "express";
dotenv.config({});

cloudinary.config({
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
  cloud_name:process.env.CLOUD_NAME,
});

//upload media (pic/video)
export const uploadMedia = async (file) =>{
  try{
    const uploadResponse = await cloudinary.uploader.upload(file,{
      resource_type:"auto"
    });
    return uploadResponse;
  }
  catch(error)
  {
    console.log(error);
  }
};

//delete media (pic)
export const deleteMediaFromCloudinary = async(publicId)=>{
  try{
    await cloudinary.uploader.destroy(publicId);
  }catch(error){
    console.log(error);
  }
};

//delete media video
export const deleteVideoFromCloudinary = async(publicId)=>{
  try{
    await cloudinary.uploader.destroy(publicId,{resource_type:"video"})
  }catch(error)
  {
    console.log(error);
  }
}