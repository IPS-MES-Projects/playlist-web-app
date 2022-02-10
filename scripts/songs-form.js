"use strict";

let editingPlaylistId = null;
let songs = null;

/**
 * Function that will be executed when the page is fully loaded, initializing required classes
 * @memberof window
 */
window.onload = function () {
  window.addEventListener("message", (event) => onMessage(event));

  const saveButton = document.getElementById("save-button");
  const cancelButton = document.getElementById("cancel-button");
  const addSongButton = document.getElementById("add-song-button");

  saveButton.addEventListener("click", (event) => saveChanges(event));
  cancelButton.addEventListener("click", (event) => closeWindow(event));
  addSongButton.addEventListener("click", (event) => addSong(event));
};

function onMessage(event) {
  if (event.origin !== window.location.origin) return;

  const data = event.data;

  switch (data.event) {
    case "editSongs":
      editingPlaylistId = data.playlistId;
      songs = data.songs;
      renderSongs();
      break;
  }
}

async function fetchTemplate(path) {
  try {
    const response = await fetch(path);
    const template = await response.text();
    return template;
  } catch (error) {
    console.error("Failed to fetch template: ", error);
  }
}

function parseHTML(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
}

function renderTemplate(template, data) {
  // Render the template
  const html = Mustache.render(template, data);

  // Parse the text
  var document = parseHTML(html);

  return document;
}

async function renderSongs() {
  const songsTableBody = document.getElementById("songs-table-body");

  // Remove all list items nodes
  while (songsTableBody.hasChildNodes()) {
    songsTableBody.removeChild(songsTableBody.lastChild);
  }

  const data = {
    songs: [],
  };

  songs.forEach((song, index) => {
    const newSong = {
      index: index,
      name: song.name,
      artists: song.artists,
    };
    data.songs.push(newSong);
  });

  const template = await fetchTemplate("./templates/song-rows.mustache");
  const songsRows = renderTemplate(template, data);
  songsTableBody.appendChild(songsRows);
}

function closeWindow(event) {
  event.preventDefault();

  window.close();
}

function saveChanges(event) {
  event.preventDefault();

  const data = {
    event: "editSongs",
    playlistId: editingPlaylistId,
    songs: songs,
  };
  console.dir(data);
  window.opener.postMessage(data, window.location.origin);

  window.close();
}

function addSong(event) {
  event.preventDefault();

  const form = document.getElementById("add-song-form");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const name = document.getElementById("name").value;
  const artists = document.getElementById("artists").value;

  const song = new Song(name, artists);
  songs.push(song);

  form.reset();

  renderSongs();
}

function removeSong(index) {
  songs.splice(index, 1);

  renderSongs();
}
