import Custom from "/src/util/Custom.js";

class MainRepository {
    static url = "/v1/main";

    static async get(searchValue) {
        return await Custom.fetch(`${this.url}?searchValue=${searchValue}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

}

export default MainRepository;