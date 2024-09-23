import {jwtDecode} from "jwt-decode";
import Custom from "/src/util/Custom.js";

class UtilFunctions {

    static temp(str) {
        return str;
    }

    static getUserByAccessJwt() {
        const accessJwt = localStorage.getItem("accessJwt");
        if (accessJwt == null) {
            return null;
        }
        const jwtPayload = jwtDecode(accessJwt);
        if (jwtPayload.username == null) {
            return null;
        }
        return {
            username: jwtPayload.username,
            simpleDescription: jwtPayload.simpleDescription,
            profileImage: jwtPayload.profileImage,
            roleList: jwtPayload.roleList
        }
    }

    static async handleNotOkResponse(response, setLoginUser) {
        if (response.status === 401) {
            localStorage.removeItem("accessJwt");
            localStorage.removeItem("refreshJwt");
            setLoginUser(null);
            alert("로그인이 필요합니다.");
            return;
        }
        await response.json()
            .then((dto) => {
                if (dto?.message) {
                    alert(dto.message);
                } else {
                    alert(response.statusText);
                }
            })
            .catch((error) => {
                if (error?.response?.data?.detail != null) {
                    alert(JSON.stringify(error.response.data.detail));
                } else if (error?.response?.data?.message != null) {
                    alert(error.response.data.message);
                } else {
                    alert("오류가 발생했습니다. 관리자에게 문의하세요.");
                }
            });
    }

    static async handleCustomFetchResponse(response, url, options) {
        if (!response.ok) {
            if (response.status === 401) {
                const refreshJwt = localStorage.getItem('refreshJwt');
                if (refreshJwt === null) {
                    return response;
                }
                const responseOfRefresh = await fetch(`${Custom.baseUrl}/v1/auth/refresh`, {
                    method: 'POST',
                    body: JSON.stringify({refreshJwt}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!responseOfRefresh.ok) {
                    return responseOfRefresh;
                }
                await responseOfRefresh.json().then(dto => {
                    localStorage.setItem('accessJwt', dto.accessJwt);
                    localStorage.setItem('refreshJwt', dto.refreshJwt);
                });
                const {url: newUrl, options: newOptions} = this.attachAuthorizationHeader(url, options);
                const responseOfRetry = await fetch(newUrl, newOptions);
                return responseOfRetry;
            }
        }
        return response;
    }

    static attachAuthorizationHeader(url, options = {}) {
        const accessJwt = localStorage.getItem('accessJwt');
        options.headers = options.headers || {};
        if (accessJwt) {
            options.headers['Authorization'] = `Bearer ${accessJwt}`;
        }
        return {url, options};
    }

}

export default UtilFunctions;