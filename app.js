const trackUrls = [
  'audio/all.m4a',
  'audio/CheckYes.m4a',
  'audio/ImYours.m4a'
];

const carouselItems = document.querySelectorAll('.carousel-item');
const trackName = document.querySelector('.player-info h2');
const artistName = document.querySelector('.player-info h3');
const albumCover = document.querySelector('.album-cover img');
let player = {};


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
function updateTrack() {
initPlayer(trackUrls[activeIndex]);
player.play();
playPauseBtn.innerHTML = '<i class="fas fa-pause text-gray-700 cursor-pointer"></i>';
}


