var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationSettings = require("application-settings");
var animate = require("ui/animation");
var permissions = require("nativescript-permissions");
var page;
function loginLoaded(args) {
  page = args.object;
  var loginModel = (function (_super) {
    __extends( loginModel, _super);
    function loginModel() {
      _super.call(this);
      self=this;
    }
    loginModel.prototype.write_permission = function () {
      console.log("write_permission is activated");
      if (permissions.hasPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
        console.log("has permission");
        var navigationEntry = {
          moduleName: "pages/login/register/register",
          animated: true,
          transition: {name:"slideLeft"}
        };
        FrameModule.topmost().navigate(navigationEntry);
      }else {
        permissions.requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE, "I need these permissions to work properly")
        .then(function() {
          console.log("Woo Hoo, I have the power!");
          var navigationEntry = {
            moduleName: "pages/login/register/register",
            animated: true,
            transition: {name:"slideLeft"}
          };
          FrameModule.topmost().navigate(navigationEntry);
        })
        .catch(function() {
          console.log("Uh oh, no permissions - plan B time!");
        });
      }
    };

    loginModel.prototype.read_permission = function () {
      console.log("read_permission is activated");
      if (permissions.hasPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE)) {
        console.log("has permission");
        self.write_permission();
      }else{
        console.log("grant_permission is activated");
        permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions to work properly")
        .then(function() {
          console.log("Woo Hoo, I have the power!");
          self.write_permission();
        })
        .catch(function() {
          console.log("Uh oh, no permissions - plan B time!");
        });
      }
    };

    loginModel.prototype.internet_permission = function () {
      console.log("check_permission is activated");
      if (permissions.hasPermission(android.Manifest.permission.INTERNET)) {
        console.log("has permission");
        self.read_permission();
      }else{
        console.log("grant_permission is activated");
        permissions.requestPermission(android.Manifest.permission.INTERNET, "I need these permissions to work properly")
        .then(function() {
          console.log("Woo Hoo, I have the power!");
          self.read_permission();
        })
        .catch(function() {
          console.log("Uh oh, no permissions - plan B time!");
        });
      }
    };

    loginModel.prototype.login_action = function () {
      console.log("login_action is activated");
      self.internet_permission();
    };

    return loginModel;
  })(observable.Observable);
  page.bindingContext = new loginModel();
}

exports.loginLoaded = loginLoaded;

exports.loginUnLoaded = function(){
  console.log("loginUnLoaded is activated");
};
