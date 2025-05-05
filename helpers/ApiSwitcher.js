const REST = require('codeceptjs/lib/helper/REST');

class ApiSwitcher extends REST {
  /**
   * Set a new endpoint for subsequent requests.
   * This will be available as I.setEndpoint(endpoint)
   */
  async setEndpoint(endpoint) {
    this.options.endpoint = endpoint;
  }

  /**
   * Send request to a specific endpoint (overrides current endpoint for this request only).
   * This will be available as I.sendRequestTo(method, url, data, headers)
   */
  async sendRequestTo(method, url, data = {}, headers = {}) {
    let originalEndpoint = this.options.endpoint;
    let fullUrl = url.startsWith('http') ? url : originalEndpoint + url;
    const requestOptions = {
      method,
      url: fullUrl,
      data,
      headers
    };
    // Print request details
    console.log('Request URL:', fullUrl);
    if (data && Object.keys(data).length > 0) {
      console.log('Request Body:', JSON.stringify(data, null, 2));
    }
    // Make the request
    const response = await this._executeRequest(requestOptions);
    // Print response details (only safe, non-circular parts)
    if (response && typeof response === 'object') {
      console.log('Response Status:', response.status);
      console.log('Response Data:', JSON.stringify(response.data, null, 2));
    } else {
      console.log('Response:', response);
    }
    return response;
  }

  /**
   * Send GET request to a specific endpoint.
   * Usage: I.sendGetRequestTo('/users?page=2', headers)
   */
  async sendGetRequestTo(url, headers = {}) {
    let originalEndpoint = this.options.endpoint;
    let fullUrl = url.startsWith('http') ? url : originalEndpoint + url;
    const requestOptions = {
      method: 'GET',
      url: fullUrl,
      headers
    };
    console.log('Request URL:', fullUrl);
    // Make the request
    const response = await this._executeRequest(requestOptions);
    if (response && typeof response === 'object') {
      console.log('Response Status:', response.status);
      console.log('Response Data:', JSON.stringify(response.data, null, 2));
    } else {
      console.log('Response:', response);
    }
    return response;
  }

  /**
   * Send POST request to a specific endpoint.
   * Usage: I.sendPostRequestTo('/users', data, headers)
   */
  async sendPostRequestTo(url, data = {}, headers = {}) {
    let originalEndpoint = this.options.endpoint;
    let fullUrl = url.startsWith('http') ? url : originalEndpoint + url;
    const requestOptions = {
      method: 'POST',
      url: fullUrl,
      data,
      headers
    };
    console.log('Request URL:', fullUrl);
    if (data && Object.keys(data).length > 0) {
      console.log('Request Body:', JSON.stringify(data, null, 2));
    }
    // Make the request
    const response = await this._executeRequest(requestOptions);
    if (response && typeof response === 'object') {
      console.log('Response Status:', response.status);
      console.log('Response Data:', JSON.stringify(response.data, null, 2));
    } else {
      console.log('Response:', response);
    }
    return response;
  }
}

module.exports = ApiSwitcher;