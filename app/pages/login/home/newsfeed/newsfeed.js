var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var utilities = require("utils/utils");
var Fresco = require("nativescript-fresco");
var Slides = require("nativescript-slides/nativescript-slides");
var page,self;
var imageuris = [
  "http://i4g.gr/w/wp-content/uploads/2015/06/aws.png",
  "http://www.ishafoundation.org/templates/isha/homeslider/About-us-Sadhguru.jpg",
  "http://newyorkdigit.com/wp-content/uploads/2015/08/google-alphabet-inc.jpg",
  "http://www.designfinder.net/uploads/gallery/design-business-card-506.jpg"
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
        "news_feed_item_speaker_name":"Zeeshan Mohammed",
        "news_feed_item_content":"Post to feed feature is still to come",
        "news_feed_item_day_time":"1 JULY 2016 at 2:34 PM"},
        { "news_feed_item_speaker_icon":"RG",
        "news_feed_item_speaker_name":"Random Guy 3",
        "news_feed_item_content":"You guys are awesome",
        "news_feed_item_day_time":"1 JULY 2016 at 2:35 PM"},
        { "news_feed_item_speaker_icon":"RG",
        "news_feed_item_speaker_name":"Random Guy 4",
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
      var image = new Fresco.FrescoDrawee();
      image.width = "100%";
      image.height = "150";
      image.actualImageScaleType = "fitXY";
      image.placeholderImageUri = "~/images/emptyplaceholder.jpg";
      image.failureImageUri = "~/images/errorplaceholder.png";
      image.progressiveRenderingEnabled = "true";
      image.imageUri = imageuris[i];
      slide.addChild(image);
      slideContainer.addChild(slide);
    }
    slideContainer.loop = "true";
    slideContainer.disablePan = "true";
  }
  console.log(slideContainer._childrenCount);
};

exports.onChanged = function(args){
	var data = args.eventData;
	console.log("Changed: " + JSON.stringify(data));
}
