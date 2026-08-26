const audio = document.getElementById("audio");
const musicFiles = document.getElementById("musicFiles");
const libraryBtn = document.getElementById("libraryBtn");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const songTitle = document.getElementById("songTitle");

let songs = [];
let currentSong = 0;

libraryBtn.addEventListener("click", () => {
    musicFiles.click();
});

musicFiles.addEventListener("change", (e) => {
    songs = Array.from(e.target.files);

    if (songs.length > 0) {
        currentSong = 0;
        loadSong(currentSong);
    }
});

function loadSong(index){
    const song = songs[index];

    if(song){
        audio.src = URL.createObjectURL(song);
        songTitle.textContent = song.name;
        audio.play();
        playBtn.textContent = "⏸";
    }
}

playBtn.addEventListener("click", () => {

    if(!audio.src) return;

    if(audio.paused){
        audio.play();
        playBtn.textContent = "⏸";
    }else{
        audio.pause();
        playBtn.textContent = "▶";
    }
});

nextBtn.addEventListener("click", () => {
    if(songs.length === 0) return;

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);
});

prevBtn.addEventListener("click", () => {
    if(songs.length === 0) return;

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
});

shuffleBtn.addEventListener("click", () => {
    if(songs.length === 0) return;

    currentSong = Math.floor(Math.random() * songs.length);
    loadSong(currentSong);
});

audio.addEventListener("ended", () => {
    nextBtn.click();
});
