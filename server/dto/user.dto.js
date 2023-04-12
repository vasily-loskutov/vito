module.exports = class UserDto {
  email;
  id;
  name;
  isActivated;
  isAdmin;
  constructor(model) {
    console.log('model===', model)
    this.email = model.email;
    this.id = model.id;
    this.name = model.name;
    this.isActivated = model.isActivated;
    this.isAdmin = model.isAdmin;
  }
};
