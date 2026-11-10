function makeDraggable(windowId, titlebarId) {

    const imageWindow = document.getElementById(windowId);
    const imageTitlebar = document.getElementById(titlebarId);

    let dragging = false;

    let startX = 0;
    let startY = 0;

    let windowX = 0;
    let windowY = 0;


    imageTitlebar.addEventListener("pointerdown", function(event) {

        if (event.button !== 0) return;

        // Ignore clicks on window buttons
        if (event.target.closest("button")) return;

        dragging = true;

        startX = event.clientX;
        startY = event.clientY;

        imageTitlebar.setPointerCapture(event.pointerId);

        imageTitlebar.style.cursor = "grabbing";

        imageWindow.style.zIndex = ++highestWindow;

    });


    imageTitlebar.addEventListener("pointermove", function(event) {

        if (!dragging) return;

        const moveX = event.clientX - startX;
        const moveY = event.clientY - startY;

        imageWindow.style.transform =
            `translate(${windowX + moveX}px, ${windowY + moveY}px)`;

    });



    function stopDragging() {

        if (!dragging) return;

        dragging = false;

        const matrix = new DOMMatrix(
            getComputedStyle(imageWindow).transform
        );

        windowX = matrix.m41;
        windowY = matrix.m42;

        imageTitlebar.style.cursor = "grab";

    }

    imageTitlebar.addEventListener("pointerup", stopDragging);
    imageTitlebar.addEventListener("pointercancel", stopDragging);

}



let highestWindow = 10;


makeDraggable("image-window", "image-titlebar");
makeDraggable("china-window", "china-titlebar");
makeDraggable("minecraft-window", "minecraft-titlebar");
