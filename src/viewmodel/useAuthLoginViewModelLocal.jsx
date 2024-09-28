import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import UtilFunction from "/src/util/UtilFunction.js";
import {useState} from "react";
import AuthRepository from "/src/model/AuthRepository.js";
import {useNavigate} from "react-router-dom";

function useAuthLoginViewModelLocal() {

    const {setLoginUser} = useAuthStoreGlobal();

    const navigate = useNavigate();

    const [isPendingLogin, setIsPendingLogin] = useState(false);

    const login = (reqDto, isChecked) => {
        setIsPendingLogin(true);
        AuthRepository.postLogin(reqDto)
            .then((response) => {
                if (response?.status === 200) {
                    if (isChecked) {
                        localStorage.setItem("rememberId", JSON.stringify(reqDto.user.username));
                    } else {
                        localStorage.removeItem("rememberId");
                    }
                    response.json()
                        .then((dto) => {
                            localStorage.setItem("accessJwt", dto.data.accessJwt);
                            localStorage.setItem("refreshJwt", dto.data.refreshJwt);
                            setLoginUser(() => UtilFunction.getUserByAccessJwt());
                            navigate("/");
                        });
                } else {
                    UtilFunction.handleNotOkResponse(response, setLoginUser);
                }
            })
            .finally(() => {
                setIsPendingLogin(false);
            });
    }

    return {
        login,
        isPendingLogin
    };
}

export default useAuthLoginViewModelLocal;
