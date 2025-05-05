Feature('Saucelabs Test');

Scenario('Login to Sauce Demo', async ({ I, loginPage, mainPage }) => {
  await I.amOnPage('https://www.saucedemo.com/');
  const standartUserName = await loginPage.getUsernameList(1);
  console.log(standartUserName);
  const password = await loginPage.getPasswordList();
  console.log(password);

  await loginPage.fillLoginForm(standartUserName, password);

  await mainPage.waitForMainPage();
  await mainPage.openMenu();

  await I.wait(2);
  await mainPage.closeMenu();

  await I.wait(2);

  //Try to Order items
  await mainPage.addItemToCart('Sauce Labs Backpack');
  await mainPage.addItemToCart('Sauce Labs Bike Light');
  await mainPage.addItemToCart('Sauce Labs Bolt T-Shirt');
  await mainPage.addItemToCart('Sauce Labs Fleece Jacket');

  await I.wait(2);

  //Check Cart
  const itemCount = await mainPage.countCartItems();
  await I.assertEqual(itemCount, '4');
});