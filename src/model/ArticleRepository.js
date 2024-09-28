import Custom from "/src/util/Custom.js";

class ArticleRepository {
    static url = "/v1/article";

    static async getBy(id) {
        return await Custom.fetch(`${this.url}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    static async postBy(reqDto) {
        return await Custom.fetch(`${this.url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqDto)
        });
    }

    static async putBy(id, reqDto) {
        return await Custom.fetch(`${this.url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqDto)
        });
    }

    static async deleteBy(id) {
        return await Custom.fetch(`${this.url}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    static async postLikeBy(id) {
        return await Custom.fetch(`${this.url}/${id}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

}

export default ArticleRepository;