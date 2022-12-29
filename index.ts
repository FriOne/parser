import { Browser, Builder } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

import { TreeSearcher } from './src/TreeSearcher';
import { ejectCategoriesHrefs } from './src/ejectCategoriesHrefs';
import { closeAlertPopup } from './src/closeAlertPopup';
import { ejectLeavesCategories } from './src/ejectLeavesCategories';
import { saveHrefs } from './src/saveHrefs';
import { removeFile } from './src/removeFile';
import { MIDDLE_CATEGORIES_FILE, LEAVES_CATEGORIES_FILE } from './src/constants';

const categoryUrl = 'https://www.ozon.ru/category/telefony-i-smart-chasy-15501/';

run();

async function run() {
  const options = new ChromeOptions();
  const driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

  const treeSearcher = new TreeSearcher(driver);

  try {
    await closeAlertPopup(driver, treeSearcher);
    await driver.sleep(2000);

    const categoriesHrefs = await ejectCategoriesHrefs(driver, treeSearcher);
    await removeFile(MIDDLE_CATEGORIES_FILE);
    await saveHrefs(categoriesHrefs, MIDDLE_CATEGORIES_FILE);

    const leavesCategoriesUrls = await ejectLeavesCategories(driver, treeSearcher, categoryUrl);
    await removeFile(LEAVES_CATEGORIES_FILE);
    await saveHrefs(leavesCategoriesUrls, LEAVES_CATEGORIES_FILE);
  } finally {
    await driver.quit();
  }
}


