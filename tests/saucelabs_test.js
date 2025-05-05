Feature('Saucelabs Test');

Scenario('Login to Sauce Demo', async ({ I }) => {
  await I.amOnPage('https://www.saucedemo.com/');
  pause();
});