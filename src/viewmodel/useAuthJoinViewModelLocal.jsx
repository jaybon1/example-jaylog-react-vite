import UtilFunction from "/src/util/UtilFunction.js";
import {useState} from "react";
import AuthRepository from "/src/model/AuthRepository.js";
import {useNavigate} from "react-router-dom";

function useAuthJoinViewModelLocal() {

    const navigate = useNavigate();

    const [isPendingJoin, setIsPendingJoin] = useState(false);

    const join = (reqDto) => {
        setIsPendingJoin(true);
        AuthRepository.postJoin(reqDto)
            .then((response) => {
                if (response?.status === 200) {
                    response.json()
                        .then((resDto) => {
                            alert(resDto.message);
                            navigate("/auth/login", {replace: true});
                        });
                } else {
                    UtilFunction.handleNotOkResponse(response);
                }
            })
            .finally(() => {
                setIsPendingJoin(false);
            });
    }

    return {
        join,
        isPendingJoin
    };
}

export default useAuthJoinViewModelLocal;
