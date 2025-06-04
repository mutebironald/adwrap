'use strict';

exports.up = function (db, callback) {
  db.runSql(
    `
    CREATE TABLE workspaces (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      address VARCHAR(255),
      location VARCHAR(255)
    );

    CREATE TABLE media_items (
      id SERIAL PRIMARY KEY,
      workspace_id INTEGER REFERENCES workspaces(id),
      type VARCHAR(50),
      format VARCHAR(50),
      location VARCHAR(255),
      number_of_faces INTEGER,
      closest_landmark VARCHAR(255),
      availability VARCHAR(50)
    );

    CREATE TABLE static_media_faces (
      id SERIAL PRIMARY KEY,
      media_item_id INTEGER REFERENCES media_items(id),
      description TEXT,
      availability VARCHAR(50),
      images TEXT[],
      rent INTEGER
    );

    CREATE TABLE routes (
      id SERIAL PRIMARY KEY,
      media_item_id INTEGER REFERENCES media_items(id),
      side_route VARCHAR(50),
      description TEXT,
      number_of_street_poles INTEGER,
      price_per_street_pole INTEGER,
      images TEXT[]
    );
    `,
    callback
  );
};

exports.down = function (db, callback) {
  db.runSql(
    `
    DROP TABLE IF EXISTS routes;
    DROP TABLE IF EXISTS static_media_faces;
    DROP TABLE IF EXISTS media_items;
    DROP TABLE IF EXISTS workspaces;
    `,
    callback
  );
};
