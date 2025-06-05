import db from "../db/index.js";
import { generateMediaId } from "../utils/idGenerator.js";

export async function createMediaItemService(data) {
  const {
    workspaceId,
    type,
    faces,
    routes,
    format,
    location,
    number_of_faces,
    closest_landmark,
    availability,
  } = data;

  const mediaId = await generateMediaId(workspaceId, type);

  const client = await db.connect();
  try {
    // 🛡️ Check if workspace exists
    const workspaceCheck = await client.query(
      "SELECT 1 FROM workspaces WHERE id = $1",
      [workspaceId]
    );
    if (workspaceCheck.rowCount === 0) {
      throw new Error(`Workspace with ID ${workspaceId} does not exist.`);
    }

    await client.query("BEGIN");

    const query = `INSERT INTO media_items (workspace_id, type, format, location, number_of_faces, closest_landmark, availability) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;

    const {
      rows: [mediaItem],
    } = await db.query(query, [
      workspaceId,
      type,
      format,
      location,
      number_of_faces,
      closest_landmark,
      availability,
    ]);

    // insert related data
    if (type === "static" && faces) {
      for (const face of faces) {
        await client.query(
          "INSERT INTO static_media_faces (media_item_id, description, images, rent, availability) VALUES ($1, $2, $3, $4, $5)",
          [
            mediaItem.id,
            face.description,
            face.images,
            face.rent,
            face.availability,
          ]
        );
      }
    }

    if (type === "streetpole" && routes) {
      for (const route of routes) {
        await client.query(
          "INSERT INTO routes (media_item_id, side_route, description, number_of_street_poles, price_per_street_pole, images) VALUES ($1, $2, $3, $4, $5, $6)",
          [
            mediaItem.id,
            route.sideRoute,
            route.description,
            route.numberOfStreetPoles,
            route.pricePerStreetPole,
            route.images,
          ]
        );
      }
    }

    await client.query("COMMIT");
    return mediaItem;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function getMediaItemsService(workspaceId) {
  console.log("Fetching media for workspace:", workspaceId);
  // Fetch static media
  const staticMediaQuery = `
    SELECT 
      mi.id AS media_item_id,
      mi.workspace_id,
      ws.name AS workspace_name,
      mi.type,
      mi.format,
      mi.location,
      mi.number_of_faces,
      mi.closest_landmark,
      mi.availability AS media_availability,

      f.id AS face_id,
      f.description AS face_description,
      f.availability AS face_availability,
      f.images AS face_images,
      f.rent AS face_rent

    FROM media_items mi
    JOIN workspaces ws ON mi.workspace_id = ws.id
    LEFT JOIN static_media_faces f ON f.media_item_id = mi.id
    WHERE mi.type = 'static' AND mi.workspace_id = $1
  `;

  const staticMediaResult = await db.query(staticMediaQuery, [workspaceId]);

  const staticMediaMap = {};
  staticMediaResult.rows.forEach((row) => {
    if (!staticMediaMap[row.media_item_id]) {
      staticMediaMap[row.media_item_id] = {
        id: row.media_item_id,
        workspace: row.workspace_id,
        workspaceName: row.workspace_name,
        type: row.type,
        format: row.format,
        location: row.location,
        numberOfFaces: row.number_of_faces,
        closestLandmark: row.closest_landmark,
        availability: row.media_availability,
        staticMediaFaces: [],
      };
    }

    if (row.face_id) {
      staticMediaMap[row.media_item_id].staticMediaFaces.push({
        id: row.face_id,
        description: row.face_description,
        availability: row.face_availability,
        images: row.face_images,
        rent: row.face_rent,
      });
    }
  });

  const staticMedia = Object.values(staticMediaMap);

  // Fetch streetpoles
  const streetpoleQuery = `
    SELECT 
      mi.id AS media_item_id,
      mi.workspace_id,
      ws.name AS workspace_name,
      mi.type,
      mi.location,
      mi.number_of_faces AS number_of_street_poles,
      mi.closest_landmark,
      mi.availability AS media_availability,

      r.id AS route_id,
      r.side_route,
      r.description AS route_description,
      r.number_of_street_poles,
      r.price_per_street_pole,
      r.images AS route_images

    FROM media_items mi
    JOIN workspaces ws ON mi.workspace_id = ws.id
    LEFT JOIN routes r ON r.media_item_id = mi.id
    WHERE mi.type = 'streetpole' AND mi.workspace_id = $1
  `;

  const streetpoleResult = await db.query(streetpoleQuery, [workspaceId]);

  const streetpoleMap = {};
  streetpoleResult.rows.forEach((row) => {
    if (!streetpoleMap[row.media_item_id]) {
      streetpoleMap[row.media_item_id] = {
        id: row.media_item_id,
        workspace: row.workspace_id,
        workspaceName: row.workspace_name,
        type: row.type,
        location: row.location,
        numberOfStreetPoles: row.number_of_street_poles,
        closestLandmark: row.closest_landmark,
        availability: row.media_availability,
        sideRoute: [],
        routes: [],
      };
    }

    if (
      row.side_route &&
      !streetpoleMap[row.media_item_id].sideRoute.includes(row.side_route)
    ) {
      streetpoleMap[row.media_item_id].sideRoute.push(row.side_route);
    }

    if (row.route_id) {
      streetpoleMap[row.media_item_id].routes.push({
        id: row.route_id,
        sideRoute: row.side_route,
        description: row.route_description,
        numberOfStreetPoles: row.number_of_street_poles,
        pricePerStreetPole: row.price_per_street_pole,
        images: row.route_images,
      });
    }
  });

  const streetpoles = Object.values(streetpoleMap);

  return { staticMedia, streetpoles };
}

export async function getWorkspaceDetailsService(workspaceId) {
  //query workspaces table
  try {
    const results = await db.query(
      "SELECT id, name, email, address, location FROM workspaces WHERE id = $1",
      [workspaceId]
    );
    console.log(results.rowCount);
    if (results.rowCount === 0) {
      throw new Error(`Workspace with ID ${workspaceId} does not exist.`);
    }

    return results.rows[0];
  } catch (err) {
    throw err;
  }
}
