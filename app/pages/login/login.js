var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationSettings = require("application-settings");
var animate = require("ui/animation");
var Platform = require("platform");
var connectivity = require("connectivity");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var permissions = require("nativescript-permissions");
var page;
var postjson;
var options,username,password;
var base_url = "http://inkdpd.obsessive.tech";
var loader = new LoadingIndicator();
function loginLoaded(args) {
  page = args.object;
  var loginModel = (function (_super) {
    __extends( loginModel, _super);
    function loginModel() {
      _super.call(this);
      self=this;
      self.bootstrap();
      self.get_permissions();
      self.is_logged();
    }

    loginModel.prototype.is_logged = function () {
      console.log("is_logged is activated");
      if (applicationSettings.getBoolean("logged")) {
        FrameModule.topmost().navigate("pages/login/home/home");
      }
    };

    loginModel.prototype.bootstrap = function () {
      console.log("bootstrap is activated");
      options = {
        message: 'Loading...',
        progress: 0.65,
        android: {
          indeterminate: true,
          cancelable: false,
          max: 100,
          progressNumberFormat: "%1d/%2d",
          progressPercentFormat: 0.53,
          progressStyle: 1,
          secondaryProgress: 1
        },
        ios: {
          details: "Additional detail note!",
          square: false,
          margin: 10,
          dimBackground: true,
          color: "#4B9ED6",
          mode: "MBProgressHUDModeAnnularDeterminate"
        }
      };
    };

    loginModel.prototype.get_permissions = function () {
      console.log("get_permissions is activated");
      self.internet_permission();
    };

    loginModel.prototype.internet_permission = function () {
      console.log("internet_permission is activated");
      if (permissions.hasPermission(android.Manifest.permission.INTERNET)) {
        console.log("has internet_permission");
        self.read_permission();
      }else{
        permissions.requestPermission(android.Manifest.permission.INTERNET, "I need these permissions to work properly")
        .then(function() {
          console.log("Woo Hoo, I have the internet_permission!");
          self.read_permission();
        })
        .catch(function() {
          console.log("Uh oh, no internet_permission - plan B time!");
          self.internet_permission();
        });
      }
    };

    loginModel.prototype.read_permission = function () {
      console.log("read_permission is activated");
      if (permissions.hasPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE)) {
        console.log("has read_permission");
        self.write_permission();
      }else{
        permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions to work properly")
        .then(function() {
          console.log("Woo Hoo, I have the read_permission!");
          self.write_permission();
        })
        .catch(function() {
          console.log("Uh oh, no read_permission - plan B time!");
          self.read_permission();
        });
      }
    };

    loginModel.prototype.write_permission = function () {
      console.log("write_permission is activated");
      if (permissions.hasPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
        console.log("has write_permission");
        self.network_permission();
      }else {
        permissions.requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE, "I need these permissions to work properly")
        .then(function() {
          console.log("Woo Hoo, I have the write_permission!");
        })
        .catch(function() {
          console.log("Uh oh, no write_permission - plan B time!");
          self.write_permission();
        });
      }
    };

    loginModel.prototype.network_permission = function () {
      console.log("network_permission is activated");
      if (permissions.hasPermission(android.Manifest.permission.ACCESS_NETWORK_STATE)) {
        console.log("has network_permission");
      }else {
        permissions.requestPermission(android.Manifest.permission.ACCESS_NETWORK_STATE, "I need these permissions to work properly")
        .then(function() {
          console.log("Woo Hoo, I have the network_permission!");
        })
        .catch(function() {
          console.log("Uh oh, no network_permission - plan B time!");
          self.network_permission();
        });
      }
    };

    loginModel.prototype.connect = function () {
      console.log("connect is activated");
      var connectionType = connectivity.getConnectionType();
      switch (connectionType) {
        case connectivity.connectionType.none:
        alert("Form saved. Please sync when internet is available! ");
        return false;
        break;
        case connectivity.connectionType.wifi:
        console.log("WiFi connection");
        return true;
        break;
        case connectivity.connectionType.mobile:
        console.log("Mobile connection");
        return true;
        break;
      }
    };

    loginModel.prototype.get_data = function () {
      console.log("get_data is activated");
      username = page.getViewById("email_id").text;
      password = page.getViewById("password_id").text;

      if (username === "") {
        alert("Please enter your username");
        return false;
      }

      if (password === "") {
        alert("Please enter your password");
        return false;
      }

      postjson = {
        username: username,
        password: password
      };

      return true;
    };

    loginModel.prototype.login_action = function () {
      console.log("login_action is activated");
      if (self.connect() === false) {
        alert("Oops! Internet is not available");
        return;
      }

      if (self.get_data() === false) {
        return;
      }

      self.send_login_data();
    };

    loginModel.prototype.send_login_data = function () {
      console.log("send_login_data is activated");
      loader.show(options);
      fetchModule.fetch(base_url + "/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postjson)
      }).then(function (response) {
        console.log("successfull");
        if (JSON.parse(response._bodyText).status === undefined) {
          console.log(JSON.parse(response._bodyText).uid);
          applicationSettings.setString("id",JSON.parse(response._bodyText).uid);
          applicationSettings.setBoolean("logged",true);
          console.log(applicationSettings.getString("id"));
          var navigationEntry = {
            moduleName: "pages/login/home/home",
            animated: true,
            clearHistory: true,
            transition: {name:"slideLeft"}
          };
          FrameModule.topmost().navigate(navigationEntry);
        }else {
          console.log(JSON.parse(response._bodyText).status);
          alert("Invalid username or password");
        }
        loader.hide();
      }, function (e) {
        console.log("Error occurred " + e);
        alert("Sorry... kindly check your details and try again!");
        loader.hide();
      });
    };

    loginModel.prototype.register_action = function () {
      console.log("register_action is activated");
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
