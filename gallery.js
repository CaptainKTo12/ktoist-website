
const galleryStage = document.getElementById("gallery-stage");

const artworks = Array.from(
    { length: 21 },
    (_, i) => `drawing${i + 1}.png`
);

let highestZ = 10;

artworks.forEach((filename, index) => {

    const windowElement = document.createElement("div");
    windowElement.className = "art-window";

    const title = filename;

    windowElement.innerHTML = `
        <div class="art-titlebar">

            <span>&gt;${title}</span>

            <div class="art-buttons">
                <button class="min-btn" title="Minimize">_</button>
                <button class="max-btn" title="Maximize">&#9633;</button>
                <button class="close-btn" title="Close">&#215;</button>
            </div>

        </div>

        <div class="art-content">
            <img src="art/${filename}" alt="${title}">
        </div>

        <div class="art-status">
            ARTWORK ${String(index + 1).padStart(2, "0")} / 21
        </div>
    `;

    galleryStage.appendChild(windowElement);

    const isMobile = window.innerWidth <= 600;

    if (isMobile) {
        windowElement.style.left = "12px";
        windowElement.style.top = `${index * 255 + 12}px`;
    } else {
        const maxX = Math.max(
            0,
            galleryStage.clientWidth - 320
        );

        windowElement.style.left =
            `${Math.random() * maxX}px`;

        windowElement.style.top =
            `${Math.random() * 1300}px`;
    }

    windowElement.style.zIndex = ++highestZ;

    // Bring clicked window to front
    windowElement.addEventListener("pointerdown", () => {
        windowElement.style.zIndex = ++highestZ;
    });

    const titlebar = windowElement.querySelector(".art-titlebar");

    let dragging = false;
    let startX, startY;
    let originalX, originalY;

    titlebar.addEventListener("pointerdown", (e) => {

        if (e.target.closest("button")) return;
        if (windowElement.classList.contains("maximized")) return;

        dragging = true;

        startX = e.clientX;
        startY = e.clientY;

        originalX = windowElement.offsetLeft;
        originalY = windowElement.offsetTop;

        titlebar.setPointerCapture(e.pointerId);

    });

    titlebar.addEventListener("pointermove", (e) => {

        if (!dragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const maxX = galleryStage.clientWidth -
                     windowElement.offsetWidth;

        const maxY = galleryStage.scrollHeight -
                     windowElement.offsetHeight;

        const newX = Math.max(
            0,
            Math.min(maxX, originalX + dx)
        );

        const newY = Math.max(
            0,
            Math.min(maxY, originalY + dy)
        );

        windowElement.style.left = `${newX}px`;
        windowElement.style.top = `${newY}px`;

    });

    titlebar.addEventListener("pointerup", () => {
        dragging = false;
    });

    titlebar.addEventListener("pointercancel", () => {
        dragging = false;
    });

    windowElement.querySelector(".min-btn")
        .addEventListener("click", () => {

            windowElement.classList.toggle("minimized");

        });

    windowElement.querySelector(".max-btn")
        .addEventListener("click", () => {

            windowElement.classList.toggle("maximized");

        });

    windowElement.querySelector(".close-btn")
        .addEventListener("click", () => {

            windowElement.classList.add("hidden");

        });

});
