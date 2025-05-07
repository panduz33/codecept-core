const { WAIT_TIME } = require("../constants/wait");

const { I } = inject();

module.exports = {

  // insert your locators and methods here
  info : {
    yourCart : 'Your Cart',
    productQuantity : 'div[data-test="item-quantity"]',
    productName : 'div[data-test="inventory-item-name"]',
    productPrice : 'div[data-test="inventory-item-price"]',
  },

  buttons : {
    checkout : 'Checkout',
    continueShopping : 'Continue Shopping',
    removeItem : 'Remove'
  },

  async waitForCartOpened(){
    await I.waitForText(this.info.yourCart, WAIT_TIME.SHORT);
  },

  async getCartData(){
    const result = [];
    const productQuantityList = await I.grabTextFromAll(this.info.productQuantity);
    const productNameList = await I.grabTextFromAll(this.info.productName);
    const productPriceList = await I.grabTextFromAll(this.info.productPrice);

    for(let i = 0; i < productQuantityList.length; i++){
      result.push({
        productName : productNameList[i],
        productQuantity : productQuantityList[i],
        productPrice : productPriceList[i]
      });
    }
    return result;
  },

  async clickCheckout(){
    await I.scrollPageToBottom();
    await I.click(this.buttons.checkout);
  },

  /**
   * 
   * @param {Object} productList from constants/products.js
   * @returns {Array:Object{productName, productPrice}} 
   */
  async convertProductListToArray(productList){
    const result = Object.values(productList)
    .map(product => ({
      productName : product.NAME,
      productPrice : `$${product.PRICE}`,
    }));
    return result;
  },
}
