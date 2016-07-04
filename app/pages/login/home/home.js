var FrameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationSettings = require("application-settings");
var animate = require("ui/animation");
var Platform = require("platform");
var imageCache = require("nativescript-web-image-cache");
var Slides = require("nativescript-slides/nativescript-slides");
var page,self;
function homeLoaded(args) {
  page = args.object;
  var homeModel = (function (_super) {
    __extends( homeModel, _super);
    function homeModel() {
      _super.call(this);
      self=this;
    }

return homeModel;
})(observable.Observable);
page.bindingContext = new homeModel();
}

exports.homeLoaded = homeLoaded;

exports.homeUnLoaded = function(){
  console.log("homeUnLoaded is activated");
};

exports.settings_action = function() {
  var navigationEntry = {
    moduleName: "pages/login/home/settings/settings",
    animated: true,
    transition: {name:"slideTop"}
  };
  FrameModule.topmost().navigate(navigationEntry);
};
