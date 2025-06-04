import db from '../db/index.js';

export async function generateMediaId(workspaceId, type) {
  const result = await db.query(
    'SELECT COUNT(*) FROM media_items WHERE workspace_id = $1 AND type = $2',
    [workspaceId, type]
  );

  const count = parseInt(result.rows[0].count, 10) + 1;
  return type === 'billboard' ? `BB-${count}` : `SP-${count}`;
}
