const trackUrls = [
  'audio/all.m4a',
  'audio/CheckYes.m4a',
  'audio/ImYours.m4a'
];

const playlistItems = document.querySelectorAll('.list-group-item');
const trackName = document.querySelector('.player-info h2');
const artistName = document.querySelector('.player-info h3');
let player = {};

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

playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    initPlayer(trackUrls[index]); // Initialize the player with the new track URL
    player.play(); // Play the new track
    document.getElementById('play-pause')// Update the play/pause button text
    trackName.innerHTML = item.innerHTML; // Update the track name in the metadata
    artistName.innerHTML = item.dataset.artist;
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

let currentTrack = 0;

nextBtn.addEventListener('click', () => {
  currentTrack++;
  if (currentTrack >= trackUrls.length) currentTrack = 0;
  initPlayer(trackUrls[currentTrack]);
  player.play();
});

prevBtn.addEventListener('click', () => {
  currentTrack--;
  if (currentTrack < 0) currentTrack = trackUrls.length - 1;
  initPlayer(trackUrls[currentTrack]);
  player.play();
});

shuffleBtn.addEventListener('click', () => {
  currentTrack = Math.floor(Math.random() * trackUrls.length);
  initPlayer(trackUrls[currentTrack]);
  player.play();
});

volumeSlider.addEventListener('input', () => {
  player.volume(volumeSlider.value / 100);
});

feather.replace();