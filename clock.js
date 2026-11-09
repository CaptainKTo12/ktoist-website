
function updateClock() {
    const finlandTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Helsinki",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).format(new Date());

    document.getElementById("finland-time").textContent = finlandTime;
}

updateClock();
setInterval(updateClock, 1000);
