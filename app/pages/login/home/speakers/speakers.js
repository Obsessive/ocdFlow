var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var utilities = require("utils/utils");
var page,self;
function speakersLoaded(args) {
  page = args.object;
  var speakersModel = (function (_super) {
    __extends( speakersModel, _super);
    function speakersModel() {
      _super.call(this);
      self=this;
      self.speakers_dummy_content();
    }

    speakersModel.prototype.speakers_dummy_content = function () {
      console.log("speakers_dummy_content is activated");
      self.set("speaker_items",[
        { "speaker_item_name":"Dummy Speaker 1",
        "speaker_item_talk":"Ink Flow is up and running",
        "speaker_item_image":"http://zblogged.com/wp-content/uploads/2015/11/5.png"},
        { "speaker_item_name":"Random Speaker 2",
        "speaker_item_talk":"This app is awesome",
        "speaker_item_image":"https://pixabay.com/static/uploads/photo/2015/03/03/08/55/portrait-photography-657116_960_720.jpg"},
        { "speaker_item_name":"random guy 2",
        "speaker_item_talk":"topic: Big data/Hadoop",
        "speaker_item_image":"https://upload.wikimedia.org/wikipedia/en/8/87/Mani_Zadeh_Profile.jpg"},
        { "speaker_item_name":"ZEESHAN MOHAMMED",
        "speaker_item_talk":"dummy speaker content",
        "speaker_item_image":"http://www.fine-arts-print.com/wp-content/uploads/2014/10/Martin-Profile.jpg"},
        { "speaker_item_name":"random guy 3",
        "speaker_item_talk":"You guys are awesome",
        "speaker_item_image":"https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":""},{ "speaker_item_name":"ABHIJITH REDDY",
        "speaker_item_talk":"Ink Flow is released",
        "speaker_item_image":"https://upload.wikimedia.org/wikipedia/commons/f/f6/Barack_Obama_and_Bill_Clinton_profile.jpg"},
        { "speaker_item_name":"random guy 1",
        "speaker_item_talk":"This app is awesome",
        "speaker_item_image":"http://i.imgur.com/gyjVLLp.jpg"},
        { "speaker_item_name":"random guy 2",
        "speaker_item_talk":"UI demo.",
        "speaker_item_image":"http://orig10.deviantart.net/b883/f/2007/035/b/c/female_face_profile_stock_by_enchantedgal_stock.jpg"},
        { "speaker_item_name":"ZEESHAN MOHAMMED",
        "speaker_item_talk":"dummy speaker content",
        "speaker_item_image":"http://previews.123rf.com/images/domenicogelermo/domenicogelermo0910/domenicogelermo091000229/5769519-Profile-portrait-of-smiling-woman-s-face-with-clean-pure-skin-over-white-background-Stock-Photo.jpg"},
        { "speaker_item_name":"random guy 3",
        "speaker_item_talk":"You guys are awesome",
        "speaker_item_image":"http://image.shutterstock.com/z/stock-photo-woman-profile-portrait-in-studio-134158952.jpg"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"https://bloggojane.files.wordpress.com/2013/02/drew-barrymore-profile-malibu-1993.jpg"},{ "speaker_item_name":"ABHIJITH REDDY",
        "speaker_item_talk":"Ink Flow is released",
        "speaker_item_image":"http://www.shutterstock.com/blog/wp-content/uploads/sites/5/2015/10/shutterstock_147173813.jpg"},
        { "speaker_item_name":"random guy 1",
        "speaker_item_talk":"This app is awesome",
        "speaker_item_image":"http://zblogged.com/wp-content/uploads/2015/11/17.jpg"},
        { "speaker_item_name":"random guy 2",
        "speaker_item_talk":"It is rocking!!!",
        "speaker_item_image":"http://image.shutterstock.com/z/stock-photo-beauty-portrait-of-young-smiling-girl-in-profile-with-blond-hair-isolated-on-white-background-115152049.jpg"},
        { "speaker_item_name":"ZEESHAN MOHAMMED",
        "speaker_item_talk":"dummy speaker content",
        "speaker_item_image":"http://thumbs.dreamstime.com/z/beautiful-profile-face-young-woman-clean-fresh-skin-40988715.jpghttp://image.shutterstock.com/z/stock-photo-profile-of-beautiful-young-woman-s-face-with-clean-healthy-skin-56254405.jpg"},
        { "speaker_item_name":"random guy 3",
        "speaker_item_talk":"You guys are awesome",
        "speaker_item_image":"http://www.melbourneresumes.com.au/wp-content/uploads/best-linkedin-profile-examples-300x200.jpg"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"https://s-media-cache-ak0.pinimg.com/736x/2f/69/bf/2f69bf2bbee52478bf19e27afb134a12.jpg"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"http://naradanews.com/wp-content/uploads/2016/05/3abcdd9934cb05df92c11ff019879004-e1464412639104.jpg"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"http://images.indianexpress.com/2015/11/anurag-thakur.jpg"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"http://media2.intoday.in/indiatoday/images/stories/profile-anurag-jun6-1_647_052616031835.jpg"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"https://pbs.twimg.com/profile_images/1731485432/justin-profile-face.jpg"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"https://www.cloudboost.io/images/profilepic1.png"},
        { "speaker_item_name":"random guy 4",
        "speaker_item_talk":"Dummy topic",
        "speaker_item_image":"https://www.exchangewire.com/wp-content/uploads/2013/10/Profile-Pic.png"}
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

};
