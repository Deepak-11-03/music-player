const music = document.getElementById("music"),
play = document.getElementById("play"),
next = document.getElementById("next"),
prev = document.getElementById("prev"),
title = document.getElementById("title"),
image = document.querySelector("#cover img"),
progress = document.querySelector(".progress"),
progressBar = document.querySelector(".progress-bar"),
moreSongs = document.querySelector(".more-song .fa-list-ul"),
closeList = document.querySelector("#close");

//

let isPlay = true;
const playMusic = () => {           // play music change icon
  isPlay = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
};

const stopMusic = () => {           // pause music change icon
  isPlay = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
};

play.addEventListener("click", () => {
  isPlay ? stopMusic() : playMusic(); //music play and pause
  playingNow();
});

// changing music---------------------------------

let songIndex = 1;

window.addEventListener("load", (songIndex) => {
  loadSong(songIndex);
  playingNow();
});

// load song data----------------------------------------
const loadSong = (indexNum) => {
  title.innerHTML = allSongs[indexNum -1].name;
  image.src = `images/image.jpg`;
  music.src = `music/${allSongs[indexNum -1].src}.mp3`;
};
loadSong(songIndex);

// ___________________next song _______________________

next.addEventListener("click", () => {
  songIndex++;
  songIndex > allSongs.length ? (songIndex = 1) : (songIndex = songIndex);
  loadSong(songIndex);
  playMusic();
  playingNow();
});
function nextSong(){
}

// ____________________prev song ________________________
prev.addEventListener("click", () => {
  songIndex--;
  songIndex < 1 ? (songIndex = allSongs.length) : (songIndex = songIndex);
  loadSong(songIndex);
  playMusic();
  playingNow();
});

// ________________Updating time of  every music on screen_______________________

music.addEventListener("timeupdate", (a) => {
  const currentTime = a.target.currentTime;
  const duration = a.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = document.querySelector(".current");
  let musicDuration = document.querySelector(".max");

  // __________________________update song time duration_____________________
  music.addEventListener("loadeddata", () => {
    let audioDuration = music.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);

    if (totalSec < 10) {
      // adding 0 if sec is less than 10
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin} :${totalSec}`; // for starting time
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  musicCurrentTime.innerText = `${currentMin}:${currentSec}`; // for song end time
  // console.log(musicCurrentTime.innerText)
  if(musicCurrentTime==musicDuration){
    songIndex++
  }


});

//_______________________On click to change the duration of music ________________________

progress.addEventListener("click", (e) => {
  let progressWidth = progress.clientWidth;
  let offSet = e.offsetX;
  let songDuration = music.duration;

  music.currentTime = (offSet / progressWidth) * songDuration;
  playMusic();
});

// _______________________songs list popup_____________________________

moreSongs.addEventListener("click", () => {
  let list = document.querySelector(".music-list");
  let morebtn = document.querySelector("#more");
  if (list.style.display == "none") {
    list.style.display = "block";
    morebtn.classList.replace("fa-list-ul", "fa-circle-xmark");
  } else {
    list.style.display = "none";
    morebtn.classList.replace("fa-circle-xmark", "fa-list-ul");
  }
});

// ________________________updating list of song______________________

const ul = document.querySelector("ul");

for (let i = 0; i < allSongs.length; i++) {
  let list = ` <li li-index='${i + 1}'>
                  <div class="row">
                    <h4>${allSongs[i].name}</h4>
                  </div>
                  <audio class="${allSongs[i].src}"  src="music/${allSongs[i].src}.mp3" ></audio>
                  <span id ="${allSongs[i].src}" class="audio-duration">3.00</span>
                </li>`;
  ul.insertAdjacentHTML("beforeend", list);

  let liAudioDuration = ul.querySelector(`#${allSongs[i].src}`);
  let liAudio = ul.querySelector(`.${allSongs[i].src}`);

  liAudio.addEventListener("loadeddata", () => {                      // updating song time in list
    let audioDuration = liAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);

    if (totalSec < 10) {                            // adding 0 if sec is less than 10
      totalSec = `0${totalSec}`;
    }
    liAudioDuration.innerText = `${totalMin} :${totalSec}`;
    liAudioDuration.setAttribute("duration", `${totalMin} :${totalSec}`);
  });
}

//____________________adding  onclick attribute in all li to play song ________________________
const allLi = ul.querySelectorAll("li");

function playingNow() {
  for (let j = 0; j < allLi.length; j++) {
    let audioTag = allLi[j].querySelector(".audio-duration");
    if (allLi[j].classList.contains("playing")) {
      allLi[j].classList.remove("playing");
      let duration = audioTag.getAttribute("duration");
      audioTag.innerText = duration;
    }

    if (allLi[j].getAttribute("li-index") == songIndex) {
      allLi[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    allLi[j].setAttribute("onclick", "clicked(this)");
  }
}
playingNow();

//____________________________play song on click_________________________

function clicked(element) {
  let getIndex = element.getAttribute("li-index");
  songIndex = getIndex;
  loadSong(songIndex);
  playMusic();
  playingNow();
}
