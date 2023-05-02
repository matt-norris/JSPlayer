const trackUrls = [
  'audio/all.m4a',
  'audio/CheckYes.m4a',
  'audio/ImYours.m4a'
];

const playlistItems = document.querySelectorAll('.list-group-item');
const trackName = document.querySelector('.player-info h2');
const artistName = document.querySelector('.player-info h3');
const albumCover = document.querySelector('.album-cover img');
let player = {};

const playlistArray = Array.from(playlistItems);

function updateBackgroundColor() {
  const colorThief = new ColorThief();
  albumCover.addEventListener('load', () => {
    const color = colorThief.getColor(albumCover);
    const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    document.body.style.backgroundColor = rgbColor;
  });
}

function updateMetadata(index) {
  const item = playlistArray[index];
 
  trackName.innerHTML = item.innerHTML; // Update the track name in the metadata
  artistName.innerHTML = item.dataset.artist;
  albumCover.src = item.dataset.cover;
  updateBackgroundColor(); 
}


function initPlayer(src) {
  if (player && typeof player.unload === 'function') {
    player.unload(); // Unload the current track from memory
  }
  player = new Howl({
    src: [src],
    html5: true,
    onloaderror: function () {
      console.log('Error: Audio file could not be loaded.');
    },
  });
}

initPlayer('audio/all.m4a');

const colorThief = new ColorThief();

const color = colorThief.getColor(albumCover);
const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

document.body.style.backgroundColor = rgbColor;
playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    initPlayer(trackUrls[index]); // Initialize the player with the new track URL
    player.play(); // Play the new track
    document.getElementById('play-pause')// Update the play/pause button text
    trackName.innerHTML = item.innerHTML; // Update the track name in the metadata
    artistName.innerHTML = item.dataset.artist;
    albumCover.src = item.dataset.cover;
  });
});

const playPauseBtn = document.getElementById('play-pause');

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const shuffleBtn = document.getElementById('shuffle');
const volumeSlider = document.getElementById('volume-slider');

playPauseBtn.addEventListener('click', () => {
  if (player.playing()) {
    player.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play text-gray-700 cursor-pointer"></i>';
  } else {
    player.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause text-gray-700 cursor-pointer"></i>';
  }
});



nextBtn.addEventListener('click', () => {
  currentTrack++;
  if (currentTrack >= trackUrls.length) currentTrack = 0;
  initPlayer(trackUrls[currentTrack]);
  player.play();
  updateMetadata(currentTrack);
});


prevBtn.addEventListener('click', () => {
  currentTrack--;
  if (currentTrack < 0) currentTrack = trackUrls.length - 1;
  initPlayer(trackUrls[currentTrack]);
  player.play();
  updateMetadata(currentTrack);
});

let currentTrack = 0;

volumeSlider.addEventListener('input', () => {
  player.volume(volumeSlider.value / 100);
});

