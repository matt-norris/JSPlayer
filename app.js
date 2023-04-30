const trackUrls = [
  'audio/all.m4a',
  'audio/track2.mp3',
  'audio/track3.ogg'
];

const playlistItems = document.querySelectorAll('#playlist-tracks li');

playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    player.stop(); // Stop the current track
    player.unload(); // Unload the current track from memory
    player.src = trackUrls[index]; // Set the new track URL
    player.load(); // Load the new track into memory
    player.play(); // Play the new track
    playPauseButton.innerHTML = 'Pause'; // Update the play/pause button text
    trackName.innerHTML = item.innerHTML; // Update the track name in the metadata
  });
});

const player = new Howl({
    src: ['audio/all.m4a'],
    html5: true,
    onloaderror: function() {
      console.log('Error: Audio file could not be loaded.');
    }
  });
  
  if (!player) {
    console.log('Error: Audio player could not be initialized.');
  }
  
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
  