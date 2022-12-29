import { promises } from 'fs';

import { FOLDER_PATH } from './constants';

export function removeFile(name: string) {
  return promises.rm(`${FOLDER_PATH}/${name}`);
}
