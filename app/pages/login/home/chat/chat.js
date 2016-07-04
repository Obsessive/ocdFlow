var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var utilities = require("utils/utils");
var page,self;
function chatLoaded(args) {
  page = args.object;
  var chatModel = (function (_super) {
    __extends( chatModel, _super);
    function chatModel() {
      _super.call(this);
      self=this;
      self.chat_dummy_content();
    }

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
        "chat_item_name":"ZEESHAN MOHAMMED",
        "chat_item_content":"dummy content",
        "chat_item_date_day":"1 JULY 2016 2:34 PM"},
        { "chat_item_icon_text":"RG",
        "chat_item_name":"random guy 3",
        "chat_item_content":"You guys are awesome",
        "chat_item_date_day":"1 JULY 2016 2:35 PM"},
        { "chat_item_icon_text":"RG",
        "chat_item_name":"random guy 4",
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
