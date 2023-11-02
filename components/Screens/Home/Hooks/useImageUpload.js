const useImageUpload = (setImages) => {
    const openImageUpload = () => {
        const element = document.getElementById("image_upload_input");
        element.click();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImages((prev) => [
                    ...prev,
                    { id: prev.length + 1, url: e.target.result },
                ]);
            };
            reader.readAsDataURL(file);
        }
    };

    return {
        openImageUpload,
        handleImageUpload,
    };
};

export default useImageUpload;
