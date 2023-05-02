const trackUrls = [
  'audio/all.m4a',
  'audio/CheckYes.m4a',
  'audio/ImYours.m4a'
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

// Generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// Generate a random pastel color
function getRandomPastelColor() {
  const red = Math.floor(Math.random() * 128) + 127;
  const green = Math.floor(Math.random() * 128) + 127;
  const blue = Math.floor(Math.random() * 128) + 127;
  return `rgb(${red}, ${green}, ${blue})`;
}

// Change the gradient background to a random color
// Change the gradient background to a random pastel color
function changeBackground() {
  const body = document.getElementById('background');
  const color1 = getRandomPastelColor();
  const color2 = getRandomPastelColor();
  const color3 = getRandomPastelColor();
  body.style.background = `linear-gradient(to bottom right, ${color1}, ${color2},${color3} )`;
}

// Add event listeners to playlist items
const playlistTracksd = document.querySelectorAll('#playlist-tracks li');

playlistTracksd.forEach(track => {
  track.addEventListener('click', () => {
    changeBackground();
  });
});

