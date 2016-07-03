var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationSettings = require("application-settings");
var animate = require("ui/animation");
var page;
function registerLoaded(args) {
  page = args.object;
  var registerModel = (function (_super) {
    __extends( registerModel, _super);
    function registerModel() {
      _super.call(this);
      self=this;
    }

    registerModel.prototype.register_action = function () {
      console.log("register_action is activated");
      var navigationEntry = {
        moduleName: "pages/login/home/home",
        animated: true,
        transition: {name:"slideLeft"}
      };
      FrameModule.topmost().navigate(navigationEntry);
    };

    return registerModel;
  })(observable.Observable);
  page.bindingContext = new registerModel();
}

exports.registerLoaded = registerLoaded;

exports.registerUnLoaded = function() {
  console.log("registerUnLoaded is activated");
};
