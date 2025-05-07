Feature('Sauce Demo - Login Test');

Before(async ({ I, loginPage, mainPage }) => {
    await I.amOnPage('https://www.saucedemo.com/');
})

Scenario('Login with valid credentials', async ({ I, loginPage, mainPage }) => {
    const standardUserName = await loginPage.getUsernameList(1);
    const standardUserPassword = await loginPage.getPassword();
    await I.login(standardUserName, standardUserPassword);
    await mainPage.waitForMainPage();
});

Scenario('Login with locked out user', async ({ I, loginPage, mainPage }) => {
    const lockedOutUserName = await loginPage.getUsernameList(2);
    const lockedOutUserPassword = await loginPage.getPassword();
    await I.login(lockedOutUserName, lockedOutUserPassword);
    
    const errorMessage = await loginPage.getErrorMessage();
    await I.assertEqual(errorMessage, 'Epic sadface: Sorry, this user has been locked out.');
});

Scenario('Login with problem user', async ({ I, loginPage, mainPage }) => {
    const problemUserName = await loginPage.getUsernameList(3);
    const problemUserPassword = await loginPage.getPassword();
    await I.login(problemUserName, problemUserPassword);
    await mainPage.waitForMainPage();

    //This user has similar behavior with valid credentials, the problem will arise after filling in checkout information
});

Scenario('Login with performance glitch user', async ({ I, loginPage, mainPage }) => {
    const glitchUserName = await loginPage.getUsernameList(4);
    const glitchUserPassword = await loginPage.getPassword();
    await I.login(glitchUserName, glitchUserPassword);
    await mainPage.waitForMainPage();
    //This user has similar behavior with valid credentials, its only add slight delay after clicking login button
});

Scenario('Login with error user', async ({ I, loginPage, mainPage }) => {
    const errorUserName = await loginPage.getUsernameList(5);
    const errorUserPassword = await loginPage.getPassword();
    await I.login(errorUserName, errorUserPassword);
    await mainPage.waitForMainPage();
});

Scenario('Login with visual user', async ({ I, loginPage, mainPage }) => {
    const visualUserName = await loginPage.getUsernameList(6);
    const visualUserPassword = await loginPage.getPassword();
    await I.login(visualUserName, visualUserPassword);
    await mainPage.waitForMainPage();
});