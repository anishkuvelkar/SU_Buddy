// userClasses.js

class BasicUser {
    constructor(user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.status = user.status;
      this.dateOfBirth = user.dateOfBirth;
      this.gender = user.gender;
      this.department = user.department;
      this.subject = user.subject;
      this.email = user.email;
      this.country = user.country;
      this.about = user.about;
      this.graduationYear = user.graduationYear;
    }
  }
  
  class Student extends BasicUser {
    constructor(user) {
      super(user);
      this.status = 'student';
    }
  }
  
  class Alumni extends BasicUser {
    constructor(user) {
      super(user);
      this.status = 'alumni';

    }
  }
  
  export { BasicUser, Student, Alumni };
  