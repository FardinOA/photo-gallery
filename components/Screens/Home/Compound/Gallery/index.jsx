"use client";
import React, { Suspense, useEffect, useState } from "react";
import { imageArr } from "@/data";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ImagePopup from "../../ImagePopup";
import Joyride from "react-joyride";
import GalleryHeader from "../../GalleryHeader";
import useTour from "../../Hooks/useTour";
import useImageUpload from "../../Hooks/useImageUpload";
import useReorder from "../../Hooks/useReorder";
import useGallery from "../../Hooks/useGallery";
import { ImageAsync } from "@/components/Ui/ImageAsync";
const Gallery = () => {
    const [images, setImages] = useState([...imageArr]);
    const [isLoaded, setIsLoaded] = useState(false);

    const {
        closePopup,
        deleteImage,
        handleDoubleClick,
        handleSelect,
        showPopup,
        selectedImageArray,
        popupImages,
        popupImageIndex,
        setPopupImageIndex,
    } = useGallery(images, setImages);

    const { dragEnter, dragStart, dropTheElement, handleDragOver, dragHover } =
        useReorder(setImages, images);
    const { closeTour, startTour, tourSteps, tourOpen } = useTour();
    const { handleImageUpload, openImageUpload } = useImageUpload(setImages);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!isLoaded)
        return (
            <div className=" h-screen  flex justify-center items-center">
                <div className="loader">
                    <span className="text-[40px] lg:text-[70px]">
                        VisualVault
                    </span>
                    <span className="text-[40px] lg:text-[70px]">
                        VisualVault
                    </span>
                </div>
            </div>
        );
    else
        return (
            <div className="space-y-12">
                <div
                    id="imageGallery"
                    className=" bg-white    rounded-xl mb-8 "
                >
                    {/* header of the gallery */}
                    <GalleryHeader
                        deleteImage={deleteImage}
                        selectedImageArray={selectedImageArray}
                        startTour={startTour}
                    />
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

                                        layout: {
                                            duration: 1.5,
                                        },
                                    }}
                                    onDragStart={() => dragStart(ind)}
                                    onDragEnter={(e) =>
                                        dragEnter(ind, ele.url, e)
                                    }
                                    onDragEnd={(e) => dropTheElement(e)}
                                    onDragOver={(e) => handleDragOver(e, ind)}
                                    draggable
                                    className={`group cursor-pointer relative   ${
                                        ind === 0 && `col-span-2 row-span-2 `
                                    } min-h-[202.797px]  w-full border ${
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
                                            <ImageAsync
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
                                            className="lucide lucide-image"
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
                                        (prev) =>
                                            (prev + 1) % popupImages.length
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
                        if (
                            data.action === "close" ||
                            data.status === "finished"
                        ) {
                            closeTour();
                        }
                    }}
                />
            </div>
        );
};

export default Gallery;
