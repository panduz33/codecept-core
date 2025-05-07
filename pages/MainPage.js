const { WAIT_TIME } = require("../constants/wait");

const { I } = inject();

module.exports = {

  // insert your locators and methods here
  info : {
    appLogo : 'div[class="app_logo"]',
    inventoryItemName : '$inventory-item-name',
    inventoryItemPrice : '$inventory_item_price',
    title : '$title'
  },

  buttons : {
    shoppingCart : '$shopping-cart-link',
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

  filter : '$product-sort-container',

  select : {
    sortByAscendingAlphabetical : 'Name (A to Z)',
    sortByDescendingAlphabetical : 'Name (Z to A)',
    sortByPriceLowToHigh : 'Price (low to high)',
    sortByPriceHighToLow : 'Price (high to low)'
  },

  // methods
  async waitForMainPage(){
    await I.waitForElement(this.info.appLogo, WAIT_TIME.MEDIUM);
    await I.seeTextEquals('Products', this.info.title);
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

  async openShoppingCart(){
    await I.click(this.buttons.shoppingCart);
  },

  async getAllItemsName(){
    return await I.grabTextFromAll(this.info.inventoryItemName);
  },

  async getAllItemsPrice(){
    const allPrices = await I.grabTextFromAll(this.info.inventoryItemPrice);
    return allPrices.map(price => price.replace('$','')); //remove $ sign from price and retur
  },

  async addItemToCart(itemName){
    //checking button text before click
    await I.seeTextEquals('Add to cart', this.buttons.addToCartSpecificItem.replace('$itemName', itemName));

    await I.say(`Adding item: ${itemName}`);
    await I.click(this.buttons.addToCartSpecificItem.replace('$itemName', itemName));

    //checking button text after click
    await I.seeTextEquals('Remove', this.buttons.addToCartSpecificItem.replace('$itemName', itemName));
  },

  async countCartItems(){
    return await I.grabTextFrom(this.indicators.cartBadgeCounter);
  },

  async assertAllMenuIsExist(){
    for(const menu in this.menus){
      await I.say('Checking menu : ' + this.menus[menu]);
      await I.see(this.menus[menu]);
    }
  },

  async sortItemByNameAscending(){
    await I.selectOption(this.filter, this.select.sortByAscendingAlphabetical);
  },

  async sortItemByNameDescending(){
    await I.selectOption(this.filter, this.select.sortByDescendingAlphabetical);
  },

  async sortItemByPriceLowToHigh(){
    await I.selectOption(this.filter, this.select.sortByPriceLowToHigh);
  },

  async sortItemByPriceHighToLow(){
    await I.selectOption(this.filter, this.select.sortByPriceHighToLow);
  }
}
