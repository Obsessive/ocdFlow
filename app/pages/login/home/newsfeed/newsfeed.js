var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var utilities = require("utils/utils");
var imageCache = require("nativescript-web-image-cache");
var Slides = require("nativescript-slides/nativescript-slides");
var imageCacheModule = require("ui/image-cache");
var imageSource = require("image-source");
var ImageModule = require("ui/image");
var enumsModule = require("ui/enums");
var permissions = require("nativescript-permissions");
var connectivity = require("connectivity");
var fetchModule = require("fetch");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var base_url = "http://inkdpd.obsessive.tech";
var loader = new LoadingIndicator();
var page,self,currentSlide=0;
var imageurissample = [
  "http://i4g.gr/w/wp-content/uploads/2015/06/aws.png",
  "http://www.ishafoundation.org/templates/isha/homeslider/About-us-Sadhguru.jpg",
  "http://newyorkdigit.com/wp-content/uploads/2015/08/google-alphabet-inc.jpg",
  "http://www.designfinder.net/uploads/gallery/design-business-card-506.jpg"
];
var imageuris = [
  "~/images/aws.png",
  "~/images/About-us-Sadhguru.jpg",
  "~/images/google-alphabet-inc.jpg",
  "~/images/design-business-card-506.jpg"
];
function newsfeedLoaded(args) {
  page = args.object;
  var newsfeedModel = (function (_super) {
    __extends( newsfeedModel, _super);
    function newsfeedModel() {
      _super.call(this);
      self=this;
      self.bootstrap();
      self.get_permissions();
      self.newsfeed_dummy_content();
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

      page.getViewById("slider_id").interval = "5000";
      page.getViewById("slider_id").startSlideshow();
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

    newsfeedModel.prototype.newsfeed_dummy_content = function () {
      console.log("newsfeed_dummy_content is activated");
      self.set("news_feed_items",[
        { "news_feed_item_speaker_icon":"AR",
        "news_feed_item_speaker_name":"Abhijith Reddy",
        "news_feed_item_content":"This is the demo ui of the news feed.",
        "news_feed_item_day_time":"1 JULY 2016 at 2:30 PM"},
        { "news_feed_item_speaker_icon":"RG",
        "news_feed_item_speaker_name":"Random Guy 1",
        "news_feed_item_content":"Cleary more work is required",
        "news_feed_item_day_time":"1 JULY 2016 at 2:32 PM"},
        { "news_feed_item_speaker_icon":"RG",
        "news_feed_item_speaker_name":"Random Guy 2",
        "news_feed_item_content":"Yes.. It's work in progress",
        "news_feed_item_day_time":"1 JULY 2016 at 2:33 PM"},
        { "news_feed_item_speaker_icon":"ZM",
        "news_feed_item_speaker_name":"Random Guy 3",
        "news_feed_item_content":"Post to feed feature is still to come",
        "news_feed_item_day_time":"1 JULY 2016 at 2:34 PM"},
        { "news_feed_item_speaker_icon":"RG",
        "news_feed_item_speaker_name":"Random Guy 4",
        "news_feed_item_content":"You guys are awesome",
        "news_feed_item_day_time":"1 JULY 2016 at 2:35 PM"},
        { "news_feed_item_speaker_icon":"RG",
        "news_feed_item_speaker_name":"Random Guy 5",
        "news_feed_item_content":"We should meet",
        "news_feed_item_day_time":"1 JULY 2016 at 2:36 PM"}
      ]);
    };

    return newsfeedModel;
  })(observable.Observable);
  page.bindingContext = new newsfeedModel();
}

exports.newsfeedLoaded = newsfeedLoaded;

exports.newsfeedUnLoaded = function(){
  console.log("newsfeedUnLoaded is activated");
  page.getViewById("slider_id").stopSlideshow();
  var cache = new imageCacheModule.Cache();
  cache.clear();
  utilities.GC();
};

exports.news_feed_item_tap = function(args){
  console.log('Clicked item with index ' + args.index);
};

exports.share_handler_action = function(args){
  console.log('share is clicked' + args.object.bindingContext);

};

exports.slideLoaded = function(args){
  console.log("Loading Slides");
  var slideContainer = args.object;
  if (slideContainer._childrenCount == 0) {
    console.log("right");
    for (var i = 0; i < imageuris.length; i++) {
      var slide = new Slides.Slide();
      slide.className = "whitebackground";
      var image = new ImageModule.Image();
      image.stretch = enumsModule.Stretch.fill;
      image.className = "test";
      image.src = imageuris[i];
      slide.addChild(image);
      slideContainer.addChild(slide);
    }
    slideContainer.loop = "true";
    slideContainer.disablePan = "true";
  }
  console.log(slideContainer._childrenCount);
};

//This is what needed but is not working
// exports.slideLoaded = function(args){
//   console.log("Loading Slides");
//   var slideContainer = args.object;
//   if (slideContainer._childrenCount == 0) {
//     console.log("right");
//     for (var i = 0; i < imageuris.length; i++) {
//       var slide = new Slides.Slide();
//       slide.className = "whitebackground";
//       var image = new imageCache.WebImage();
//       image.stretch = "fill";
//       image.src = imageuris[i];
//       slide.addChild(image);
//       slideContainer.addChild(slide);
//     }
//     slideContainer.loop = "true";
//     slideContainer.disablePan = "true";
//   }
//   console.log(slideContainer._childrenCount);
// };


//This works but too slow only loaded one image in 10mins
// exports.slideLoaded = function(args){
//   console.log("Loading Slides");
//   console.log(__dirname);
//   var slideContainer = args.object;
//   if (slideContainer._childrenCount == 0) {
//     console.log("right");
//     for (var i = 0; i < imageuris.length; i++) {
//       var slide = new Slides.Slide();
//       slide.className = "whitebackground";
//       var imageElement = new ImageModule.Image();
//       var cache = new imageCacheModule.Cache();
//       cache.maxRequests = 5;
//       var imgSource = imageSource.ImageSource;
//       var url = imageuris[i];
//       // Try to read the image from the cache
//       var image = cache.get(url);
//       if (image) {
//         // If present -- use it.
//         imgSource = imageSource.fromNativeSource(image);
//         imageElement.imageSource = imgSource;
//         console.log("cache");
//       }
//       else {
//         // If not present -- request its download.
//         cache.push({
//           key: url,
//           url: url,
//           completed: function(image,key){
//             if (url === key) {
//               imgSource = imageSource.fromNativeSource(image);
//               imageElement.imageSource = imgSource;
//               console.log("online");
//             }
//           }
//         });
//       }
//       slide.addChild(imageElement);
//       slideContainer.addChild(slide);
//     }
//     slideContainer.loop = "true";
//     slideContainer.disablePan = "true";
//   }
//   console.log(slideContainer._childrenCount);
// };

exports.onChanged = function(args){
  var data = args.eventData;
  console.log("Changed: " + JSON.stringify(data));
  currentSlide = data.newIndex;
  console.log(currentSlide.toString());
}
