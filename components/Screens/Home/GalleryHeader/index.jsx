import React from "react";

const GalleryHeader = ({ selectedImageArray, startTour, deleteImage }) => {
    return (
        <div className="flex justify-between   border-b-[1px] p-4 lg:px-12">
            <div id="selectionIndicator">
                {" "}
                <input
                    checked={selectedImageArray?.length}
                    type="checkbox"
                />{" "}
                <label htmlFor="">
                    {selectedImageArray?.length
                        ? selectedImageArray?.length
                        : null}{" "}
                    Files selected
                </label>
            </div>
            <button onClick={startTour}>Guide me</button>
            <button
                id="deleteBtn"
                className="text-red-500"
                onClick={deleteImage}
            >
                Delete files
            </button>
        </div>
    );
};

export default GalleryHeader;
