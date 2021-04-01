let play = document.getElementById('play-pause'); //get element with id="play-pause" to change fontawesome icons
let song = document.querySelector("audio");
let img = document.getElementById("song-img"); //to add anime class select this image

play.addEventListener('click', playPause);

function playPause() {
    console.log("main-button-clicked");
    if (song.paused) //for playing sound
    {
        song.play();
        play.classList.replace('fa-play', 'fa-pause');

        //animation class to rotate song img
        img.classList.add("anime");
    } else //for pausing sound
    {
        song.pause();
        play.classList.replace('fa-pause', 'fa-play');
        img.classList.remove("anime");

    }
}

//to change title, artist & song. prev & next button function
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let songs = [{
        name: "popsicle", //this name must hold a value as of audio files name i.e name.value == songsName
        pic: "head",
        title: "popsicle",
        artist: "pop"
    },
    {
        name: "ignite",
        pic: "alan",
        title: "Ignite",
        artist: "Alan Walker & K-391"
    },
    {
        name: "alone",
        pic: "marsh",
        title: "alone",
        artist: "marshmellow"
    },
    {
        name: "elek",
        pic: "ncs4",
        title: "electronomia",
        artist: "sky high"
    },
    {
        name: "on&on",
        pic: "on&on",
        title: "On & On",
        artist: "cartoon"
    }
]

function changeSong(songs) {
    title.textContent = songs.title;
    artist.textContent = songs.artist;

    song.src = "music/" + songs.name + ".mp3";
    img.src = "images/" + songs.pic + ".jpeg";
}

let songIndex = 0;
// changeSong(songs[songIndex]);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

function nextSong() {

    songIndex = (songIndex + 1) % songs.length; //list will repeat
    //suppose current songIndex is 2, let songs length be 3
    // songIndex = (2+1) % 3 = 3%3 = 0;
    changeSong(songs[songIndex]);
    playPause();
}

function prevSong() {


    songIndex = (songIndex - 1 + songs.length) % songs.length;
    //suppose current songIndex is 2, let songs length be 3
    // songIndex = (2-1) % 3 = 1%3 = 1;
    changeSong(songs[songIndex]);
    playPause();
}


// mute/unmute audio js
var mute = document.getElementById("mute");
mute.addEventListener("click", muteUnmute);

function muteUnmute() {
    if (song.muted) {
        song.muted = false;
        mute.classList.replace("fa-volume-mute", "fa-volume-up");
    } else {
        song.muted = true;
        mute.classList.replace("fa-volume-up", "fa-volume-mute");
    }
}

//song shuffle js
var shuffle = document.getElementById("shuffle");
shuffle.addEventListener("click", random);

function random() {
    var randomSongIndex = Math.floor(Math.random() * (songs.length));
    songIndex = randomSongIndex;
    console.log(songIndex);

    changeSong(songs[songIndex]);
    playPause();
}

//volume up/down js
let volumeslider = document.getElementById("volumeSlider");
volumeslider.addEventListener("mousemove", setVolume);

function setVolume() {
    song.volume = volumeslider.value / 100;
    console.log(song.volume);
}

//progress bar js
//timeupdate event is fired when the time indicated by the currentTime
//attribute has been updated

let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current-time");
let progress_div = document.getElementById("progress-div");

song.addEventListener("timeupdate", (e) => {
    // console.log(e); //check this in console for currentTime & duration.
    const { currentTime, duration } = e.srcElement;

    //to change progress bars width as song goes on we'll calculate percentge:
    //duration of song = 3min = 180sec
    //currentTime of song = 10sec
    // width = (10/180) * 100 = 0.055 * 100 = 5.5% of width
    //formula = (currentTime/duration) * 100 = width of songs progress
    //so we will change .progress class width dynamiclly

    // console.log("Current time: "+currentTime);
    // console.log("duration: "+duration);

    let progress_time = (currentTime / duration) * 100;
    // console.log("progress time: "+progress_time);

    progress.style.width = progress_time + "%";

    //song duration update
    //180sec/60 = 3min
    // sec = 180 % 60 = 0 seconds

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    // console.log(min_duration);
    // console.log(sec_duration);
    // console.log(min_duration+":"+sec_duration);

    if (duration) //to deal with nan:nan. don show total duration until its not ready
    {
        total_duration.textContent = min_duration + ":" + sec_duration;
    }


    //current song duration update(same as song duration update jst we have to consider current_time)//
    //180sec/60 = 3min
    // sec = 180 % 60 = 0 seconds

    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    // console.log(min_currentTime);
    // console.log(sec_currentTime);
    // console.log(min_currentTime+":"+sec_currentTime);
    if (sec_currentTime < 10) {
        sec_currentTime = "0" + sec_currentTime; //if sec_currentTIme is less than 10 then add a 0 infront of it: 9=>09
    }
    if (currentTime) //to deal with nan:nan. don show total currentTime until its not ready
    {
        current_time.textContent = min_currentTime + ":" + sec_currentTime;
    }

    //progress bar on click function
    progress_div.addEventListener("click", (event) => {

        //srcElement ->clientwidth(total width of our progress bar)
        //offsetX = width upto where we clicked
        // console.log(event);


        // const {duration} = song;
        const duration = song.duration;
        let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration; //we get here % if we do not multiply with duration
        // console.log(move_progress);

        song.currentTime = move_progress; //byt passing move_progress in currenTIme we got time in seconds
    });


    //if song is ended then automatically play next song
    song.addEventListener("ended", nextSong);
});