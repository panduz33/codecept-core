const { I } = inject();

module.exports = {

  // insert your locators and methods here
  fields : {
    username : 'Username',
    password : 'Password'
  },

  info : {
    usernameList : '#login_credentials',
    passwordList : '$login-password',
    errorMessage : '$error'
  },

  buttons : {
    login : 'Login'
  },

  // Methods
  /**
   * 
   * @param {Number} userOption 
   * user option selection from 1-6
   * @returns {String} username
   */
  async getUsernameList(userOption) {
    const userList = await I.grabTextFrom(this.info.usernameList);
    return (userList.split('\n'))[userOption];
  },

  async getPassword() {
    const passwordList = await I.grabTextFrom(this.info.passwordList);
    return passwordList.split('\n')[1];
  },

  async fillLoginForm(username, password) {
    I.fillField(this.fields.username, username);
    I.fillField(this.fields.password, password);
    I.click(this.buttons.login);
  },

  async getErrorMessage(){
    return await I.grabTextFrom(this.info.errorMessage);
  }
}
