import type { WebDriver } from 'selenium-webdriver';

import type { TreeSearcher } from './TreeSearcher';
import { closeAlertPopup } from './closeAlertPopup';

export async function ejectCategoriesHrefs(driver: WebDriver, treeSearcher: TreeSearcher) {
  await openOzon(driver);
  await closeAlertPopup(driver, treeSearcher);

  const categoriesHrefs: string[] = [];

  // Wait site loading to click on catalog button
  await driver.wait(async () => {
    try {
      await treeSearcher.findCatalogButton();
      return true;
    } catch {
      console.log('location check');
    }
    return false;
  }, 1000);

  await treeSearcher.findCatalogButton().click();
  await driver.sleep(2000);

  try {
    const topCategoryButtons = await treeSearcher.findTopCategoryButtons();

    for (const topCategoryButton of topCategoryButtons) {
      await treeSearcher.moveMouse();
      await treeSearcher.hover(topCategoryButton);
      await driver.sleep(2000);

      const moreButtons = await treeSearcher.findCategoryMoreButtons();
      for (const moreButton of moreButtons) {
        await treeSearcher.hover(moreButton);
        await moreButton.click();
      }

      const categoriesLinks = await treeSearcher.findCategoryLinks();
      for (const categoryLink of categoriesLinks) {
        const href = await categoryLink.getAttribute('href');

        categoriesHrefs.push(href);
      }
    }
  } catch (error) {
    console.log('error while init catalog links', `\n`, error);
  }

  return categoriesHrefs;
}

async function openOzon(driver: WebDriver) {
  await driver.get('https://www.ozon.ru/');
  await driver.sleep(1000);
}
