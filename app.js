const trackUrls = [
  'audio/all.m4a',
  'audio/pokemon.mp3',

];

const playlistItems = document.querySelectorAll('#playlist-tracks li');

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
    playPauseButton.innerHTML = 'Pause'; // Update the play/pause button text
    trackName.innerHTML = item.innerHTML; // Update the track name in the metadata
  });
});

const playPauseButton = document.getElementById('play-pause-button');
const skipButton = document.getElementById('skip-button');
const volumeSlider = document.getElementById('volume-slider');
const artworkImg = document.querySelector('#artwork img');
const trackName = document.getElementById('track-name');
const artistName = document.getElementById('artist-name');
const albumName = document.getElementById('album-name');
const playlistTracks = document.getElementById('playlist-tracks');

playPauseButton.addEventListener('click', () => {
  if (player.playing()) {
    player.pause();
    playPauseButton.innerHTML = 'Play';
  } else {
    player.play();
    playPauseButton.innerHTML = 'Pause';
  }
});

skipButton.addEventListener('click', () => {
  player.skip();
});

volumeSlider.addEventListener('input', () => {
  player.volume(volumeSlider.value / 100);
});
