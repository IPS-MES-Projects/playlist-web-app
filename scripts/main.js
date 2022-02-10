"use strict";

/**
 * Function that will be executed when the page is fully loaded, initializing required classes
 * @memberof window
 */
window.onload = async function () {
  // Initialize classes
  const dragAndDrop = new DragAndDrop();
  const webMessaging = new WebMessaging();
  const viewManager = new ViewManager();
  const storage = new Storage();

  // Export classes
  window.dragAndDrop = dragAndDrop;
  window.webMessaging = webMessaging;
  window.viewManager = viewManager;
  window.storage = storage;

  // Check if browser supports Storage feature
  if (typeof Storage === "undefined") {
    alert("HTML5 Storage is not support on your Browser!");
    return;
  }

  // Load data from local storage
  window.storage.loadFromStorage();

  // Initialize view manager and update playlists view with storage data
  await window.viewManager.fetchTemplates();
  window.viewManager.updatePlaylistsView(window.storage.Playlists);

  // Initialize web messaging
  window.webMessaging.setupEventListeners();

  // Setup event listeners
  const deletePlaylistConfirmButton = document.getElementById(
    "delete-playlist-confirm-button"
  );
  deletePlaylistConfirmButton.addEventListener("click", () => deletePlaylist());
};

/**
 * Handle playlist delete confirm event
 */
function deletePlaylist() {
  window.viewManager.hidePlaylistDetails();

  const playlistId = window.dragAndDrop.SelectedPlaylistId;
  window.storage.deletePlaylist(playlistId);

  const deletePlaylistCloseButton = document.getElementById(
    "delete-playlist-close-button"
  );
  deletePlaylistCloseButton.click();
}
