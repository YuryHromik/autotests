process.env.URL = "https://www.saucedemo.com";
const Services = {};
loadServices();

// Refer to the online docs for more details:
// https://nightwatchjs.org/guide/configuration/nightwatch-configuration-file.html
//
//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/
//

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['tests'],

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ['tests/page_objects/'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  custom_commands_path: "",

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  custom_assertions_path: "",

  // See https://nightwatchjs.org/guide/concepts/test-globals.html#external-test-globals
  globals_path : "",

  webdriver: {},
  
  test_runner: {
    type: "cucumber",
    options: {
        feature_path: "tests/features/*.feature",
        additional_config: "",
        //parallel: 2
    }

},

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'https://nightwatchjs.org',

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities: {
        browserName : 'firefox'
      },

      webdriver: {
        start_process: true,
        server_path: ''
      }
    },
    chrome: {
      desiredCapabilities: {
          browserName: "chrome",
          "goog:chromeOptions": {
              // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
              //
              // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
              prefs: {
                  download: {
                      default_directory: require("path").resolve(__dirname + "/../download")
                  }
              },
              w3c: true,
              args: [
                  '--no-sandbox',
                  '--ignore-certificate-errors',
                  '--allow-insecure-localhost',
                  '--start-maximized',
                  //'--headless',
                  'window-size=1920,1080' //2K
              ]
          }
      },

      webdriver: {
          start_process: true,
          port: 4444,
          server_path: require("chromedriver").path,
          cli_args: [
              // --verbose
          ]
      }
  },

    //////////////////////////////////////////////////////////////////////////////////
    // Configuration for when using the SauceLabs cloud service                      |
    //                                                                               |
    // Please set the username and access key by setting the environment variables:  |
    // - SAUCE_USERNAME                                                              |
    // - SAUCE_ACCESS_KEY                                                            |
    //////////////////////////////////////////////////////////////////////////////////
    saucelabs: {
      selenium: {
        host: 'ondemand.saucelabs.com',
        port: 443
      },
      // More info on configuring capabilities can be found on:
      // https://docs.saucelabs.com/dev/test-configuration-options/
      desiredCapabilities: {
        'sauce:options' : {
          username: '${SAUCE_USERNAME}',
          accessKey: '${SAUCE_ACCESS_KEY}',
          screenResolution: '1280x1024'
          // https://docs.saucelabs.com/dev/cli/sauce-connect-proxy/#--region
          // region: 'us-west-1'
          // https://docs.saucelabs.com/dev/test-configuration-options/#tunnelidentifier
          // parentTunnel: '',
          // tunnelIdentifier: '',
        }
      },
      disable_error_log: false,
      webdriver: {
        start_process: false
      }
    },
    'saucelabs.chrome': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'chrome',
        browserVersion: 'latest',
        javascriptEnabled: true,
        acceptSslCerts: true,
        timeZone: 'London',
        chromeOptions : {
          w3c: true
        }
      }
    },
    'saucelabs.firefox': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'firefox',
        browserVersion: 'latest',
        javascriptEnabled: true,
        acceptSslCerts: true,
        timeZone: 'London'
      }
    },
    //////////////////////////////////////////////////////////////////////////////////
    // Configuration for when using the Selenium service, either locally or remote,  |
    //  like Selenium Grid                                                           |
    //////////////////////////////////////////////////////////////////////////////////
    selenium_server: {
      // Selenium Server is running locally and is managed by Nightwatch
      // Install the NPM package @nightwatch/selenium-server or download the selenium server jar file from https://github.com/SeleniumHQ/selenium/releases/, e.g.: selenium-server-4.1.1.jar
      selenium: {
        start_process: true,
        port: 4444,
        server_path: (Services.seleniumServer ? Services.seleniumServer.path : ""),
        cli_args: {
            "webdriver.gecko.driver": (Services.geckodriver ? Services.geckodriver.path : ""),
            "webdriver.chrome.driver": (Services.chromedriver ? Services.chromedriver.path : "")
        }
    },
      webdriver: {
        start_process: false,
        default_path_prefix: '/wd/hub'
      }
    },

    'selenium.chrome': {
      extends: 'selenium_server',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions : {
          w3c: true
        }
      }
    },

    'selenium.firefox': {
      extends: 'selenium_server',
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: [
            // '-headless',
            // '-verbose'
          ]
        }
      }
    }
  }
};

function loadServices() {
  try {
      Services.seleniumServer = require("selenium-server");
  } catch (err) {}

  try {
      Services.chromedriver = require("chromedriver");
  } catch (err) {}
}