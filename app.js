const trackUrls = [
  'audio/all.m4a',
  'audio/CheckYes.m4a',
  'audio/ImYours.m4a',

];

const songLyrics = {
  'carousel-item-1': `Check yes Juliet
  Are you with me?
  Rain is falling down on the sidewalk
  I won't go until you come outside
  Check yes Juliet
  Kill the limbo
  I'll keep tossing rocks at your window
  There's no turning back for us tonight
  Lace up your shoes
  Eh oh eh oh
  Here's how we do
  Run, baby, run
  Don't ever look back
  They'll tear us apart
  If you give them the chance
  Don't sell your heart
  Don't say we're not meant to be
  Run, baby, run
  Forever we'll be
  You and me
  Check yes Juliet
  I'll be waiting
  Wishing, wanting
  Yours for the taking
  Just sneak out
  And don't tell a soul goodbye
  Check yes Juliet
  Here's the countdown
  Three, two, one, now fall in my arms
  Now they can change the locks
  Don't let them change your mind
  Lace up your shoes
  Eh oh eh oh
  Here's how we do
  Run, baby, run
  Don't ever look back
  They'll tear us apart
  If you give them the chance
  Don't sell your heart
  Don't say we're not meant to be
  Run, baby, run
  Forever we'll be
  You and me
  We're flying through the night
  We're flying through the night
  Way up high,
  The view from here is getting better with
  You by my side
  Run, baby, run
  Don't ever look back
  They'll tear us apart
  If you give them the chance
  Don't sell your heart
  Don't say we're not meant to be
  Run, baby, run
  Forever we'll be
  You and me
  Run, baby, run
  Don't ever look back.
  They'll tear us apart
  If you give them the chance.
  Don't sell your heart.
  Don't say we're not meant to be.
  Run, baby, run.
  Forever we'll be
  You and me.
  You and me
  You and me`,
  'carousel-item-2': `Lyrics for song 2...`,
  'carousel-item-3': `Lyrics for song 3...`,
  'carousel-item-4': `Lyrics for song 4...`,
  'carousel-item-5': `Lyrics for song 5...`,
};

const carouselItems = document.querySelectorAll('.carousel-item');
const trackName = document.querySelector('.player-info h2');
const artistName = document.querySelector('.player-info h3');
const albumCover = document.querySelector('.album-cover img');
let player = {};

function updateLyrics(songId) {
  const lyricsContainer = document.getElementById('song-lyrics');
  const lyricsContent = document.createElement('div');
  lyricsContent.innerHTML = songLyrics[songId].split('\n').map(line => `<p>${line}</p>`).join('');
  lyricsContainer.innerHTML = '';
  lyricsContainer.appendChild(lyricsContent);
}


updateLyrics('carousel-item-1');

  function updateBackgroundColor() {
      const colorThief = new ColorThief();
      albumCover.addEventListener('load', () => {
      const color = colorThief.getColor(albumCover);
      const secondaryColor = colorThief.getPalette(albumCover, 2)[1];
    
      // Use the colors for styling
      const mainColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      const secondaryRgbColor = `rgb(${secondaryColor[0]}, ${secondaryColor[1]}, ${secondaryColor[2]})`;
    
      // Set the background color
      document.body.style.background = `linear-gradient(90deg, ${mainColor}, ${secondaryRgbColor})`;
      document.body.style.backgroundSize = "200% auto";
      document.body.style.animation = "gradient linear infinite";

        // Create color scale
    const colorScale = [];
    const steps = 10;
    for (let i = 0; i < steps; i++) {
      const r = color[0] + i * (secondaryColor[0] - color[0]) / steps;
      const g = color[1] + i * (secondaryColor[1] - color[1]) / steps;
      const b = color[2] + i * (secondaryColor[2] - color[2]) / steps;
      colorScale.push([r, g, b]);
    }

      
    });
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



const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
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



volumeSlider.addEventListener('input', () => {
  player.volume(volumeSlider.value / 100);
});

const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const playerInfo = document.querySelector('.player-info');
let activeIndex = 0;

function updateMetadata() {
  const activeItem = carouselItems[activeIndex];
  const title = activeItem.querySelector('h2').innerText;
  const artist = activeItem.querySelector('h3').innerText;
  const source = activeItem.querySelector('h4').innerText;
  const cover = activeItem.querySelector('img').src;

  playerInfo.innerHTML = `
    <h2 class="text-xl font-semibold mb-1">${title}</h2>
    <h3 class="text-md text-gray-700 mb-1">${artist}</h3>
    <h4 class="text-sm text-gray-500">${source}</h4>
  `;
  document.querySelector('.album-cover img').src = cover;
  updateBackgroundColor();
}

function changeCarouselItem(offset){
carouselItems[activeIndex].classList.remove('active');
activeIndex = (activeIndex + offset + carouselItems.length) % carouselItems.length;
carouselItems[activeIndex].classList.add('active');
updateMetadata();
}

prevButton.addEventListener('click', () => {
changeCarouselItem(-1);
updateTrack();
});

nextButton.addEventListener('click', () => {
changeCarouselItem(1);
updateTrack();
});

// Initialize with the first item's metadata
updateMetadata();

// Update the play/pause button and track when the carousel changes





const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

player.on('play', () => {
  scrollLyrics(player, currentSongId);
  console.log('rendame');
  const source = audioCtx.createMediaElementSource(player._sounds[0]._node);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  
  const canvas = document.getElementById('audio-visualizer');
  const canvasCtx = canvas.getContext('2d');
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const barWidth = (WIDTH / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    
    x = 0;
    analyser.getByteFrequencyData(dataArray);
    
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      
      const colorScale = [      [255, 0, 0], // red
        [255, 255, 0], // yellow
        [0, 255, 0], // green
        [0, 0, 255], // blue
        [255, 0, 255], // magenta
      ];
      
      const colorIndex = Math.floor((barHeight / 255) * colorScale.length);
      const color = `rgb(${colorScale[colorIndex][0]}, ${colorScale[colorIndex][1]}, ${colorScale[colorIndex][2]})`;
      
      canvasCtx.fillStyle = color;
      canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
      
      x += barWidth + 1;
    }
  }

  renderFrame();
});


const songProgress = {
  'carousel-item-1': [0, 5, 10, 15], // Add the timestamps for each line of the lyrics
  'carousel-item-2': [0, 5, 10, 15],
  'carousel-item-3': [0, 5, 10, 15],
  'carousel-item-4': [0, 5, 10, 15],
  'carousel-item-5': [0, 5, 10, 15],
};

let currentSongId = 'carousel-item-1';
let currentLine = 0;

function updateTrack() {
  initPlayer(trackUrls[activeIndex]);
  player.once('load', function () {
    player.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause text-gray-700 cursor-pointer"></i>';
    currentSongId = 'carousel-item-' + (activeIndex + 1); // Update the currentSongId based on the activeIndex
    updateLyrics(currentSongId); // Update the lyrics for the new song
    scrollLyrics(player, currentSongId);
  });
}




// ...

function scrollLyrics(currentSong, currentSongId) {
  const lyricsContainer = document.getElementById('song-lyrics');
  const duration = currentSong.duration();
  const interval = setInterval(() => {
    console.log("reaching")
    const currentTime = currentSong.seek();
    if (currentTime >= songProgress[currentSongId][currentLine]) {
      lyricsContainer.children[currentLine].scrollIntoView({ behavior: 'smooth' });
      currentLine++;
    }
    if (currentTime >= duration) {
      clearInterval(interval);
      currentLine = 0;
    }
  }, 1000);
}


