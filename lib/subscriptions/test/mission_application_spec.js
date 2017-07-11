//This uses mocha syntax to do a test
var assert = require("assert");
var moment = require("moment"); //<- used for time "add days"
var MembershipApplication = require("../membership_application.js");

describe("Applying for a mission, membership application requirements:", function () {
  var validApp; //<- tracks state
  before(function() { //before is a mocha function fired before your test
    //arrange the data here - return an object:
    validApp = new MembershipApplication({
      first: "Test", last: "User",
      email: "test@test.com",
      age: 30, height: 66,
      weight: 180,
      validUntil: moment().add(30, "days").calendar()
    });
  });

  describe("An application is valid if...", function() {
    it("All of the following validations are successful", function() {
      //NOTE: isValid is a function of MembershipApplication object
      //      or the require(../membership_application.js) include
      assert(validApp.isValid(), "However, one of the following is invalid");
    });
    it("eMail is 4 or chars and contains an @ followed by a . (dot)", function() {
      assert(validApp.emailIsValid(), "eMail is not valid");
    });
    it("height is between 5 and 6.5 ft (60-75 inches)", function() {
      assert(validApp.heightIsValid(), "Height is not valid for this mission");
    });
    it("age is over 15 and below 100 years", function() {
      assert(validApp.ageIsValid(), "Age is not valid for this mission");
    });
    it("weight is over 100 and below 300 lbs", function() {
      assert(validApp.weightIsValid(), "Weight is not valid for this mission");
    });
    it("first and last name are provided", function() {
      assert(validApp.nameIsValid(), "Name supplied is not valid");
    });
    it("application validUntil date is not expired (past 30d)", function() {
      assert(!validApp.validIsExpired(), "ValidUntil date is expired: "
        + moment(validApp.validUntil).format('LL') );
    });
  });

  describe("Application is invalid if...", function() {
    it ("eMail is 4 characters or less", function() {
      var appTest = new MembershipApplication({email:"dd"});
      assert(!appTest.emailIsValid());
    });
    it ("eMail is missing a @ followed by a . (dot)", function() {
      var appTest = new MembershipApplication({email:"dd:dd"});
      assert(!appTest.emailIsValid());
    });
    it("height is under 60 inches (5 ft)", function() {
      var appTest = new MembershipApplication({height:59});
      assert(!appTest.heightIsValid());
    });
    it("age is 15 years of age or under", function() {
      var appTest = new MembershipApplication({age:15});
      assert(!appTest.ageIsValid());
    });
    it("weight is at or over 300 lbs", function() {
      var appTest = new MembershipApplication({weight:300});
      assert(!appTest.weightIsValid());
    });
    it("first or last name is missing", function() {
      var appTest = new MembershipApplication({first:"Pat", last:""});
      assert(!appTest.nameIsValid());
    });
    //Added time test:
    it("is past the validUntil date (30d)", function() {
      var appTest = new MembershipApplication({validUntil: "1/1/2018"});
      assert(!appTest.validIsExpired());
    });

  })

});
