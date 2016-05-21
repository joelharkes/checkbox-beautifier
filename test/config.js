// conf.js
exports.config = {
  framework: 'jasmine',
  //seleniumAddress: 'http://localhost:4444/wd/hub', //for using selinium
  specs: ['test-checkbox.js'],
  capabilities: {
      //browserName: 'firefox' //test with firefox and selinium
      
       'browserName': 'phantomjs',

  /* 
   * Can be used to specify the phantomjs binary path.
   * This can generally be ommitted if you installed phantomjs globally.
   */
  'phantomjs.binary.path': require('phantomjs-prebuilt').path,

  /*
   * Command line args to pass to ghostdriver, phantomjs's browser driver.
   * See https://github.com/detro/ghostdriver#faq
   */
  'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  }
}