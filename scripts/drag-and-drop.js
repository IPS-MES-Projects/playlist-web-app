let playlistsElements = document.querySelectorAll("#playlists-container div");
let recordPlayerElement = document.getElementById("drop");

recordPlayerElement.addEventListener("dragover", dragOver);
recordPlayerElement.addEventListener("dragleave", dragLeave);
recordPlayerElement.addEventListener("drop", drop);

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
}

// function selectPlaylist(){
//     playlistsElements.forEach(elem => {
//         elem.addEventListener("dragstart", dragStart);
//     });
// }
