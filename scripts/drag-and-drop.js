let playlistsElements = document.querySelectorAll("#playlists-container div");
let recordPlayerElement = document.getElementById("drop");
let selectedPlaylist;

playlistsElements.forEach(elem =>{
    elem.addEventListener('dragstart', dragStart);
});
recordPlayerElement.addEventListener("dragover", dragOver);
recordPlayerElement.addEventListener("dragleave", dragLeave);
recordPlayerElement.addEventListener("drop", drop);

function dragStart(event){
    selectedPlaylist = this.id;
    // console.log(selectedPlaylist);
}



// Alternate between playing record or not
//todo bug when already playing going over and out will remove playing in image
function dragOver(event) {
    event.preventDefault();
    let imageElement = document.getElementById("vinyl-player");
    imageElement.src = "images/vinyl-player-start.gif";
}
function dragLeave(event) {
    let imageElement = document.getElementById("vinyl-player");
    imageElement.src = "images/vinyl-player-stop.jpeg";
}



//todo change playlist title, description and musics, show musics and buttons
// need to get playlist title, edit and delete button, playlist description, music card
function drop(event) {
    let playlistTitleElement = document.getElementById("playlist-title");
    let playlistButtonsElement = document.getElementById("playlist-buttons");
    let playlistDescriptionElement = document.getElementById("playlist-description");
    let songsContainertElement = document.getElementById("songs-container");
    let songsListElement = document.getElementById('songs-list');

    playlistButtonsElement.classList.remove('d-none');
    songsContainertElement.classList.remove('d-none');

    playlistTitleElement.textContent = "To be replaced";
    playlistDescriptionElement.textContent = "To be replaced with values from the playlist object saved in LocalStorage";

    // loadMusicList(songsListElement);
}


// // todo function to load music list still needs localStorage
// function loadMusicList(songsListElement){
//     let musicList = localStorage.getItem("musicList");

//     musicList.forEach(music =>{
//         let displayListItem = document.createElement('li');
//         displayListItem.textContent = music;
//         songsListElement.append(displayListItem);
//     });
// }

// function selectPlaylist(){
//     playlistsElements.forEach(elem => {
//         elem.addEventListener("dragstart", dragStart);
//     });
// }
