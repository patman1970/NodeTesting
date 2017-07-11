var _ = require("underscore")._; //must run: npm install underscore --save
//NOTE: ._ is the actual libary of "underscore" that is a "function name"
//      you can call directly to short-hand your API calls below.

var MembershipApplication = function(args) {

  //Instead of doing this line, use underscore..
  //assert.ok(args.first && args.last, "Need first and last name!");
  _.extend(this,args);
  // /\ takes all args and copies into a local this. object
  //    so this next line (or lines) doesn't need to be done:
  //this.first = args.first;  //args is a passed in object
  //
  this.nameIsValid = function() {
    //this checks non-null (ie this.first) and 1+ chars
    return this.first && this.first.length > 0 &&
      this.last && this.last.length > 0;
  };

  this.emailIsValid = function () {
    var iAtIsAt = this.email.indexOf("@");
    var bHasAt = (this.email && iAtIsAt > 1);

    return bHasAt && this.email.length > 3 &&
      this.email.indexOf(".", iAtIsAt) > 0; //must have dot after the "@"
  };

  this.heightIsValid = function() {
    //must be over 5 feet, but under 6.5 for a rocket:
    return this.height && this.height > 60 && this.height < 75;
  };

  this.weightIsValid = function() {
    //must be over 100 lbs or under 300 lbs
    return this.weight && this.weight > 100 && this.weight < 300;
  };

  this.ageIsValid = function() {
    //must be over 15 and under 100 years of age
    return this.age && this.age > 15 && this.age < 100;
  };

  this.isValid = function() {
    return this.nameIsValid() && this.emailIsValid() &&
      this.heightIsValid() && this.weightIsValid() &&
      this.ageIsValid();
  };

}; //end MembershipApplication()

module.exports = MembershipApplication;
