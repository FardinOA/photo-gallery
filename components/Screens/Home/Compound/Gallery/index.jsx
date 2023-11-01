"use client";
import React, { useState } from "react";
import { imageArr } from "@/data";
import Image from "next/image";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import ImagePopup from "../../ImagePopup";
import Joyride from "react-joyride";
const Gallery = () => {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([...imageArr]);
    const [dragStartPosition, setDragStartPosition] = useState(null);
    const [dragEnterPosition, setDragEnterPosition] = useState(null);
    const [dragHover, setDragHover] = useState("");
    const [selectedImageArray, setSelectedImageArray] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupImages, setPopupImages] = useState([...images]);
    const [popupImageIndex, setPopupImageIndex] = useState(0);

    const [tourOpen, setTourOpen] = useState(false);

    // Handle double-click on an image to show the popup
    const handleDoubleClick = (imageUrl, index) => {
        setPopupImages([...images]);
        setPopupImageIndex(index);
        setShowPopup(true);
    };
    const closePopup = () => {
        setShowPopup(false);
    };

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

    // Function to start the guided tour
    const startTour = () => {
        setTourOpen(true);
    };

    // Function to close the guided tour
    const closeTour = () => {
        setTourOpen(false);
    };

    const tourSteps = [
        {
            target: "#imageGallery",
            title: "Your Beautiful Image Gallery",
            content: (
                <div>
                    This is a simple modern image gallery. You can reorder your
                    images by drag and drop. Have fun!!
                </div>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            placement: "bottom",
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
        },
        {
            target: "#imageItem-0",
            title: "Featured Image",
            content: (
                <div>
                    This is your feature image. You can set this feature image
                    by simple drag and drop
                    <br />
                    Drag any image and drop this section makes that image your
                    feature image
                    <br />
                    <br />
                    And you can also hover and select the image and delete it
                </div>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            placement: "bottom",
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
        },
        {
            content: "By clicking this you can delete your selected image",
            placement: "bottom",
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            target: "#deleteBtn",
            title: "Delete button",
        },
        {
            content: "Here you can see how many images you have selected",
            placement: "bottom",
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            target: "#selectionIndicator",
            title: "Selection indicator",
        },
        {
            content:
                "By clicking this you can add new images in your image gallery",
            placement: "top",
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            target: "#imageInput",
            title: "Add Image",
        },
        {
            content:
                "Double tap any image to see the full view of the image. Please double click here",
            placement: "bottom",
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            target: "#imageItem-1",
            title: "Double click",
        },
    ];

    return (
        <div className="space-y-12">
            <div id="imageGallery" className=" bg-white    rounded-xl mb-8 ">
                {/* header of the gallery */}
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
                <AnimatePresence>
                    {" "}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 p-4 lg:px-12 mt-4 ">
                        {[...images]?.map((ele, ind) => (
                            <motion.figure
                                id={`imageItem-${ind}`}
                                key={`${ele.url}-${ind}`}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.9,
                                    type: "spring",
                                    // delay: ele.id * 0.02,
                                    layout: {
                                        duration: 1.5,
                                    },
                                }}
                                onDragStart={() => dragStart(ind)}
                                onDragEnter={(e) => dragEnter(ind, ele.url, e)}
                                onDragEnd={(e) => dropTheElement(e)}
                                onDragOver={(e) => handleDragOver(e, ind)}
                                draggable
                                className={`group cursor-pointer relative   ${
                                    ind === 0 && `col-span-2 row-span-2 `
                                }  w-full border ${
                                    dragHover == ele?.url &&
                                    " border-2 scale-105 "
                                } rounded-lg`}
                                onDoubleClick={() =>
                                    handleDoubleClick(ele.url, ind)
                                }
                            >
                                <div
                                    className={` pt-4 pl-4 group-hover:block ${
                                        selectedImageArray.includes(ele.id)
                                            ? "block"
                                            : "hidden"
                                    } absolute transition-all duration-500 rounded-lg top-0 left-0 w-full h-full bg-black/50 z-[1]`}
                                >
                                    <input
                                        onClick={() => handleSelect(ele)}
                                        type="checkbox"
                                        className=" h-6 w-6 cursor-pointer border-none rounded-lg "
                                    />
                                </div>
                                {dragHover == ele?.url ? null : (
                                    <>
                                        <Image
                                            height={0}
                                            width={0}
                                            sizes="100"
                                            alt="Image"
                                            src={ele?.url}
                                            className={` ${
                                                ind != 0
                                                    ? `h-[202.797px]`
                                                    : `h-full`
                                            } w-full rounded-lg`}
                                        />
                                    </>
                                )}
                            </motion.figure>
                        ))}
                        <div
                            id="imageInput"
                            className="   h-[202.797px] w-full"
                        >
                            <div className="h-full w-full relative border border-dashed rounded-lg">
                                {" "}
                                {image && (
                                    <div className="absolute top-0 left-0 w-full h-full bg-black z-[2] opacity-50 rounded-lg "></div>
                                )}
                                <div
                                    onClick={openImageUpload}
                                    className={` absolute z-[9] text-[20px]  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] scale-[1.1]   rounded-lg py-0 px-[10px]  cursor-pointer transition-all duration-300 hover:opacity-100 hover:scale-[1.3] `}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-image"
                                    >
                                        <rect
                                            width="18"
                                            height="18"
                                            x="3"
                                            y="3"
                                            rx="2"
                                            ry="2"
                                        />
                                        <circle cx="9" cy="9" r="2" />
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                    </svg>
                                </div>
                                <p className="text-[14px]  absolute z-[9]    left-[50%] top-[65%] translate-x-[-50%] translate-y-[-50%]">
                                    Add images
                                </p>
                                {image ? (
                                    <img
                                        className=" rounded-lg h-full w-full object-cover z-[1] absolute top-0 left-0  border-none "
                                        src={image}
                                    />
                                ) : null}
                                <input
                                    onChange={handleImageUpload}
                                    id={"image_upload_input"}
                                    className={"hidden"}
                                    type={"file"}
                                />
                            </div>
                        </div>
                    </div>
                </AnimatePresence>

                <AnimatePresence>
                    {showPopup && (
                        <ImagePopup
                            images={popupImages}
                            currentIndex={popupImageIndex}
                            onClose={closePopup}
                            onNext={() =>
                                setPopupImageIndex(
                                    (prev) => (prev + 1) % popupImages.length
                                )
                            }
                            onPrevious={() =>
                                setPopupImageIndex((prev) =>
                                    prev === 0
                                        ? popupImages.length - 1
                                        : prev - 1
                                )
                            }
                        />
                    )}
                </AnimatePresence>
            </div>

            <Joyride
                steps={tourSteps}
                run={tourOpen}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                callback={(data) => {
                    if (data.action === "close" || data.status === "finished") {
                        closeTour();
                    }
                }}
            />
        </div>
    );
};

export default Gallery;
