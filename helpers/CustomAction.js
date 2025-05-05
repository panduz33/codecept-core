const { Helper } = require('codeceptjs');

class CustomAction extends Helper {
  /**
   * Mimic user-like scrolling by scrolling down in increments with delays.
   * Usage: I.scrollLikeUser(step, delay, maxScroll)
   * @param {number} step - Number of pixels to scroll each time
   * @param {number} delay - Delay in ms between scrolls
   * @param {number} maxScroll - Maximum scroll height
   */
  async userScroll(step = 300, delay = 300, maxScroll = 2000) {
    let scrolled = 0;
    while (scrolled < maxScroll) {
      const {WebDriver} = this.helpers;
      await WebDriver.executeScript((y) => window.scrollBy(0, y), step);
      scrolled += step;
      await WebDriver.wait(delay / 1000); // wait expects seconds
    }
  }

  async scrollingDownLittleBit(times=1){
    for(let i=0; i<times; i++){
      await this.userScroll(300, 500, 300);
    }
  }

  async scrollingDownMedium(times=1){
    for(let i=0; i<times; i++){
      await this.userScroll(600, 500, 600);
    }
  }

  async scrollingDownLong(times=1){
    for(let i=0; i<times; i++){
      await this.userScroll(1000, 500, 2000);
    }
  }

  async maximizeWindow() {
    const {WebDriver} = this.helpers;
    await WebDriver.resizeWindow('1920, 1080');
  }
}

module.exports = CustomAction;