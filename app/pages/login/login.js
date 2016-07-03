var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationSettings = require("application-settings");
var animate = require("ui/animation");
var page;
function loginLoaded(args) {
  page = args.object;
  var loginModel = (function (_super) {
    __extends( loginModel, _super);
    function loginModel() {
      _super.call(this);
      self=this;
    }

    loginModel.prototype.login_action = function () {
      console.log("login_action is activated");
      var navigationEntry = {
        moduleName: "pages/login/register/register",
        animated: true,
        transition: {name:"slideLeft"}
      };
      FrameModule.topmost().navigate(navigationEntry);
    };

    return loginModel;
  })(observable.Observable);
  page.bindingContext = new loginModel();
}

exports.loginLoaded = loginLoaded;

exports.loginUnLoaded = function(){
  console.log("loginUnLoaded is activated");
};
