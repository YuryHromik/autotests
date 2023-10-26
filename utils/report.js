var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: './tests_output/cucumber_report.json',
    output: './tests_output/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    brandTitle: '<span style="color:green;font-weight:bold;">MakeMake team</span>'
};

reporter.generate(options);