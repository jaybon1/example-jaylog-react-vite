import Custom from "/src/util/Custom.js";

class MyRepository {
    static url = "/v1/my";

    static async get() {
        return await Custom.fetch(`${this.url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    static async putInfo(formData) {
        return await Custom.fetch(`${this.url}/info`, {
            method: "PUT",
            headers: {},
            body: formData
        });
    }

}

export default MyRepository;