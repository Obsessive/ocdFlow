var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var listViewModule = require("ui/list-view");
var animate = require("ui/animation");
var utilities = require("utils/utils");
var permissions = require("nativescript-permissions");
var connectivity = require("connectivity");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var base_url = "http://inkdpd.obsessive.tech";
var loader = new LoadingIndicator();
var page,self;
function scheduleLoaded(args) {
  page = args.object;
  var scheduleModel = (function (_super) {
    __extends( scheduleModel, _super);
    function scheduleModel() {
      _super.call(this);
      self=this;
      self.bootstrap();
      self.get_permissions();
      self.schedule_dummy_content();
      self.setup_events();
    }

    scheduleModel.prototype.bootstrap = function () {
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

    scheduleModel.prototype.get_permissions = function () {
      console.log("get_permissions is activated");
      self.internet_permission();
    };

    scheduleModel.prototype.internet_permission = function () {
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

    scheduleModel.prototype.read_permission = function () {
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

    scheduleModel.prototype.write_permission = function () {
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

    scheduleModel.prototype.network_permission = function () {
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

    scheduleModel.prototype.connect = function () {
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

    scheduleModel.prototype.setup_events = function () {
      console.log("setup_events is activated");
      page.getViewById("schedule_id").on(listViewModule.ListView.loadMoreItemsEvent, function (data) {
        console.log("loadmore");
      });
    };

    scheduleModel.prototype.loadmore = function () {
      console.log("loadmore");
    };

    scheduleModel.prototype.schedule_dummy_content = function () {
      console.log("schedule_dummy_content is activated");
      self.set("schedule_items",[
        { "schedule_item_day_start_time":"SUNDAY 10:00",
        "schedule_item_title_of_talk":"KEYNOTE",
        "schedule_item_start_to_end_time_location":"10:00 AM - 1:45 PM - BANGALORE"},
        { "schedule_item_day_start_time":"MONDAY 2:00",
        "schedule_item_title_of_talk":"WEBSITE BUILDER",
        "schedule_item_start_to_end_time_location":"10:00 AM - 1:45 PM - BANGALORE"},
        { "schedule_item_day_start_time":"TUESDAY 11:30",
        "schedule_item_title_of_talk":"SLACK WORKSHOP",
        "schedule_item_start_to_end_time_location":"11:30 AM - 2:25 PM - BANGALORE"},
        { "schedule_item_day_start_time":"WEDNESDAY 9:00",
        "schedule_item_title_of_talk":"DIGITAL OCEAN",
        "schedule_item_start_to_end_time_location":"9:00 AM - 1:45 PM - BANGALORE"},
        { "schedule_item_day_start_time":"THURSDAY 1:15",
        "schedule_item_title_of_talk":"ROOT CONF",
        "schedule_item_start_to_end_time_location":"1:15 PM - 3:30 PM - BANGALORE"},
        { "schedule_item_day_start_time":"FRIDAY 5:30",
        "schedule_item_title_of_talk":"LINUX LABS",
        "schedule_item_start_to_end_time_location":"5:30 PM - 7:45 PM - BANGALORE"},
        { "schedule_item_day_start_time":"SATURDAY 2:25",
        "schedule_item_title_of_talk":"SAP SOLUTIONS",
        "schedule_item_start_to_end_time_location":"2:25 PM - 4:50 PM - BANGALORE"}
      ]);
    };

    return scheduleModel;
  })(observable.Observable);
  page.bindingContext = new scheduleModel();
}


exports.scheduleLoaded = scheduleLoaded;

exports.scheduleUnLoaded = function(){
  console.log("scheduleUnLoaded is activated");
  utilities.GC();
};

exports.schedule_item_tap = function(args){
  console.log('Clicked item with index ' + args.index);
  var navigationEntry = {
    moduleName: "pages/login/home/schedule/event/event",
    animated: true,
    transition: {name:"slideLeft"}
  };
  FrameModule.topmost().navigate(navigationEntry);
};

exports.schedule_load_more_event = function(args){
  console.log('schedule_load_more_event is activated');

};
