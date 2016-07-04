var application = require("application");
var imageCache = require("nativescript-web-image-cache");
application.mainModule = "pages/login/login";
application.cssFile = "pages/global.css";
if (application.android) {
    application.onLaunch = function (intent) {
            imageCache.initialize();
    };
}
try{
  application.start();
}catch(e){
  console.log(e);
}
