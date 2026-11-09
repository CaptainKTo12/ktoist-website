const imageWindow = document.getElementById("image-window");
const imageTitlebar = document.getElementById("image-titlebar");

let dragging = false;

let startX = 0;
let startY = 0;

let windowX = 0;
let windowY = 0;


imageTitlebar.addEventListener("pointerdown", function(event) {

    if (event.button !== 0) return;

    dragging = true;

    startX = event.clientX;
    startY = event.clientY;

    imageTitlebar.setPointerCapture(event.pointerId);

    imageTitlebar.style.cursor = "grabbing";

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
function openDoomWindow() {
    const doomWindow = document.getElementById("doom-window");
    const doomFrame = document.getElementById("doom-frame");

    if (!doomWindow || !doomFrame) {
        console.error("DOOM window elements not found!");
        return;
    }

    doomWindow.classList.add("open");
    doomWindow.style.zIndex = ++highestWindow;

    if (doomFrame.src === "about:blank") {
        doomFrame.src = "YOUR_WORKING_DOOM_EMBED_URL";
    }
}

imageTitlebar.addEventListener("pointerup", stopDragging);
imageTitlebar.addEventListener("pointercancel", stopDragging);
