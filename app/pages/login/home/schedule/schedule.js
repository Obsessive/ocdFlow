var FrameModule = require("ui/frame");
var application = require("application");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var applicationprofile = require("application-settings");
var animate = require("ui/animation");
var utilities = require("utils/utils");
var page,self;
function scheduleLoaded(args) {
  page = args.object;
  var scheduleModel = (function (_super) {
    __extends( scheduleModel, _super);
    function scheduleModel() {
      _super.call(this);
      self=this;
      self.schedule_dummy_content();
    }
    scheduleModel.prototype.schedule_dummy_content = function () {
      console.log("schedule_dummy_content is activated");
      self.set("schedule_items",[
        { "schedule_item_day_start_time":"SUNDAY 10:00",
        "schedule_item_title_of_talk":"KEYNOTE",
        "schedule_item_start_to_end_time_location":"10:00 AM - 1:45 PM - BANGALORE"},
        { "schedule_item_day_start_time":"MONDAY 2:00",
        "schedule_item_title_of_talk":"WEBSITE BUILDER",
        "schedule_item_start_to_end_time_location":"10:00 AM - 1:45 PM - BANGALORE"},
        { "schedule_item_day_start_time":"TUESDAY 11:30",
        "schedule_item_title_of_talk":"SLACK WORKSHOP",
        "schedule_item_start_to_end_time_location":"11:30 AM - 2:25 PM - BANGALORE"},
        { "schedule_item_day_start_time":"WEDNESDAY 9:00",
        "schedule_item_title_of_talk":"DIGITAL OCEAN",
        "schedule_item_start_to_end_time_location":"9:00 AM - 1:45 PM - BANGALORE"},
        { "schedule_item_day_start_time":"THURSDAY 1:15",
        "schedule_item_title_of_talk":"ROOT CONF",
        "schedule_item_start_to_end_time_location":"1:15 PM - 3:30 PM - BANGALORE"},
        { "schedule_item_day_start_time":"FRIDAY 5:30",
        "schedule_item_title_of_talk":"LINUX LABS",
        "schedule_item_start_to_end_time_location":"5:30 PM - 7:45 PM - BANGALORE"},
        { "schedule_item_day_start_time":"SATURDAY 2:25",
        "schedule_item_title_of_talk":"SAP SOLUTIONS",
        "schedule_item_start_to_end_time_location":"2:25 PM - 4:50 PM - BANGALORE"}
      ]);
    };

    return scheduleModel;
  })(observable.Observable);
  page.bindingContext = new scheduleModel();
}


exports.scheduleLoaded = scheduleLoaded;

exports.scheduleUnLoaded = function(){
  console.log("scheduleUnLoaded is activated");
  utilities.GC();
};

exports.schedule_item_tap = function(args){
  console.log('Clicked item with index ' + args.index);

};
