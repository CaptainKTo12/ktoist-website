const playlists = [

    {
        name: "Нещастник",
        url: "https://open.spotify.com/playlist/12FVPJAdktpVQw6RNgGlOV",
        id: "12FVPJAdktpVQw6RNgGlOV"
    },

    {
        name: "Носталгия",
        url: "https://open.spotify.com/playlist/3j0mhmdlm4E1a6p5ArNyAi",
        id: "3j0mhmdlm4E1a6p5ArNyAi"
    },

    {
        name: "Tomorrow is just another day",
        url: "https://open.spotify.com/playlist/4LtwY6UJoq7uXcilj5mrSF",
        id: "4LtwY6UJoq7uXcilj5mrSF"
    },

    {
        name: "Computer Nerd",
        url: "https://open.spotify.com/playlist/54OQzRcZYvWhj465xluSZy",
        id: "54OQzRcZYvWhj465xluSZy"
    }

];


const fileButton = document.getElementById("file-button");
const saveButton = document.getElementById("save-button");

const playlistMenu = document.getElementById("playlist-menu");
const playlistName = document.getElementById("playlist-name");

const spotifyPlayer = document.getElementById("spotify-player");

const playlistOptions = document.querySelectorAll(".playlist-option");


const xpPlayer = document.querySelector(".xp-player");

const minimizeButton = document.getElementById("minimize-button");
const maximizeButton = document.getElementById("maximize-button");
const closeButton = document.getElementById("close-button");


let currentPlaylist = 1;


function changePlaylist(index) {

    const playlist = playlists[index];

    if (!playlist) return;

    currentPlaylist = index;

    spotifyPlayer.src =
        `https://open.spotify.com/embed/playlist/${playlist.id}?theme=0`;

    playlistName.textContent = "♫ " + playlist.name;

    playlistMenu.classList.remove("active");

}


fileButton.addEventListener("click", function(event) {

    event.stopPropagation();

    playlistMenu.classList.toggle("active");

});


playlistOptions.forEach(function(option) {

    option.addEventListener("click", function() {

        const index = Number(this.dataset.playlist);

        changePlaylist(index);

    });

});


saveButton.addEventListener("click", function() {

    const playlist = playlists[currentPlaylist];

    window.open(
        playlist.url,
        "_blank",
        "noopener,noreferrer"
    );

});


document.addEventListener("click", function(event) {

    if (!event.target.closest(".menu-container")) {

        playlistMenu.classList.remove("active");

    }

});


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        playlistMenu.classList.remove("active");

    }

});



minimizeButton.addEventListener("click", function() {

    xpPlayer.classList.toggle("minimized");

});



maximizeButton.addEventListener("click", function() {

    xpPlayer.classList.remove("minimized");

});



closeButton.addEventListener("click", function() {

    xpPlayer.classList.add("closed");

});



changePlaylist(currentPlaylist);
