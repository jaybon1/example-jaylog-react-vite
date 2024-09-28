import UtilFunction from "/src/util/UtilFunction.js";

class Custom {

    static baseUrl = "https://jaylogapi.jaybon.org";

    static async fetch(url, options = {}) {
        const customUrl = `${this.baseUrl}${url}`;
        const customOptions = UtilFunction.attachAuthorizationHeader(options);
        const response = await window.fetch(customUrl, customOptions);
        return await UtilFunction.handleCustomFetchResponse(response, customUrl, customOptions);
    }

}

export default Custom;