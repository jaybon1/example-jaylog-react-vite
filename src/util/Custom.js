import UtilFunctions from "/src/util/UtilFunctions.js";

class Custom {
    static baseUrl = "https://jaylogapi.jaybon.org";

    static async fetch(url, options = {}) {
        const {url: newUrl, options: newOptions} = UtilFunctions.attachAuthorizationHeader(url, options);
        const response = await window.fetch(newUrl, newOptions);
        return await UtilFunctions.handleCustomFetchResponse(response, url, options);
    }





}

export default Custom;