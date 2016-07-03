var application = require("application");
var fresco = require("nativescript-fresco");
application.mainModule = "pages/login/login";
application.cssFile = "pages/global.css";
if (application.android) {
  application.onLaunch = function (intent) {
    fresco.initialize();
  };
}
try{
  application.start();
}catch(e){
  console.log(e);
}
