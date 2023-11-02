import { useState } from "react";

const useReorder = (setImages, images) => {
    const [dragStartPosition, setDragStartPosition] = useState(null);
    const [dragEnterPosition, setDragEnterPosition] = useState(null);
    const [dragHover, setDragHover] = useState("");

    // grab element
    const dragStart = (position) => {
        setDragStartPosition(position);
    };

    // drop position
    const dragEnter = (position, url, e) => {
        e.preventDefault();
        setDragEnterPosition(position);
        setDragHover(url);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
    };

    // drop element
    const dropTheElement = (e) => {
        e.preventDefault();
        if (dragStartPosition !== null && dragEnterPosition !== null) {
            const newImages = [...images];
            const copyTheDraggedElement = newImages[dragStartPosition];
            newImages.splice(dragStartPosition, 1);
            newImages.splice(dragEnterPosition, 0, copyTheDraggedElement);
            setImages(newImages); // Update the images array
        }
        setDragStartPosition(null); // Reset drag start and enter positions
        setDragEnterPosition(null);
        setDragHover("");
    };
    return {
        dragEnter,
        dragStart,
        handleDragOver,
        dropTheElement,
        dragHover,
    };
};

export default useReorder;
