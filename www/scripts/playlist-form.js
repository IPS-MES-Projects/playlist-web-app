"use strict";

/**
 * Function that will be executed when the page is fully loaded, initializing required classes
 * @memberof window
 */
window.onload = function () {
  window.addEventListener("message", (event) => onMessage(event));

  const cancelButton = document.getElementById("cancel-button");
  const submitButton = document.getElementById("submit-button");

  cancelButton.addEventListener("click", (event) => closeWindow(event));
  submitButton.addEventListener("click", (event) => submitData(event));
};

function onMessage(event) {
  if (event.origin !== window.location.origin) return;

  const data = event.data;

  switch (data.event) {
    case "editPlaylist":
      editPlaylist(data.playlist);
      break;
  }
}

function editPlaylist(playlist) {
  document.getElementById("id").value = playlist.id;
  document.getElementById("title").value = playlist.title;
  document.getElementById("description").value = playlist.description;

  document.getElementById("header-title").innerHTML = "Editar Playlist";
  document.getElementById("submit-button").innerHTML = "Editar";
}

function closeWindow(event) {
  event.preventDefault();

  window.close();
}

function submitData(event) {
  event.preventDefault();

  const form = document.getElementById("new-playlist-form");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const id = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const newPlaylist = id.length === 0;

  const data = {
    title: title,
    description: description,
  };
  if (newPlaylist) {
    data.event = "newPlaylist";
  } else {
    data.event = "editPlaylist";
    data.id = parseInt(id);
  }

  window.opener.postMessage(data, window.location.origin);

  window.close();
}
