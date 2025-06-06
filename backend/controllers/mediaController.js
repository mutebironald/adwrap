import { createMediaItemService, getMediaItemsService, getWorkspaceDetailsService, saveWorkspaceDetailsService } from '../services/mediaService.js';

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

export const getWorkspaceDetails = async (req, res) => {
  try {
    const workspaceId = req.query.workspace;
    const workspaceDetails = await getWorkspaceDetailsService(workspaceId);
    res.json(workspaceDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to get workspace details'})
  }
}


export const saveWorkspaceDetails = async(req, res) => {
  try {
    const data = req.body;
    const response = await saveWorkspaceDetailsService(data);
    res.status(201).json(response)
  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to save workspace details'})
  }
}
