import { getState, setState } from './storage.js';
import { SCHEMA_VERSION } from './constants.js';
import { downloadFile, toDateKey } from './utils.js';
import { validateBackup } from './lib/validators.js';

export function exportBackup() {
  const payload = { exportedAt: new Date().toISOString(), app: 'habitos-app', schemaVersion: SCHEMA_VERSION, data: getState() };
  downloadFile(`habitos-backup-${toDateKey()}.json`, JSON.stringify(payload, null, 2));
}

export async function importBackupFile(file) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  const validation = validateBackup(parsed);
  if (!validation.valid) throw new Error(validation.message);
  setState(parsed.data);
  return parsed.data;
}
