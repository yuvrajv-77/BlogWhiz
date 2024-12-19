import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '../config/firebaseConfig';

const storage = getStorage();

// Upload an image and get its URL
export const uploadImage = async (file: File, path: string): Promise<string> => {
    try {
        const storageRef = ref(storage, `${path}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image: ', error);
        throw error;
    }
};

// Delete an image from storage
export const deleteImage = async (imageUrl: string) => {
    try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
    } catch (error) {
        console.error('Error deleting image: ', error);
        throw error;
    }
};

// Upload multiple images and get their URLs
export const uploadMultipleImages = async (files: File[], path: string): Promise<string[]> => {
    try {
        const uploadPromises = files.map(file => uploadImage(file, path));
        const urls = await Promise.all(uploadPromises);
        return urls;
    } catch (error) {
        console.error('Error uploading multiple images: ', error);
        throw error;
    }
};

// Get the file extension from a file
export const getFileExtension = (filename: string): string => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Generate a unique filename
export const generateUniqueFileName = (originalName: string): string => {
    const extension = getFileExtension(originalName);
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomString}.${extension}`;
};
