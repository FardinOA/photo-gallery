import { useState } from "react";

const useGallery = (images, setImages) => {
    const [selectedImageArray, setSelectedImageArray] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupImages, setPopupImages] = useState([...images]);
    const [popupImageIndex, setPopupImageIndex] = useState(0);

    // Handle double-click on an image to show the popup
    const handleDoubleClick = (imageUrl, index) => {
        setPopupImages([...images]);
        setPopupImageIndex(index);
        setShowPopup(true);
    };
    const closePopup = () => {
        setShowPopup(false);
    };

    const deleteImage = () => {
        const arr = images.filter((ele, ind) => {
            if (!selectedImageArray.includes(ele.id)) return ele;
        });
        setImages(arr);
        setSelectedImageArray([]);
    };

    const handleSelect = (ele) => {
        setSelectedImageArray((prev) => {
            if (prev.includes(ele.id)) {
                // Remove the element from the array if it's already selected
                return prev.filter((id) => id !== ele.id);
            } else {
                // Add the element to the array if it's not selected
                return [...prev, ele.id];
            }
        });
    };
    return {
        handleDoubleClick,
        handleSelect,
        deleteImage,
        closePopup,
        showPopup,
        popupImages,
        popupImageIndex,
        selectedImageArray,
        setPopupImageIndex,
    };
};

export default useGallery;
