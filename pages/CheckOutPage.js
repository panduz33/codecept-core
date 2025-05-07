const { WAIT_TIME } = require("../constants/wait");

const { I } = inject();

module.exports = {

  // insert your locators and methods here
  info : {
    checkoutInfo : 'Checkout: Your Information',
  },

  fields : {
    firstName : '#first-name',
    lastName : '#last-name',
    postalCode : '#postal-code'
  },

  buttons : {
    continue : 'Continue',
    cancel : 'Cancel'
  },

  async waitForCheckoutPageOpened(){
    await I.waitForText(this.info.checkoutInfo, WAIT_TIME.SHORT);
  },

  async fillCheckoutForm(firstName, lastName, postalCode){
    await I.fillField(this.fields.firstName, firstName);
    await I.fillField(this.fields.lastName, lastName);
    await I.fillField(this.fields.postalCode, postalCode);
    await I.click(this.buttons.continue);
  }
}
