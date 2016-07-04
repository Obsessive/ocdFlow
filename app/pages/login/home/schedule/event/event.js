var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var page,self;
function eventLoaded(args) {
  page = args.object;
  var eventModel = (function (_super) {
    __extends( eventModel, _super);
    function eventModel() {
      _super.call(this);
      self=this;
    }

    return eventModel;
  })(observable.Observable);
  page.bindingContext = new eventModel();
}

exports.eventLoaded = eventLoaded;

exports.eventUnLoaded = function(){
  console.log("eventUnLoaded is activated");
};
