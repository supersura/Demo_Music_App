const music = document.querySelector('audio');
const play = document.getElementById('play');
const img = document.querySelector('img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const musicContainer = document.querySelector('.music_container');

const songs = [
    {
        name: "thapa-1",
        title: "Baatein Teri",
        artist: "Armaan Malik"
    },
    {
        name: "thapa-2",
        title: "Saanson Ki Maalan",
        artist: "Payal Dev"
    },
    {
        name: "thapa-3",
        title: "Kabira",
        artist: "Jubin Nautiyal"
    },
];

let isPlaying = false;
let dropletInterval;
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']; // Array of colors

// Function to create a droplet
const createDroplet = () => {
    const droplet = document.createElement('div');
    droplet.classList.add('droplet');
    droplet.style.left = `${Math.random() * 100}%`; // Random horizontal position

    // Random color from the array
    const color = colors[Math.floor(Math.random() * colors.length)];
    droplet.style.background = color;

    musicContainer.appendChild(droplet);

    // Remove droplet after animation ends
    droplet.addEventListener('animationend', () => {
        droplet.remove();
    });
};

const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add('anime');
    dropletInterval = setInterval(createDroplet, 500); // Start creating droplets
};

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove('anime');
    clearInterval(dropletInterval); // Stop droplet
};

play.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Changing the music 
const loadSong = (song) => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.src = "music/" + song.name + ".mp3";
    img.src = "images/" + song.name + ".jpg";
};

let songIndex = 0;

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
