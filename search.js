const searchInput = document.getElementById("site-search-input");
const searchResults = document.getElementById("search-results");

const pages = [
    { file: "index.html", name: "Home" },
    { file: "blog.html", name: "Blog" },
    { file: "gallery.html", name: "Art Gallery" }
];

let searchIndex = [];


async function buildSearchIndex() {

    for (const page of pages) {

        try {

            const response = await fetch(page.file);

            if (!response.ok) continue;

            const html = await response.text();

            const parser = new DOMParser();

            const documentPage = parser.parseFromString(
                html,
                "text/html"
            );

            const elements = documentPage.querySelectorAll(
                "main h1, main h2, main h3, main p, main a, main li"
            );

            elements.forEach((element, index) => {

                const text = element.textContent
                    .replace(/\s+/g, " ")
                    .trim();

                if (!text || text.length < 3) return;

                searchIndex.push({

                    page: page.file,
                    pageName: page.name,
                    text: text,
                    id: `search-section-${index}`

                });

            });

        } catch (error) {

            console.error(
                "Could not index:",
                page.file,
                error
            );

        }

    }

    console.log(
        "KTo Search Engine: " +
        searchIndex.length +
        " sections indexed."
    );

}


function escapeHTML(text) {

    return text.replace(/[&<>"']/g, character => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

    })[character]);

}


function getSearchWords(query) {

    return query
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

}


function highlightText(text, query) {

    const words = getSearchWords(query);

    if (!words.length) {
        return escapeHTML(text);
    }

    const escapedWords = words.map(word =>
        word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    const regex = new RegExp(
        `(${escapedWords.join("|")})`,
        "gi"
    );

    return escapeHTML(text).replace(
        regex,
        '<span class="search-highlight">$1</span>'
    );

}


function performSearch(query) {

    searchResults.innerHTML = "";

    const words = getSearchWords(query);

    if (!words.length) {

        searchResults.classList.remove("active");
        return;

    }

    const matches = searchIndex.filter(item => {

        const text = item.text.toLowerCase();

        return words.every(word => text.includes(word));

    });

    searchResults.classList.add("active");

    if (matches.length === 0) {

        searchResults.innerHTML = `
            <div class="search-empty">
                &gt; No results found.
                Try another keyword.
            </div>
        `;

        return;

    }

    matches.slice(0, 30).forEach(item => {

        const preview = item.text.length > 150
            ? item.text.substring(0, 150) + "..."
            : item.text;

        const result = document.createElement("a");

        result.className = "search-result";

        result.href =
            `${item.page}#search=${encodeURIComponent(
                words.join(" ")
            )}`;

        result.innerHTML = `

            <div class="search-result-title">
                &gt; ${escapeHTML(item.pageName)}
            </div>

            <div class="search-result-preview">
                ${highlightText(preview, query)}
            </div>

        `;

        searchResults.appendChild(result);

    });

}


if (searchInput && searchResults) {

    searchInput.addEventListener("input", () => {

        performSearch(searchInput.value);

    });



    document.addEventListener("click", event => {

        if (!event.target.closest(".site-search")) {

            searchResults.classList.remove("active");

        }

    });


    searchInput.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            searchResults.classList.remove("active");
            searchInput.blur();

        }

    });

}

function highlightDestination() {

    const hash = window.location.hash;

    if (!hash.startsWith("#search=")) return;

    const query = decodeURIComponent(
        hash.substring(8)
    );

    const words = getSearchWords(query);

    if (!words.length) return;

    const elements = document.querySelectorAll(
        "main h1, main h2, main h3, main p, main a, main li"
    );

    for (const element of elements) {

        const text = element.textContent.toLowerCase();

        if (!words.every(word => text.includes(word))) {
            continue;
        }

        element.scrollIntoView({

            behavior: "smooth",
            block: "center"

        });

        element.classList.add("search-target");

        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];

        while (walker.nextNode()) {

            textNodes.push(walker.currentNode);

        }

        const escapedWords = words.map(word =>
            word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        );

        const regex = new RegExp(
            `(${escapedWords.join("|")})`,
            "gi"
        );

        textNodes.forEach(node => {

            const parent = node.parentNode;

            if (
                parent.nodeType === Node.ELEMENT_NODE &&
                parent.classList.contains("search-highlight")
            ) {
                return;
            }

            const parts = node.textContent.split(regex);

            if (parts.length === 1) return;

            const fragment = document.createDocumentFragment();

            parts.forEach(part => {

                if (words.some(word =>
                    word.toLowerCase() === part.toLowerCase()
                )) {

                    const span = document.createElement("span");

                    span.className = "search-highlight";
                    span.textContent = part;

                    fragment.appendChild(span);

                } else {

                    fragment.appendChild(
                        document.createTextNode(part)
                    );

                }

            });

            parent.replaceChild(fragment, node);

        });

        break;

    }

}

async function initializeSearch() {

    await buildSearchIndex();

    highlightDestination();

}

initializeSearch();