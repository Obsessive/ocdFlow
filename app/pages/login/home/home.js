var FrameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationSettings = require("application-settings");
var animate = require("ui/animation");
var Platform = require("platform");
var Fresco = require("nativescript-fresco");
var Slides = require("nativescript-slides/nativescript-slides");
var ImageCacheIt = require("nativescript-image-cache-it");
var page;
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

};

exports.settings_action = function() {
  var navigationEntry = {
    moduleName: "pages/login/home/settings/settings",
    animated: true,
    transition: {name:"slideTop"}
  };
  FrameModule.topmost().navigate(navigationEntry);
};







exports.speaker_item_tap = function(args){
  console.log('Clicked item with index ' + args.index);

};

exports.tabViewNewsFeedUnLoaded = function(args){
  console.log("tabViewNewsFeedUnLoaded is activated");

};
