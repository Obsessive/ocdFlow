var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var page,self;
function contactLoaded(args) {
  page = args.object;
  var contactModel = (function (_super) {
    __extends( contactModel, _super);
    function contactModel() {
      _super.call(this);
      self=this;
    }

    return contactModel;
  })(observable.Observable);
  page.bindingContext = new contactModel();
}

exports.contactLoaded = contactLoaded;

exports.contactUnLoaded = function(){
  console.log("contactUnLoaded is activated");
};
