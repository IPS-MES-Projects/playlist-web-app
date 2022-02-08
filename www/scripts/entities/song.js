"use strict";

/**
 * @class Structure capable of storing the state of a music entity
 * @constructs Song
 * @param {int} id - song id
 * @param {string} name - song name
 * @param {string} artists - song artists
 */
class Song {
  constructor(id, name, artists) {
    this.id = id;
    this.name = name;
    this.artists = artists;
  }
}
