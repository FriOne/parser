import { WebDriver } from 'selenium-webdriver';

import { TreeSearcher } from './TreeSearcher';
import { closeAlertPopup } from './closeAlertPopup';

export async function ejectLeavesCategories(driver: WebDriver, treeSearcher: TreeSearcher, categoryUrl: string) {
  await openOzonCategory(driver, categoryUrl);
  await closeAlertPopup(driver, treeSearcher);

  const leavesCategoriesUrls = [];
  const leavesCategoriesElements = await treeSearcher.findLeavesCategories();

  for (const leaveCategoryElement of leavesCategoriesElements) {
    const url = await leaveCategoryElement.getAttribute('href');

    if (categoryUrl === url) {
      continue;
    }

    leavesCategoriesUrls.push(url);
  }

  return leavesCategoriesUrls;
}

async function openOzonCategory(driver: WebDriver, categoryUrl: string) {
  await driver.get(categoryUrl);
  await driver.sleep(3000);
}