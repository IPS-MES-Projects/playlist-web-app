"use strict";
"use strict";

/**
 * @class Manages application web messaging and form child windows
 * @constructs WebMessaging
 */
class WebMessaging {
  constructor() {
    // Attributes
    this.childWindows = new Array();
  }

  setupEventListeners() {
    window.addEventListener("message", (event) => this.onMessage(event));

    const newPlaylistButton = document.getElementById("add-playlist-button");
    newPlaylistButton.addEventListener("click", () => this.newPlaylistButton());

    const editPlaylistButton = document.getElementById("edit-playlist-button");
    editPlaylistButton.addEventListener("click", () =>
      this.editPlaylistButton()
    );

    const editSongsButton = document.getElementById("edit-songs-button");
    editSongsButton.addEventListener("click", () => this.editSongsButton());
  }

  onMessage(event) {
    if (event.origin !== window.location.origin) return;

    const data = event.data;

    switch (data.event) {
      case "newPlaylist":
        window.storage.addPlaylist(data.title, data.description);
        break;
      case "editPlaylist":
        window.storage.updatePlaylist(data.id, data.title, data.description);
        break;
      case "editSongs":
        window.storage.updatePlaylistSongs(data.playlistId, data.songs);
        break;
    }
  }

  newWindow(url, width, height) {
    const topEdge = window.screenY;
    const rhsEdge = window.screenX;

    const childWindow = window.open(
      url,
      "",
      "width=" + width + ", height=" + height + ", top=0, left=0"
    );

    this.childWindows.push(childWindow);

    return childWindow;
  }

  broadcast(data) {
    for (let i = 0; i < this.childWindows.length; i++) {
      this.childWindows[i].postMessage(data, window.location.origin);
    }
  }

  newPlaylistButton() {
    this.newWindow("./playlist-form.html", 600, 500);
  }

  editPlaylistButton() {
    const newWindow = this.newWindow("./playlist-form.html", 600, 500);

    newWindow.addEventListener("load", () => {
      const playlistId = window.dragAndDrop.SelectedPlaylistId;
      const playlist = window.storage.getPlaylist(playlistId);
      const data = {
        event: "editPlaylist",
        playlist: playlist,
      };
      this.broadcast(data);
    });
  }

  editSongsButton() {
    const newWindow = this.newWindow(
      "./songs-form.html",
      screen.availWidth,
      screen.availHeight
    );

    newWindow.addEventListener("load", () => {
      const playlistId = window.dragAndDrop.SelectedPlaylistId;
      const songs = window.storage.getPlaylist(playlistId).songs;
      const data = {
        event: "editSongs",
        playlistId: playlistId,
        songs: songs,
      };
      this.broadcast(data);
    });
  }
}
