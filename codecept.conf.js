require('ts-node/register')

const {
  setHeadlessWhen,
  setCommonPlugins
} = require('@codeceptjs/configure');
setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

require('dotenv').config();

exports.config = {
  helpers: {
    WebDriver: {
      url: process.env.BASE_URL,
      browser: 'chrome',
      smartWait: 5000,
      restart: true,
      windowSize: "maximize",
      timeouts: {
        "script": 60000,
        "page load": 10000
      },
      remoteFileUpload: false,
      desiredCapabilities: {
        chromeOptions: {
          args: [
            "--disable-gpu",
          ]
        }
      },
      waitForTimeout: 10000 // <-- Add or update this line (10 seconds)
    },
    ExpectAction: {
      require: './helpers/ExpectAction.js',
    },
    CustomAction: {
      require: './helpers/CustomAction.js'
    },
    CommonHelper: {
      require: './helpers/common.js'
    },
    // REST : {
    //   endpoint: process.env.BASE_URL,
    //   timeout: 10000,
    //   prettyPrintJson: true,
    //   defaultHeaders: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   timeout: 10000
    // },
    ApiSwitcher: {
      require: './helpers/ApiSwitcher.js',
      endpoint: process.env.BASE_URL,
      timeout: 10000,
      prettyPrintJson: true,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },
  },
  include: {
    I: './steps_file.js',
  },
  name: 'ui-automation',
  bootstrap: null,
  mocha: {
    reporterOptions: {
      reportDir: './output'
    },
    bail: false
  }
}