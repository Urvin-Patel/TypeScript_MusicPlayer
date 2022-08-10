// Created by:  1) Urvin Patel, Student Id: N01519084
//              2) Gobind , Student Id: N01518874


// Golbal Varialbles 
const container: HTMLElement  = document.querySelector(".container");
const playButton: HTMLElement = document.getElementById("#play");
const prevButton: HTMLElement   = document.getElementById("#prev");
const nextButton: HTMLElement   = document.getElementById("next");
const music: HTMLElement   = document.querySelector("#audio");
const progressBar: HTMLElement   = document.querySelector(".progress");
const progress: HTMLElement   = document.querySelector(".progress > div");
const trackName: HTMLElement   = document.querySelector(".track-name");
const cover: HTMLImageElement   = document.querySelector("#cover");
const trackStatus: HTMLElement   = document.querySelector(".track-status");

// Song titles
const songs: string[] = ["Beautiful", "Elevation", "On The Verge", "Winters Mist" ]

// Keep Track Of Songs(Default)
let songIndex: number = 0;

// Load Songs In DOM
loadSong(songs[songIndex]);

// Functions
// Update song Details
function loadSong(song: string) {
    trackName.innerText = song.toUpperCase();
music.src = `music/${song}.mp3`;
cover.src = `img/${song}.jpeg`;
}


function playSong() {
    container.classList.add("play");
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
    music.play();
}

function pauseSong() {
    container.classList.remove("play");
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
    music.pause();
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

    if (songIndex > songs.length -1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();  
}


function updateProgress (e) {
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //console.log(progressPercent);
}

function setProgress (e) {
    const width: number = this.clientWidth;
    const clickPosition: number = e.offsetX;
    const duration: number = music.duration;
    music.currentTime = (clickPosition / width) * duration;

}



// Event Listers

playButton.addEventListener("click", () => {
   const isPlaying = container.classList.contains("play");

    if (!isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
});    


// Change Song 
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

// Audio Progress bar
music.addEventListener("timeupdate", updateProgress); 

// Audio Progress on Click
progressBar.addEventListener("click", setProgress);

// Auto play Nrxt Song
music.addEventListener("ended", nextSong);