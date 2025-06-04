import { createMediaItemService, getMediaItemsService } from '../services/mediaService.js';

export async function createMediaItem(req, res) {
  try {
    const mediaItem = await createMediaItemService(req.body);
    res.status(201).json({ message: 'Media item created', mediaItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create media item' });
  }
}


export const getMediaItems = async (req, res) => {
  try {
    const workspaceId = req.query.workspace;
    const mediaItems = await getMediaItemsService(workspaceId);
    res.json(mediaItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch media items' });
  }
};
