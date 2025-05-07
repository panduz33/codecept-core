/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type loginPage = typeof import('./pages/LoginPage.js');
type mainPage = typeof import('./pages/MainPage.js');
type cartPage = typeof import('./pages/CartPage.js');
type checkOutPage = typeof import('./pages/CheckOutPage.js');
type overViewPage = typeof import('./pages/OverViewPage.js');

type ExpectAction = import('./helpers/ExpectAction.js');
type CustomAction = import('./helpers/CustomAction.js');
type ApiSwitcher = import('./helpers/ApiSwitcher.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, loginPage: loginPage, mainPage: mainPage, cartPage: cartPage, checkOutPage: checkOutPage, overViewPage: overViewPage }
  interface Methods extends WebDriver, ExpectAction, CustomAction, ApiSwitcher {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
