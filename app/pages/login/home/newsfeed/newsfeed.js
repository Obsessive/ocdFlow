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
      self.setup_ui();
      self.newsfeed_dummy_content();
    }

    newsfeedModel.prototype.setup_ui = function () {
      console.log("setup_ui is activated");
      //Required for slides
      page.getViewById("slider_id").interval = "5000";
      page.getViewById("slider_id").startSlideshow();

      //test
      //page.getViewById("header_id").constructView();
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
