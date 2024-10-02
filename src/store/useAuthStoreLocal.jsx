import {useEffect, useState} from "react";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import UtilFunction from "/src/util/UtilFunction.js";

function useAuthStoreLocal() {

    /**
     * @typedef {Object} loginUser
     * @property {string} name
     * @property {string} simpleDescription
     * @property {string} profileImage
     * @property {Array} roleList
     */
    const [loginUser, setLoginUser] = useState(undefined);

    const [authTrigger] = usePendingFunction(async () => {
        setLoginUser(() => UtilFunction.getUserByAccessJwt());
    });

    useEffect(() => {
        if (loginUser === undefined) {
            authTrigger();
        }
    }, [loginUser]);

    return {
        loginUser,
        setLoginUser
    };
}

export default useAuthStoreLocal;
