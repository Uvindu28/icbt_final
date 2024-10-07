const UploadImg = async (image) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Images");

    try {
        const dataResponse = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!dataResponse.ok) {
            const errorDetails = await dataResponse.json();
            throw new Error(`Failed to upload image: ${errorDetails.error.message}`);
        }

        return await dataResponse.json();
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export default UploadImg;
