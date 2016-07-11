var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var utilities = require("utils/utils");
var permissions = require("nativescript-permissions");
var connectivity = require("connectivity");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var base_url = "http://inkdpd.obsessive.tech";
var loader = new LoadingIndicator();
var page,self;
function chatLoaded(args) {
  page = args.object;
  var chatModel = (function (_super) {
    __extends( chatModel, _super);
    function chatModel() {
      _super.call(this);
      self=this;
      self.bootstrap();
      self.get_permissions();
      self.chat_dummy_content();
    }

    chatModel.prototype.bootstrap = function () {
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

    chatModel.prototype.get_permissions = function () {
      console.log("get_permissions is activated");
      self.internet_permission();
    };

    chatModel.prototype.internet_permission = function () {
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

    chatModel.prototype.read_permission = function () {
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

    chatModel.prototype.write_permission = function () {
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

    chatModel.prototype.network_permission = function () {
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

    chatModel.prototype.connect = function () {
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

    chatModel.prototype.chat_dummy_content = function () {
      console.log("chat_dummy_content is activated");
      self.set("chat_items",[
        { "chat_item_icon_text":"AR",
        "chat_item_name":"ABHIJITH REDDY",
        "chat_item_content":"Ink Flow is released",
        "chat_item_date_day":"1 JULY 2016 2:30 PM"},
        { "chat_item_icon_text":"RG",
        "chat_item_name":"random guy 1",
        "chat_item_content":"This app is awesome",
        "chat_item_date_day":"1 JULY 2016 2:32 PM"},
        { "chat_item_icon_text":"RG",
        "chat_item_name":"random guy 2",
        "chat_item_content":"It is rocking!!!",
        "chat_item_date_day":"1 JULY 2016 2:33 PM"},
        { "chat_item_icon_text":"ZM",
        "chat_item_name":"random guy 3",
        "chat_item_content":"dummy content",
        "chat_item_date_day":"1 JULY 2016 2:34 PM"},
        { "chat_item_icon_text":"RG",
        "chat_item_name":"random guy 4",
        "chat_item_content":"You guys are awesome",
        "chat_item_date_day":"1 JULY 2016 2:35 PM"},
        { "chat_item_icon_text":"RG",
        "chat_item_name":"random guy 5",
        "chat_item_content":"We should meet",
        "chat_item_date_day":"1 JULY 2016 2:36 PM"}
      ]);
    };

    return chatModel;
  })(observable.Observable);
  page.bindingContext = new chatModel();
}

exports.chatLoaded = chatLoaded;

exports.chatUnLoaded = function(){
  console.log("chatUnLoaded is activated");
  utilities.GC();
};

exports.chat_item_tap = function(args){
  console.log('Clicked item with index ' + args.index);

};
