"use strict";

/**
 * @class Structure capable of storing the state of a playlist entity
 * @constructs Playlist
 * @param {int} id - playlist id
 * @param {string} title - playlist title
 * @param {string} description - playlist description
 */
class Playlist {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.songs = [];
    this.nextSongId = 1;
  }
}
