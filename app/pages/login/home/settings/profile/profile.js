var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var page;
function profileLoaded(args) {
  page = args.object;
  var profileModel = (function (_super) {
    __extends( profileModel, _super);
    function profileModel() {
      _super.call(this);
      self=this;
    }

    return profileModel;
  })(observable.Observable);
  page.bindingContext = new profileModel();
}

exports.profileLoaded = profileLoaded;

exports.profileUnLoaded = function(){
  console.log("profileUnLoaded is activated");
};
