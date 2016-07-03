var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var page,self;
function registeralternateLoaded(args) {
  page = args.object;
  var registeralternateModel = (function (_super) {
    __extends( registeralternateModel, _super);
    function registeralternateModel() {
      _super.call(this);
      self=this;
      self.init_ui();
    }

    registeralternateModel.prototype.init_ui = function () {
      console.log("init_ui is activated");
      if (application.android) {
        page.getViewById("first_name_id").android.setHintTextColor(android.graphics.Color.parseColor("#FFFFFF"));
        page.getViewById("last_name_id").android.setHintTextColor(android.graphics.Color.parseColor("#FFFFFF"));
        page.getViewById("email_id").android.setHintTextColor(android.graphics.Color.parseColor("#FFFFFF"));
        page.getViewById("password_id").android.setHintTextColor(android.graphics.Color.parseColor("#FFFFFF"));
        page.getViewById("retype_password_id").android.setHintTextColor(android.graphics.Color.parseColor("#FFFFFF"));
        page.getViewById("phone_number_id").android.setHintTextColor(android.graphics.Color.parseColor("#FFFFFF"));
      }else if (application.ios) {
        page.getViewById("first_name_id").ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes("placeholder text", new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]));
        page.getViewById("last_name_id").ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes("placeholder text", new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]));
        page.getViewById("email_id").ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes("placeholder text", new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]));
        page.getViewById("password_id").ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes("placeholder text", new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]));
        page.getViewById("retype_password_id").ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes("placeholder text", new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]));
        page.getViewById("phone_number_id").ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes("placeholder text", new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]));
      }
    };

    return registeralternateModel;
  })(observable.Observable);
  page.bindingContext = new registeralternateModel();
}

exports.registeralternateLoaded = registeralternateLoaded;

exports.registeralternateUnLoaded = function(){
  console.log("registeralternateUnLoaded is activated");
};
