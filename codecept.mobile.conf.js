exports.config = {
  helpers: {
    Appium: {
      host: '', //enter host, example: 127.0.0.1
      port: 0,   //enter port, example: 4723
      path: '',  //enter path, example: /wd/hub or /
      platform: 'Android',
      device: '', //enter device name, example: emulator-5554
      appWaitActivity: "*",
      noReset: true,
      fullReset: false,
      desiredCapabilities: {
        platformVersion: "", //enter android version, example 10.0
        automationName: 'UiAutomator2',
        platformName: 'Android',
        deviceName: '', //enter device name, example: emulator-5554
        appPackage: "", //enter app package
        appActivity: "", //enter app activity
      },
      waitForTimeout: 10000,
      smartWait: 5000,
    }
  },
  include: {
    I: './steps_file.js',
  },
  name: 'android-apps-automation',
  mocha: {
    reporterOptions: {
      reportDir: './output'
    }
  }
}
