// in this file you can append custom step methods to 'I' object

module.exports = async function() {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    async login(username, password) {
      await this.fillField('Username', username);
      await this.fillField('Password', password);
      await this.click('Login');
    },
  });
}
