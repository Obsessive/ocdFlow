var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationSettings = require("application-settings");
var animate = require("ui/animation");
var Ratings = require("nativescript-ratings");
var page,self;
function settingsLoaded(args) {
  page = args.object;
  var settingsModel = (function (_super) {
    __extends( settingsModel, _super);
    function settingsModel() {
      _super.call(this);
      self=this;
      self.dumb_content();
    }

    settingsModel.prototype.dumb_content = function () {
      console.log("dumb_content is activated");
      self.set("settings_items",[{"settings_item_name" : "My Profile"},{"settings_item_name" : "Contact Us"},{"settings_item_name" : "Rate The App"}]);
    };

    return settingsModel;
  })(observable.Observable);
  page.bindingContext = new settingsModel();
}

exports.settingsLoaded = settingsLoaded;

exports.settingsUnLoaded = function(){
  console.log("settingsUnLoaded is activated");
};

exports.settings_item_tap = function(args){
  console.log('Clicked item with index ' + args.index);
  if (args.index === 0) {
    console.log("0");
    var navigationEntry = {
      moduleName: "pages/login/home/settings/profile/profile",
      animated: true,
      transition: {name:"slideLeft"}
    };
    FrameModule.topmost().navigate(navigationEntry);
  }else if (args.index === 1) {
    console.log("1");
  } else if (args.index === 2) {
    console.log("2");
    // var ratings = new Ratings.Ratings({
    // id: "inktalks-1.0.0",
    // showOnCount: 5,
    // title: "Please rate",
    // text: "Do you like to rate this app?",
    // agreeButtonText: "Rate Now",
    // remindButtonText: "Remind Me Later",
    // declineButtonText: "No Thanks",
    // androidPackageId: "org.nativescript.inktalks"
    // });
    // ratings.init();
    // ratings.prompt();
  }
};
