document.getElementById("play-pause").addEventListener("click", function() {
    const playIcon = this.querySelector(".play");
    const pauseIcon = this.querySelector(".pause");

    if (playIcon.style.display === "none") {
        playIcon.style.display = "";
        pauseIcon.style.display = "none";
    } else {
        playIcon.style.display = "none";
        pauseIcon.style.display = "";
    }
});
