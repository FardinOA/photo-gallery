"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Joyride from "react-joyride";

const ImagePopup = ({ images, currentIndex, onClose, onNext, onPrevious }) => {
    const [tourOpen, setTourOpen] = useState(true);
    const tourSteps = [
        {
            content:
                "This is your carousel. You can see the image by clicking the arrows",
            placement: "bottom",

            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            target: "#popupCarousel",
            title: "Carousel",
        },
        {
            content: "Close the carousel",
            placement: "bottom",

            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            target: "#closeBtn",
            title: "Close Button",
        },
        {
            content: "Slide Right",
            placement: "right",

            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            target: "#prevBtn",
            title: "Carousel",
        },
        {
            content: "Slide Left",
            placement: "left",

            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            target: "#nextBtn",
            title: "Carousel",
        },
    ];
    // Function to start the guided tour
    const startTour = () => {
        setTourOpen(true);
    };

    // Function to close the guided tour
    const closeTour = () => {
        setTourOpen(false);
    };
    return (
        <>
            <motion.div
                id="popupCarousel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="fixed   top-0 left-0  w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50"
            >
                <div className="relative">
                    <svg
                        id="closeBtn"
                        onClick={onClose}
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-plus-circle z-[51] rotate-45 text-red-500 absolute right-[7%] top-[2%] lg:top-2  cursor-pointer"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                    </svg>

                    <button
                        id="prevBtn"
                        onClick={onPrevious}
                        className="lg:text-white cursor-pointer absolute top-[50%] translate-y-[-50%] left-[4%] z-[53]  lg:left-[-5rem] "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-arrow-big-right rotate-180 "
                        >
                            <path d="M6 9h6V5l7 7-7 7v-4H6V9z" />
                        </svg>
                    </button>
                    <button
                        id="nextBtn"
                        onClick={onNext}
                        className="lg:text-white cursor-pointer absolute top-[50%] translate-y-[-50%] right-[4%] z-[53] lg:right-[-5rem]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-arrow-big-right"
                        >
                            <path d="M6 9h6V5l7 7-7 7v-4H6V9z" />
                        </svg>
                    </button>

                    <motion.div className="bg-white w-[90%] mx-auto rounded-lg p-4  overflow-hidden ">
                        <motion.figure
                            key={`currentImage-${currentIndex}`}
                            initial={{ opacity: 0, x: "-100%" }}
                            animate={{ opacity: 1, x: "0" }}
                            exit={{ opacity: 0, x: "-100%" }}
                            transition={{
                                duration: 1.4,
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                        >
                            <img
                                src={images[currentIndex]?.url}
                                alt="Image"
                                className="w-[90%] lg:max-w-full max-h-[80vh]"
                            />
                        </motion.figure>
                    </motion.div>
                </div>
            </motion.div>
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
        </>
    );
};

export default ImagePopup;
