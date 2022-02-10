"use strict";

/**
 * @class Vinyl disk drag and drop feature
 * @constructs DragAndDrop
 * @property {object} selectedPlaylistId - selected playlist element id
 */
class DragAndDrop {
  constructor() {
    // Attributes
    this.selectedPlaylistId = null;

    this.setupEventListeners();
  }

  // Getters
  get SelectedPlaylistId() {
    // Converts id to number
    return this.selectedPlaylistId ? parseInt(this.selectedPlaylistId) : null;
  }

  setupEventListeners() {
    const vinylPlayerElement = document.getElementById("vinyl-player");

    // Add event listeners
    vinylPlayerElement.addEventListener("dragover", (event) =>
      this.dragOver(event)
    );
    vinylPlayerElement.addEventListener("dragleave", (event) =>
      this.dragLeave(event)
    );
    vinylPlayerElement.addEventListener("drop", (event) => this.drop(event));
  }

  updatePlaylistsEvents() {
    const playlistsNodes = document.querySelectorAll(
      "#playlists-container div"
    );

    playlistsNodes.forEach((node) => {
      node.addEventListener("dragstart", this.dragStart);
      node.addEventListener("keyup", (event) => this.enterPress(event));
    });
  }

  dragStart(event) {
    // Set playlist element id on the event data transfer object
    event.dataTransfer.setData("text", event.target.id);
  }

  dragOver(event) {
    // Allow drop
    event.preventDefault();

    // Set vinyl player as playing
    const vinylPlayerImage = document.getElementById("vinyl-player-image");
    vinylPlayerImage.src = "images/vinyl-player-start.gif";
  }

  dragLeave() {
    // If playlist selected keep animation
    if (this.selectedPlaylistId) return;

    // Stop vinyl player animation
    const vinylPlayerImage = document.getElementById("vinyl-player-image");
    vinylPlayerImage.src = "images/vinyl-player-stop.jpeg";
  }

  drop(event) {
    event.preventDefault();

    // Retrieve playlist element id
    const playlistElementId = event.dataTransfer.getData("text");

    // Set playlist
    this.setPlaylist(playlistElementId);
  }

  enterPress(event) {
    // Check if pressed the key is Return
    if (event.keyCode !== 13) return;

    // Set vinyl player as playing
    const vinylPlayerImage = document.getElementById("vinyl-player-image");
    vinylPlayerImage.src = "images/vinyl-player-start.gif";

    // Set playlist
    this.setPlaylist(event.target.id);
  }

  setPlaylist(playlistElementId) {
    // Set the selected playlist list id attribute
    this.selectedPlaylistId = playlistElementId.split("playlist_")[1];

    // Retrieve playlist data
    const playlist = window.storage.getPlaylist(this.SelectedPlaylistId);

    // Show dropped playlist details
    window.viewManager.showPlaylistDetails(playlist);
  }
}
