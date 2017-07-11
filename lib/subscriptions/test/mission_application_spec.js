//This uses mocha syntax to do a test
var assert = require("assert");
var MembershipApplication = require("../membership_application.js");

describe("Applying for a mission, membership application requirements:", function () {
  var validApp; //<- tracks state
  before(function() { //before is a mocha function fired before your test
    //arrange the data here - return an object:
    validApp = new MembershipApplication({
      first: "Test", last: "User",
      email: "test@test.com",
      age: 30, height: 66,
      weight: 180
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
  });
});
