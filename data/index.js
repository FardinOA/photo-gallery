export const imageArr = Array(11)
    .fill("/images/image-")
    .map((ele, ind) =>
        ind < 9
            ? { id: ind + 1, url: (ele += `${ind + 1}.webp`) }
            : { id: ind + 1, url: (ele += `${ind + 1}.jpeg`) }
    );
