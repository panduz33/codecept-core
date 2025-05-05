const { Helper } = require('codeceptjs');

class ExpectAction extends Helper {
  /**
   * Custom expect function to check the text of an element
   * @param {string} selector - The CSS selector of the element.
   * @param {string} expectedText - The text value you expect.
   */
  async expectText(selector, expectedText) {
    const { expect } = await import('chai');
    const {WebDriver} = this.helpers;
    const actualText = await WebDriver.grabTextFrom(selector);
    expect(actualText).to.equal(expectedText);
  }

  async assertEqual(actual, expected, message) {
    const { assert } = await import('chai');
    assert.strictEqual(actual, expected, message);
  }

  async assertTextInclude(actual, expected, message) {
    const { assert } = await import('chai');
    assert.include(actual, expected, message);
  }

  /**
   * Assert that a value is within a specified range
   * @param {number} actual - The actual value to check
   * @param {number} min - The minimum acceptable value (inclusive)
   * @param {number} max - The maximum acceptable value (inclusive)
   * @param {string} message - Optional message to display on failure
   */
  async assertInRange(actual, min, max, message) {
    const { assert } = await import('chai');
    const defaultMessage = `Expected ${actual} to be between ${min} and ${max}`;
    assert.isTrue(actual >= min && actual <= max, message || defaultMessage);
  }
  // You can add more custom assertions here as needed
}

module.exports = ExpectAction;
