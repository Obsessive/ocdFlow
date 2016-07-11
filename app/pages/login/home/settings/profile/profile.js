var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var Platform = require("platform");
var permissions = require("nativescript-permissions");
var connectivity = require("connectivity");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var base_url = "http://inkdpd.obsessive.tech";
var loader = new LoadingIndicator();
var page;
var isEdit = false;
function profileLoaded(args) {
  page = args.object;
  var profileModel = (function (_super) {
    __extends( profileModel, _super);
    function profileModel() {
      _super.call(this);
      self=this;
      self.bootstrap();
      self.get_permissions();
      self.dummy_content();
    }

    newsfeedModel.prototype.bootstrap = function () {
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

      self.set("edit_done_toggle","\uf040");
      self.set("editpage",false);
    };

    newsfeedModel.prototype.get_permissions = function () {
      console.log("get_permissions is activated");
      self.internet_permission();
    };

    newsfeedModel.prototype.internet_permission = function () {
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

    newsfeedModel.prototype.read_permission = function () {
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

    newsfeedModel.prototype.write_permission = function () {
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

    newsfeedModel.prototype.network_permission = function () {
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

    newsfeedModel.prototype.connect = function () {
      console.log("connect is activated");
      var connectionType = connectivity.getConnectionType();
      switch (connectionType) {
        case connectivity.connectionType.none:
        alert("Form saved. Please sync when internet is available!");
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

    profileModel.prototype.profil_edit_action = function () {
      console.log("hide_show_edit is activated");
      if (isEdit == true) {
        isEdit = false;
        self.set("edit_done_toggle","\uf040");
        self.set("editpage",false);
        self.enable_text_edit(false);
      }else if (isEdit == false) {
        isEdit = true;
        self.set("edit_done_toggle","\uf00c ");
        self.set("editpage",true);
        self.enable_text_edit(true);
      }
    };

    profileModel.prototype.dummy_content = function () {
      console.log("dummy_contest is activated");
      self.set("profile_icon_text","AR");
      self.set("profile_first_name","ABHIJITH");
      self.set("profile_last_name","REDDY");
      self.set("profile_position","CEO at you know where");
      self.set("profile_email","dummy@email.com");
      self.set("profile_phone","9999999999");
      self.set("profile_about_me","");
      self.set("profile_edit_save","EDIT")
    };

    profileModel.prototype.first_name_edit_action = function () {
      console.log("first_name_edit_action is activated");
      page.getViewById("first_name_edit_id").focus();
    };

    profileModel.prototype.last_name_edit_action = function () {
      console.log("last_name_edit_action is activated");
      page.getViewById("last_name_edit_id").focus();
    };

    profileModel.prototype.position_edit_action = function () {
      console.log("position_edit_action is activated");
      page.getViewById("position_edit_id").focus();
    };

    profileModel.prototype.email_edit_action = function () {
      console.log("email_edit_action is activated");
      page.getViewById("email_edit_id").focus();
    };

    profileModel.prototype.phone_edit_action = function () {
      console.log("phone_edit_action is activated");
      page.getViewById("phone_edit_id").focus();
    };

    profileModel.prototype.about_me_edit_action = function () {
      console.log("about_me_edit_action is activated");
      page.getViewById("about_me_edit_id").focus();
    };

    profileModel.prototype.enable_text_edit = function (bool) {
      console.log("enable_text_edit is activated");
        page.getViewById("first_name_edit_id").editable = bool;
        page.getViewById("last_name_edit_id").editable = bool;
        page.getViewById("position_edit_id").editable = bool;
        page.getViewById("email_edit_id").editable = bool;
        page.getViewById("phone_edit_id").editable = bool;
        page.getViewById("about_me_edit_id").editable = bool;
    };

    return profileModel;
  })(observable.Observable);
  page.bindingContext = new profileModel();
}

exports.profileLoaded = profileLoaded;

exports.profileUnLoaded = function(){
  console.log("profileUnLoaded is activated");
};
