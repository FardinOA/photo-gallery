"use client";
import React, { useState } from "react";
import { imageArr } from "@/data";
import Image from "next/image";
import { motion } from "framer-motion";
const Gallery = () => {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([...imageArr]);
    const [dragStartPosition, setDragStartPosition] = useState(null);
    const [dragEnterPosition, setDragEnterPosition] = useState(null);
    const [dragHover, setDragHover] = useState("");

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
    console.log(dragHover);
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

    console.log(images);
    const [state, setState] = useState([
        { id: 1, name: "shrek" },
        { id: 2, name: "fiona" },
    ]);
    return (
        <div className="space-y-12">
            <div className=" bg-white    rounded-xl my-8 p-4 ">
                <div className="grid grid-cols-5 gap-6 ">
                    {[...images]?.map((ele, ind) => (
                        <motion.figure
                            onDragStart={() => dragStart(ind)}
                            onDragEnter={(e) => dragEnter(ind, ele.url, e)}
                            onDragEnd={(e) => dropTheElement(e)}
                            onDragOver={(e) => handleDragOver(e, ind)}
                            draggable
                            className={`group cursor-pointer relative   ${
                                ind === 0 && `col-span-2 row-span-2 `
                            }  w-full border rounded-lg`}
                            // framer motion config
                            // drag
                        >
                            <div className=" pt-4 pl-4 hidden group-hover:block  absolute transition-all duration-500 rounded-lg top-0 left-0 w-full h-full bg-black opacity-50 ">
                                <input type="checkbox" className=" h-6 w-6 " />
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
                    <div className="   h-[202.797px] w-full">
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
            </div>
        </div>
    );
};

export default Gallery;
