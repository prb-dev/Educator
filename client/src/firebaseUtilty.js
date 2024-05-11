// firebaseUtils.js
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "./firebase"; // Assuming firebaseConfig.js contains your Firebase configuration

// Get a reference to the storage service
const storage = getStorage(app);

// Function to upload a video file
export const uploadVideo = async (file) => {
  const storageRef = ref(storage, "videos/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Upload progress monitoring
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed:", error);
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL); // Resolve with the download URL
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            reject(error);
          });
      }
    );
  });
};
