"use strict";

/**
 * @class Saves all the information needed to run the application
 * @constructs Storage
 * @property {Playlist[]} playlists - array of objects of type Playlist, to store all the playlists in our system
 */
class Storage {
  constructor() {
    // Attributes
    this.playlists = [];
  }

  // Getters
  get Playlists() {
    return this.playlists;
  }

  /**
   * Loads data from local storage and update local data structures
   */
  loadFromStorage() {
    const playlists = localStorage.getItem("playlists");
    if (!playlists) return;

    this.playlists = JSON.parse(playlists);
  }

  /**
   * Retrieve next playlist id and increase de counter
   * @returns the next playlist id
   */
  retrieveNextPlaylistId() {
    let nextPlaylistId = 1;
    if (localStorage.hasOwnProperty("nextPlaylistId")) {
      nextPlaylistId = parseInt(localStorage.getItem("nextPlaylistId"));
    }
    localStorage.setItem("nextPlaylistId", nextPlaylistId + 1);
    return nextPlaylistId;
  }

  /**
   * Function that aims to get a Playlist feature
   * @param {string} id The id of the playlist
   * @returns the playlist object
   */
  getPlaylist(id) {
    // Checks if the playlist with the passed id exists
    const playlist = this.playlists.find((playlist) => playlist.id === id);
    if (!playlist) {
      alert("A lista de reprodução selecionada não pôde ser encontrada!");
    }

    return playlist;
  }

  /**
   * Function that aims to add a Playlist feature
   * @param {string} title The title of the new playlist
   * @param {string} description The description of the new playlist
   */
  addPlaylist(title, description) {
    // Get next available id for the playlist
    const id = this.retrieveNextPlaylistId();

    // Create playlist and add to array
    const playlist = new Playlist(id, title, description);
    this.playlists.push(playlist);

    // Updates the DOM of the playlists
    window.viewManager.updatePlaylistsView(this.playlists);

    // Update local storage
    localStorage.setItem("playlists", JSON.stringify(this.playlists));
  }

  /**
   * Function that aims to update a Playlist resource
   */
  updatePlaylist(id, title, description) {
    // Checks if the playlist with the passed id exists
    const playlist = this.playlists.find((playlist) => playlist.id === id);
    if (!playlist) {
      alert("A lista de reprodução selecionada não pôde ser encontrada!");
    }

    // Updates playlist attributes
    playlist.title = title;
    playlist.description = description;

    // Updates the DOM of the playlists
    window.viewManager.updatePlaylistsView(this.playlists);

    // Updates the DOM of the playlist details if the playlist is the selected one
    if (window.dragAndDrop.SelectedPlaylistId === id) {
      window.viewManager.showPlaylistDetails(playlist);
    }

    // Update local storage
    localStorage.setItem("playlists", JSON.stringify(this.playlists));
  }

  /**
   * Function that aims to remove a Playlist resource
   */
  deletePlaylist(id) {
    // Checks if the playlist with the passed id exists
    const index = this.playlists.findIndex((playlist) => playlist.id === id);
    if (index === -1) {
      alert("A lista de reprodução selecionada não pôde ser encontrada!");
    }

    // Remove a playlist da array
    this.playlists.splice(index, 1);

    // Updates the DOM of the playlists
    window.viewManager.updatePlaylistsView(this.playlists);

    // Update local storage
    localStorage.setItem("playlists", JSON.stringify(this.playlists));
  }

  /**
   * Function that aims to update Song features of the specified playlist
   */
  updatePlaylistSongs(playlistId, songs) {
    // Checks if the playlist with the passed id exists
    const playlist = this.playlists.find(
      (playlist) => playlist.id === playlistId
    );
    if (!playlist) {
      alert("A lista de reprodução selecionada não pôde ser encontrada!");
    }

    // Updates playlist attributes
    playlist.songs = songs;

    // Updates the DOM of the playlist details if the playlist is the selected one
    if (window.dragAndDrop.SelectedPlaylistId === playlistId) {
      window.viewManager.showPlaylistDetails(playlist);
    }

    // Update local storage
    localStorage.setItem("playlists", JSON.stringify(this.playlists));
  }
}
