Feature('Sauce Demo - Main Page Test');

Before(async ({ I, loginPage, mainPage }) => {
    await I.amOnPage('https://www.saucedemo.com/');
    const userName = await loginPage.getUsernameList(1);
    const password = await loginPage.getPassword();

    await I.login(userName, password);
  
    await mainPage.waitForMainPage();
  });

// Before({tag: '@problem_user'}, async ({ I, loginPage,mainPage }) => {
//     await I.amOnPage('https://www.saucedemo.com/');
//     const userName = await loginPage.getUsernameList(1);
//     const password = await loginPage.getPasswordList();
//     await I.login(userName, password);

//     await mainPage.waitForMainPage();
// })

Scenario('I can add all items to cart and check the cart badge', async ({ I, loginPage }) => {
    //any user credentials can add items to card
    // const userName = await loginPage.getUsernameList(1);
    // const password = await loginPage.getPasswordList();
    // await I.login(userName, password);

});