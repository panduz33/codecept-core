/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');


type ExpectAction = import('./helpers/ExpectAction.js');
type CustomAction = import('./helpers/CustomAction.js');
type ApiSwitcher = import('./helpers/ApiSwitcher.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends WebDriver, ExpectAction, CustomAction, ApiSwitcher {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
