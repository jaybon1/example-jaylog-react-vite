import {jwtDecode} from "jwt-decode";
import Custom from "/src/util/Custom.js";

class UtilFunction {

    static temp(str) {
        return str;
    }

    static getUserByAccessJwt() {
        const accessJwt = localStorage.getItem("accessJwt");
        if (accessJwt == null) {
            return null;
        }
        let jwtPayload;
        try {
            jwtPayload = jwtDecode(accessJwt);
        } catch (error) {
            return null;
        }
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

    static goBackBy(navigate) {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get("from") != null) {
            const from = atob(searchParams.get("from"));
            navigate(from);
        } else {
            navigate("/");
        }
    };

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
        // 위 코드와 아래 코드는 동일한 기능을 합니다.
        // try {
        //     const dto = response.json();
        //     if (dto?.message) {
        //         alert(dto.message);
        //     } else {
        //         alert(response.statusText);
        //     }
        // } catch (error) {
        //     if (error?.response?.data?.detail != null) {
        //         alert(JSON.stringify(error.response.data.detail));
        //     } else if (error?.response?.data?.message != null) {
        //         alert(error.response.data.message);
        //     } else {
        //         alert("오류가 발생했습니다. 관리자에게 문의하세요.");
        //     }
        // }
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
                    localStorage.setItem('accessJwt', dto.data.accessJwt);
                    localStorage.setItem('refreshJwt', dto.data.refreshJwt);
                });
                const newOptions = this.attachAuthorizationHeader(options);
                const responseOfRetry = await fetch(url, newOptions);
                return responseOfRetry;
            }
        }
        return response;
    }

    static attachAuthorizationHeader(options = {}) {
        const accessJwt = localStorage.getItem('accessJwt');
        options.headers = options.headers || {};
        if (accessJwt) {
            options.headers['Authorization'] = `Bearer ${accessJwt}`;
        }
        return options;
    }

}

export default UtilFunction;