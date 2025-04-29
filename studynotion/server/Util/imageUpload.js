const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  console.log("OPTIONS", options);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};


// const cloudinary = require("cloudinary").v2;

// exports.uploadImageCloudinary = async (file,tempFilePath,buffer, folder, height, quality) => {
//     const options = { folder, resource_type: "auto" };
//     if (height) options.height = height;
//     if (quality) options.quality = quality;

//     console.log("File received for upload:", file);
//     console.log("Temp-File-Path:", tempFilePath);
//     console.log("File Data Buffer:", buffer ? "Exists" : "Does not exist");

//     if (!file || (!tempFilePath && !buffer)) {
//         throw new Error("Invalid file input");
//     }

//     try {
//         if (tempFilePath) {
//             return await cloudinary.uploader.upload(tempFilePath, options);
//         } else {
//             return await new Promise((resolve, reject) => {
//                 const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
//                     if (error) reject(error);
//                     else resolve(result);
//                 });
//                 uploadStream.end(file.data);
//             });
//         }
//     } catch (error) {
//         console.error("Error uploading to Cloudinary:", error);
//         throw error;
//     }
// };



