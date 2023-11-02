import { useState } from "react";

const useTour = () => {
    const [tourOpen, setTourOpen] = useState(false);
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
    return {
        startTour,
        closeTour,
        tourSteps,
        tourOpen,
        setTourOpen,
    };
};

export default useTour;
