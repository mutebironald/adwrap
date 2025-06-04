import fs from 'fs';
import db from './db/index.js';

async function seed() {
  const workspaces = JSON.parse(fs.readFileSync('./mock-data/workspaces.json', 'utf-8'));
  const staticMediaItems = JSON.parse(fs.readFileSync('./mock-data/staticMediaItems.json', 'utf-8'));
  const streetpoles = JSON.parse(fs.readFileSync('./mock-data/streetpoles.json', 'utf-8'));

  try {
    await db.query('BEGIN');

    // Wipe tables
    await db.query('DELETE FROM routes');
    await db.query('DELETE FROM static_media_faces');
    await db.query('DELETE FROM media_items');
    await db.query('DELETE FROM workspaces');

    // Seed workspaces and track ID mapping
    const workspaceIdMap = new Map();
    for (const ws of workspaces) {
      const result = await db.query(
        'INSERT INTO workspaces (name, email, address, location) VALUES ($1, $2, $3, $4) RETURNING id',
        [ws.name, ws.email, ws.address, ws.location]
      );
      workspaceIdMap.set(ws.id, result.rows[0].id); // map old ID to new one
    }

    // Seed static media items and faces
    for (const media of staticMediaItems) {
      const workspaceId = workspaceIdMap.get(media.workspace);
      const result = await db.query(
        'INSERT INTO media_items (workspace_id, type, format, location, number_of_faces, closest_landmark, availability) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [workspaceId, media.type, media.format, media.location, media.numberOfFaces, media.closestLandmark, media.availability]
      );

      const mediaItemId = result.rows[0].id;

      for (const face of media.staticMediaFaces) {
        await db.query(
          'INSERT INTO static_media_faces (media_item_id, description, availability, images, rent) VALUES ($1, $2, $3, $4, $5)',
          [mediaItemId, face.description, face.availability, face.images, face.rent]
        );
      }
    }

    // Seed streetpoles and routes
    for (const sp of streetpoles) {
      const workspaceId = workspaceIdMap.get(sp.workspace);
      const result = await db.query(
        'INSERT INTO media_items (workspace_id, type, location, number_of_faces, closest_landmark, availability) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [workspaceId, sp.type, sp.location, sp.numberOfStreetPoles, sp.closestLandmark, sp.availability]
      );

      const mediaItemId = result.rows[0].id;

      for (const route of sp.routes) {
        await db.query(
          'INSERT INTO routes (media_item_id, side_route, description, number_of_street_poles, price_per_street_pole, images) VALUES ($1, $2, $3, $4, $5, $6)',
          [mediaItemId, route.sideRoute, route.description, route.numberOfStreetPoles, route.pricePerStreetPole, route.images]
        );
      }
    }

    await db.query('COMMIT');
    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    await db.query('ROLLBACK');
  } finally {
    db.end();
  }
}

seed();
