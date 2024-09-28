import Custom from "/src/util/Custom.js";

class AuthRepository {
    static url = "/v1/auth";

    static async postJoin(reqDto) {
        return await Custom.fetch(`${this.url}/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqDto)
        });
    }

    static async postLogin(reqDto) {
        return await Custom.fetch(`${this.url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqDto)
        });
    }

}

export default AuthRepository;