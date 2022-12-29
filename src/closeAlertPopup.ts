import { WebDriver } from 'selenium-webdriver';
import { TreeSearcher } from './TreeSearcher';

export async function closeAlertPopup(driver: WebDriver, treeSearcher: TreeSearcher) {
  // Wait to close alert popup
  try {
    let tryings = 0;
    await driver.wait(async () => {
      if (tryings > 5) {
        return true;
      }

      try {
        tryings++;

        await treeSearcher.findAlertPopupClose().click();
        return true;
      } catch {
        console.log('location check');
      }
      return false;
    }, 1000);
  } catch {}
}