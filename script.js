console.log("Welcome to Spotify");

//Intialize the variables
let songIndex=0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem= Array.from(document.getElementsByClassName('songItem'));



let songs = [
    {songName:"Starboy",filePath:"1.mp3", coverPath:"cover1.jpg"},
    {songName:"I Feel It Coming",filePath:"2.mp3", coverPath:"cover2.jpg "},
    {songName:"The Hills",filePath:"3.mp3", coverPath:"cover3.jpg "},
    {songName:"Blinding Lights",filePath:"4.mp3", coverPath:"cover4.jpg"},
    {songName:"Save Your Tears",filePath:"5.mp3", coverPath:"cover5.jpg "},
    {songName:"Pray For Me",filePath:"6.mp3", coverPath:"cover6.jpg"},
    {songName:"Heartless",filePath:"7.mp3", coverPath:"cover7.jpg"},
]
// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');

    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        masterSongName.innerText=songs[songIndex].songName;
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
    })
})

document.getElementById('next').addEventListener('click',()=>{
   if(songIndex>6){
    songIndex=0;
   }
   else{
    songIndex+=1;
   }
   audioElement.src = `${songIndex+1}.mp3`;
   masterSongName.innerText=songs[songIndex].songName;
   audioElement.currentTime=0;
   audioElement.play();
   masterPlay.classList.remove('fa-circle-play')
   masterPlay.classList.add('fa-circle-pause')
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
     songIndex=7;
    }
    else{
     songIndex-=1;
    }
    audioElement.src = `${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
 })