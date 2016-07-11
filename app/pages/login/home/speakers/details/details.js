var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var permissions = require("nativescript-permissions");
var connectivity = require("connectivity");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var base_url = "http://inkdpd.obsessive.tech";
var loader = new LoadingIndicator();
var page,self;
function detailsLoaded(args) {
  page = args.object;
  var detailsModel = (function (_super) {
    __extends( detailsModel, _super);
    function detailsModel() {
      _super.call(this);
      self=this;
      self.bootstrap();
      self.get_permissions();
      self.dummy_content();
    }

    detailsModel.prototype.bootstrap = function () {
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

    detailsModel.prototype.get_permissions = function () {
      console.log("get_permissions is activated");
      self.internet_permission();
    };

    detailsModel.prototype.internet_permission = function () {
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

    detailsModel.prototype.read_permission = function () {
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

    detailsModel.prototype.write_permission = function () {
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

    detailsModel.prototype.network_permission = function () {
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

    detailsModel.prototype.connect = function () {
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

    detailsModel.prototype.details_call_action = function () {
      console.log("details_call_action is activated");
    };

    detailsModel.prototype.details_mail_action = function () {
      console.log("details_mail_action is activated");
    };

    detailsModel.prototype.details_twitter_action = function () {
      console.log("details_twitter_action is activated");
    };

    detailsModel.prototype.dummy_content = function () {
      console.log("dummy_contest is activated");
      self.set("details_speaker_name","ABHIJITH REDDY");
      // page.getViewById("details_speaker_icon_text_id").text = "A.R";
      self.set("details_speaker_icon_text","AR");
      self.set("details_speaker_image","https://www.shoptab.net/blog/wp-content/uploads/2014/07/profile-circle.png");
      self.set("details_speaker_position","CEO at you where");
      self.set("details_speaker_talk_title","StartUp Story");
      self.set("details_speaker_talk_details"," Welcome to the first lecture, Introduction to Haptics. In this lecture, I hope to motivate the good features, as well as the drawbacks of the human sense of touch, as well as talk about why haptic technology is useful and also challenging. So these pictures are showing some of the people, in my laboratory, at Stanford University, engaging in some haptic interactions. Sometimes they're interacting with inanimate objects, like a pencil, a notepad. Sometimes they're interacting with other people or animals. They are sensing forces. They are sensing tactile information, on the skin, as well as temperature.");
      //self.set("","");
      //self.set("","");
    };

    return detailsModel;
  })(observable.Observable);
  page.bindingContext = new detailsModel();
}

exports.detailsLoaded = detailsLoaded;

exports.detailsUnLoaded = function(){
  console.log("detailsUnLoaded is activated");
};
