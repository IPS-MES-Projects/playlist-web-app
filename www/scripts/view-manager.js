"use strict";

/**
 * @class Manage all the application views
 * @constructs ViewManager
 * @property {object} templates - object to store all the templates
 */
class ViewManager {
  constructor() {
    // Attributes
    this.templates = {};
  }

  /**
   * Fetch application template files
   */
  async fetchTemplates() {
    const promises = [];

    promises.push(this.fetchTemplate("./templates/playlist-cards.mustache"));
    promises.push(this.fetchTemplate("./templates/song-items.mustache"));

    const templates = await Promise.all(promises);

    this.templates = {
      playlistCard: templates[0],
      songItem: templates[1],
    };
  }

  /**
   * Fetch the specified template file
   * @param {string} path Template file URI
   * @returns the template file content
   */
  async fetchTemplate(path) {
    try {
      const response = await fetch(path);
      const template = await response.text();
      return template;
    } catch (error) {
      console.error("Failed to fetch template: ", error);
    }
  }

  /**
   * Parse the HTML string into a document
   * @param {string} html The HTML string
   * @returns the document DOM
   */
  parseHTML(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content;
  }

  /**
   * Renders the specified template with the specified data
   * @param {string} template The template name
   * @param {object} data Data object to render the specified template
   * @returns the document DOM
   */
  renderTemplate(template, data) {
    // Render the template
    const html = Mustache.render(this.templates[template], data);

    // Parse the text
    var document = this.parseHTML(html);

    return document;
  }

  /**
   * Generate a random color string
   * @returns a random color string
   */
  randomColor() {
    const min = 0;
    const max = 4;

    const random = Math.floor(Math.random() * (max - min + 1) + min);

    switch (random) {
      case 0:
        return "blue";
      case 1:
        return "green";
      case 2:
        return "red";
      case 3:
        return "white";
      case 4:
        return "yellow";
    }
  }

  /**
   * Function that aims to update the DOM of the playlist list
   */
  async updatePlaylistsView(playlists) {
    // Retrieve playlists container
    const playlistsContainer = document.getElementById("playlists-container");

    // Remove all container child nodes
    while (playlistsContainer.hasChildNodes()) {
      playlistsContainer.removeChild(playlistsContainer.lastChild);
    }

    // Template data
    const data = {
      playlists: [],
    };

    // Add the playlists cards to the container
    playlists.forEach((playlist) => {
      const newPlaylist = {
        id: playlist.id,
        vinylColor: this.randomColor(),
        title: playlist.title,
      };
      data.playlists.push(newPlaylist);
    });

    // Render template
    const playlistCards = this.renderTemplate("playlistCard", data);
    playlistsContainer.appendChild(playlistCards);

    // Update playlists events
    window.dragAndDrop.updatePlaylistsEvents();
  }

  /**
   * Function that aims to show the DOM of the playlist details and update the respective data
   */
  async showPlaylistDetails(playlist) {
    // Retrieve required DOM elements
    const playlistTitleElement = document.getElementById("playlist-title");
    const playlistDescriptionElement = document.getElementById(
      "playlist-description"
    );
    const playlistActionsElement = document.getElementById("playlist-actions");
    const songsContainerElement = document.getElementById("songs-container");

    // Set playlist title, description and songs
    playlistTitleElement.textContent = playlist.title;
    playlistDescriptionElement.textContent = playlist.description;
    this.updateSongsDetails(playlist.songs);

    // Display hidden elements
    playlistActionsElement.classList.remove("invisible");
    songsContainerElement.classList.remove("d-none");
  }

  /**
   * Function that aims to hide the DOM of the playlist details
   */
  async hidePlaylistDetails() {
    // Retrieve required DOM elements
    const playlistTitleElement = document.getElementById("playlist-title");
    const playlistDescriptionElement = document.getElementById(
      "playlist-description"
    );
    const playlistActionsElement = document.getElementById("playlist-actions");
    const songsContainerElement = document.getElementById("songs-container");
    const songsListContainer = document.getElementById("songs-list-container");
    const vinylPlayerImage = document.getElementById("vinyl-player-image");

    // Set playlist title, description and songs
    playlistTitleElement.textContent = "Escolha uma Playlist";
    playlistDescriptionElement.textContent =
      "Selecione uma playlist da lista à esquerda e arraste-a para o gira discos.";

    // Display hidden elements
    playlistActionsElement.classList.add("invisible");
    songsContainerElement.classList.add("d-none");
    songsListContainer.classList.add("d-none");

    // Stop vinyl player animation
    vinylPlayerImage.src = "images/vinyl-player-stop.jpeg";
  }

  /**
   * Function that aims to update the DOM of the playlist songs details
   */
  updateSongsDetails(songs) {
    // Retrieve songs list container
    const songsListContainer = document.getElementById("songs-list-container");
    const songsListElement = document.getElementById("songs-list");

    // Remove all list items nodes
    while (songsListElement.hasChildNodes()) {
      songsListElement.removeChild(songsListElement.lastChild);
    }

    // Template data
    const data = {
      songs: [],
    };

    // Set playlist songs
    songs.forEach((song) => {
      const newSong = {
        name: song.name,
        artists: song.artists,
      };
      data.songs.push(newSong);
    });

    // Render template
    const songItems = this.renderTemplate("songItem", data);
    songsListElement.appendChild(songItems);

    // Display or hide songs list
    if (songs.length > 0) {
      songsListContainer.classList.remove("d-none");
    } else {
      songsListContainer.classList.add("d-none");
    }
  }
}
