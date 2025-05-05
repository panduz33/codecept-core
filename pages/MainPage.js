const { WAIT_TIME } = require("../constants/wait");

const { I } = inject();

module.exports = {

  // insert your locators and methods here
  info : {
    appLogo : 'div[class="app_logo"]',
    inventoryItemName : 'div[data-test="inventory-item-name"]'
  },

  buttons : {
    shoppingCart : 'a[data-test="shopping-cart-link"]',
    menu : '//button[text()="$command"]',
    addToCartSpecificItem : '//div[text()="$itemName"]/../../..//button'
  },

  indicators : {
    isMenuOpen : 'div[class="bm-menu-wrap"]', //get attribute value from "aria-hidden",
    cartBadgeCounter : 'span[class="shopping_cart_badge"]' //get text from this indicato
  },

  menus : {
    allItems : 'All Items',
    about : 'About',
    logout : 'Logout',
    resetAppState : 'Reset App State',
  },

  // methods
  async waitForMainPage(){
    await I.waitForElement(this.info.appLogo, WAIT_TIME.MEDIUM);
  },

  async openMenu(){
    await I.click(this.buttons.menu.replace('$command', 'Open Menu'));
    await I.wait(1);
    const isMenuOpen = await I.grabAttributeFrom(this.indicators.isMenuOpen, 'aria-hidden');
    if(isMenuOpen == 'true'){
      await I.say('Menu is not open');
      return;
    }
    await I.say('Menu has opened');
  },

  async closeMenu(){
    await I.click(this.buttons.menu.replace('$command', 'Close Menu'));
    await I.wait(1);
    const isMenuOpen = await I.grabAttributeFrom(this.indicators.isMenuOpen, 'aria-hidden');
    if(isMenuOpen == 'false'){
      await I.say('Menu is not closed');
      return;
    }
    await I.say('Menu has closed');
  },

  async getAllItems(){
    return await I.grabTextFromAll(this.info.inventoryItemName);
  },

  async addItemToCart(itemName){
    await I.click(this.buttons.addToCartSpecificItem.replace('$itemName', itemName));
  },

  async countCartItems(){
    return await I.grabTextFrom(this.indicators.cartBadgeCounter);
  },
}
