import { promises } from 'fs';

import { FOLDER_PATH } from './constants';

export async function saveHrefs(hrefs: string[], name: string) {
  try {
    await promises.mkdir(FOLDER_PATH);
  } catch {
    console.log('Folder "data" already exists');
  } finally {
    await promises.appendFile(`${FOLDER_PATH}/${name}`, hrefs.join(`\n`));
  }
}
