import { By, WebDriver, WebElement } from 'selenium-webdriver';

export class TreeSearcher {
  constructor(private driver: WebDriver) {}

  moveMouse() {
    return this.driver.actions().move({
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
      duration: 100,
    }).perform();
  }

  hover(element: WebElement) {
    return this.driver.actions().move({ origin: element, duration: 100 }).perform();
  }

  findAlertPopupClose() {
    return this.driver.findElement(By.css('[data-widget=alertPopup] .yc7 button'));
  }

  findCatalogButton() {
    return this.driver.findElement(By.css('[data-widget=catalogMenu] button'));
  }

  findTopCategoryButtons() {
    return this.driver.findElements(By.css(`.dd9 ul > li > a`));
  }

  findCategoryMoreButtons() {
    return this.driver.findElements(By.css(`.de0 .d3e`));
  }

  findCategoryLinks() {
    return this.driver.findElements(By.css(`.de0 .ek:not(.tsBodyLBold)`));
  }

  findLeavesCategories() {
    return this.driver.findElements(By.css(`.aa6r`));
  }
}