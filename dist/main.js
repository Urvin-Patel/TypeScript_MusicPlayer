"use strict";
// Golbal Varialbles 
const wrapper = document.querySelector("main");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const audio = document.querySelector("audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const title = document.querySelector("h2");
const cover = document.querySelector("img");
// Song titles
const songs = ["Beautiful", "Elevation", "On The Verge", "Winters Mist"];
// Keep Track Of Songs(Default)
let songIndex = 0;
// Load Songs In DOM
loadSong(songs[songIndex]);
// Functions
// Update song Details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `img/${song}.jpeg`;
}
function playSong() {
    wrapper.classList.add("play");
    play.querySelector("span.fa-solid").classList.remove("fa-play");
    play.querySelector("span.fa-solid").classList.add("fa-pause");
    audio.play();
}
function pauseSong() {
    wrapper.classList.remove("play");
    play.querySelector("span.fa-solid").classList.add("fa-play");
    play.querySelector("span.fa-solid").classList.remove("fa-pause");
    audio.pause();
}
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function updateProgress(e) {
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //console.log(progressPercent);
}
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
// Event Listers
play.addEventListener("click", (isPlaying) => {
    isPlaying = wrapper.classList.contains("play");
    if (!isPlaying) {
        playSong();
    }
    else {
        pauseSong();
    }
});
// Change Song 
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
// Audio Progress bar
audio.addEventListener("timeupdate", updateProgress);
// Audio Progress on Click
progressContainer.addEventListener("click", setProgress);
// Auto play Nrxt Song
audio.addEventListener("ended", nextSong);
