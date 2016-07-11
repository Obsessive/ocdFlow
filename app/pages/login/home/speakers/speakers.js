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
function speakersLoaded(args) {
  page = args.object;
  var speakersModel = (function (_super) {
    __extends( speakersModel, _super);
    function speakersModel() {
      _super.call(this);
      self=this;
      self.bootstrap();
      self.get_permissions();
      self.speakers_dummy_content();
    }

    speakersModel.prototype.bootstrap = function () {
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

    speakersModel.prototype.get_permissions = function () {
      console.log("get_permissions is activated");
      self.internet_permission();
    };

    speakersModel.prototype.internet_permission = function () {
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

    speakersModel.prototype.read_permission = function () {
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

    speakersModel.prototype.write_permission = function () {
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

    speakersModel.prototype.network_permission = function () {
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

    speakersModel.prototype.connect = function () {
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

    speakersModel.prototype.speakers_dummy_content = function () {
      console.log("speakers_dummy_content is activated");
      self.set("speaker_items",[
        { "speaker_item_name":"Nandini Ashok",
        "speaker_item_talk":"Talk on PHP",
        "speaker_item_image":"http://inktalks-prod.s3.amazonaws.com/files/user/37/originals/Nandini_Ashik.jpg",
        "speaker_item_twitter_id":"@nandiniashok",
        "speaker_item_position":"EXECUTIVE DIRECTOR - OPERATIONS + ATTENDEE RELATIONS"},
        { "speaker_item_name":"Rajat Hardi",
        "speaker_item_talk":"Talk on website building",
        "speaker_item_image":"http://inktalks-prod.s3.amazonaws.com/files/user/23499/thumbnails/large_Rajat.png",
        "speaker_item_twitter_id":"@rajathardi",
        "speaker_item_position":"PROGRAM COORDINATOR, INK MAKERS & INK STREAM"},
        { "speaker_item_name":"Lakshmi Pratury",
        "speaker_item_talk":"topic: Big data/Hadoop",
        "speaker_item_image":"http://inktalks-prod.s3.amazonaws.com/files/user/282/thumbnails/large_Lakshmi-Pratury-web.jpg",
        "speaker_item_twitter_id":"@lakshmipratury",
        "speaker_item_position":"FOUNDER, HOST , CURATOR"},
        { "speaker_item_name":"Meghna Ashok",
        "speaker_item_talk":"performance",
        "speaker_item_image":"http://inktalks-prod.s3.amazonaws.com/files/user/1529/thumbnails/large_Meghna_Ashok.jpg",
        "speaker_item_twitter_id":"@meghnaashok",
        "speaker_item_position":"SPEAKER MANAGEMENT"},
        { "speaker_item_name":"random guy 3",
        "speaker_item_talk":"memory management",
        "speaker_item_image":"https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"ABHIJITH REDDY",
        "speaker_item_talk":"Ink Flow is released",
        "speaker_item_image":"https://upload.wikimedia.org/wikipedia/commons/f/f6/Barack_Obama_and_Bill_Clinton_profile.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 1",
        "speaker_item_talk":"This app is awesome",
        "speaker_item_image":"http://i.imgur.com/gyjVLLp.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 2",
        "speaker_item_talk":"UI demo.",
        "speaker_item_image":"http://orig10.deviantart.net/b883/f/2007/035/b/c/female_face_profile_stock_by_enchantedgal_stock.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 3",
        "speaker_item_talk":"dummy speaker content",
        "speaker_item_image":"http://previews.123rf.com/images/domenicogelermo/domenicogelermo0910/domenicogelermo091000229/5769519-Profile-portrait-of-smiling-woman-s-face-with-clean-pure-skin-over-white-background-Stock-Photo.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 3",
        "speaker_item_talk":"You guys are awesome",
        "speaker_item_image":"http://image.shutterstock.com/z/stock-photo-woman-profile-portrait-in-studio-134158952.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"https://bloggojane.files.wordpress.com/2013/02/drew-barrymore-profile-malibu-1993.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},{ "speaker_item_name":"ABHIJITH REDDY",
        "speaker_item_talk":"Ink Flow is released",
        "speaker_item_image":"http://www.shutterstock.com/blog/wp-content/uploads/sites/5/2015/10/shutterstock_147173813.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 1",
        "speaker_item_talk":"This app is awesome",
        "speaker_item_image":"http://zblogged.com/wp-content/uploads/2015/11/17.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 2",
        "speaker_item_talk":"It is rocking!!!",
        "speaker_item_image":"http://image.shutterstock.com/z/stock-photo-beauty-portrait-of-young-smiling-girl-in-profile-with-blond-hair-isolated-on-white-background-115152049.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy again",
        "speaker_item_talk":"dummy speaker content",
        "speaker_item_image":"http://thumbs.dreamstime.com/z/beautiful-profile-face-young-woman-clean-fresh-skin-40988715.jpghttp://image.shutterstock.com/z/stock-photo-profile-of-beautiful-young-woman-s-face-with-clean-healthy-skin-56254405.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 3",
        "speaker_item_talk":"You guys are awesome",
        "speaker_item_image":"http://www.melbourneresumes.com.au/wp-content/uploads/best-linkedin-profile-examples-300x200.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"https://s-media-cache-ak0.pinimg.com/736x/2f/69/bf/2f69bf2bbee52478bf19e27afb134a12.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"http://naradanews.com/wp-content/uploads/2016/05/3abcdd9934cb05df92c11ff019879004-e1464412639104.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"http://images.indianexpress.com/2015/11/anurag-thakur.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"http://media2.intoday.in/indiatoday/images/stories/profile-anurag-jun6-1_647_052616031835.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"https://pbs.twimg.com/profile_images/1731485432/justin-profile-face.jpg",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"https://www.cloudboost.io/images/profilepic1.png",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"https://www.exchangewire.com/wp-content/uploads/2013/10/Profile-Pic.png",
        "speaker_item_twitter_id":"@randomtwitterid",
        "speaker_item_position":"CEO at xyz"}
      ]);
    };

    return speakersModel;
  })(observable.Observable);
  page.bindingContext = new speakersModel();
}

exports.speakersLoaded = speakersLoaded;

exports.speakersUnLoaded = function(){
  console.log("speakersUnLoaded is activated");
  utilities.GC();
};

exports.speaker_item_tap = function(args){
  console.log('Clicked item with index ' + args.index);
  var navigationEntry = {
    moduleName: "pages/login/home/speakers/details/details",
    animated: true,
    transition: {name:"slideLeft"}
  };
  FrameModule.topmost().navigate(navigationEntry);
};

exports.twitter_handler_action = function(args){
  console.log('Twitter item with index ' + args.object.bindingContext);

};
