const { CUSTOMER_DATA } = require("../constants/customer_data");
const { SAUCELABS_PRODUCTS } = require("../constants/products");

Feature('Saucelabs Test');

Before(async ({ I, loginPage, mainPage }) => {
  await I.amOnPage('https://www.saucedemo.com/');

  const standartUserName = await loginPage.getUsernameList(1);
  const password = await loginPage.getPasswordList();
  await I.login(standartUserName, password);

  await mainPage.waitForMainPage();
});

Scenario('I can add to cart all of the items displayed', async ({ I, mainPage }) => {

  //Try to Order items
  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.BACKPACK.NAME);
  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.BIKE_LIGHT.NAME);
  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.BOLT_TSHIRT.NAME);
  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.FLEECE_JACKET.NAME);

  await I.scrollingDownMedium();

  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.ONESIE.NAME);
  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.RED_TSHIRT.NAME);

  await I.scrollPageToTop();

  //Check Cart
  const itemCount = await mainPage.countCartItems();
  await I.assertEqual(itemCount, '6');
});

Scenario('I can open menu and see all the menu lists', async ({I, mainPage}) => {
  await mainPage.openMenu();
  await mainPage.assertAllMenuIsExist();
  await mainPage.closeMenu();
})

Scenario('I can filter items by name in descending order', async ({I, mainPage}) => {
  const itemNames = await mainPage.getAllItemsName();

  const sortedDescendingItemName = itemNames.sort((a,b) => b.localeCompare(a));
  await I.say(`Current item list are : ${itemNames}`);

  await mainPage.sortItemByNameDescending();
  const sortedItemNames = await mainPage.getAllItemsName();

  await I.say(`Sorted item list are : ${sortedItemNames}`);
  await I.assertArrayEquals(sortedItemNames, sortedDescendingItemName);


})

Scenario('I can filter items by price in ascending order', async ({I, mainPage}) => {
  const itemPrices = await mainPage.getAllItemsPrice();
  const sortedAscendingItemPrice = itemPrices.sort((a,b) => a - b);
  await I.say(`Current item list are : ${itemPrices}`);
  await mainPage.sortItemByPriceLowToHigh();
  const sortedItemPrices = await mainPage.getAllItemsPrice();
  await I.say(`Sorted item list are : ${sortedItemPrices}`);
  await I.assertArrayEquals(sortedItemPrices, sortedAscendingItemPrice);
})

Scenario.only('I can checkout all items and check inside the cart', async ({I, mainPage, cartPage, checkOutPage}) => {
  //Try to Order items
  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.BACKPACK.NAME);
  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.BIKE_LIGHT.NAME);
  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.BOLT_TSHIRT.NAME);
  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.FLEECE_JACKET.NAME);

  await I.scrollingDownMedium();

  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.ONESIE.NAME);
  await mainPage.addItemToCart(SAUCELABS_PRODUCTS.RED_TSHIRT.NAME);

  await I.scrollPageToTop();

  //Check Cart
  const itemCount = await mainPage.countCartItems();
  await I.assertEqual(itemCount, '6');

  await mainPage.openShoppingCart();

  await cartPage.waitForCartOpened();

  const cartData = await cartPage.getCartData();
  //sorted cart data by product name in ascending order
  cartData.sort((a,b) => a.productName.localeCompare(b.productName));

  const expectedCartData = await cartPage.convertProductListToArray(SAUCELABS_PRODUCTS);
  const expected = expectedCartData.sort((a,b) => a.productName.localeCompare(b.productName)).map(product => ({
    ...product,
    productQuantity: '1'
  }));
  console.log(expected);

  await I.assertArrayEquals(cartData, expected);

  await cartPage.clickCheckout();

  await checkOutPage.waitForCheckoutPageOpened();

  const {FIRST_NAME, LAST_NAME, ZIP_CODE} = CUSTOMER_DATA;
  await checkOutPage.fillCheckoutForm(FIRST_NAME, LAST_NAME, ZIP_CODE);
})