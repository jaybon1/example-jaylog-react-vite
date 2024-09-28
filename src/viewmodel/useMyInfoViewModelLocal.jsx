import UtilFunction from "/src/util/UtilFunction.js";
import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import MyRepository from "/src/model/MyRepository.js";
import {useNavigate} from "react-router-dom";
import usePendingFunction from "/src/use/usePendingFunction.jsx";

function useMyInfoViewModelLocal() {

    const {setLoginUser} = useAuthStoreGlobal();

    const navigate = useNavigate();

    const [postMyInfo, isPendingPostMyInfo] = usePendingFunction(async (props) => {
        const response = await MyRepository.postInfo(props.formData);
        if (response?.status === 200) {
            alert("정보를 수정하여 재로그인이 필요합니다. 로그인페이지로 이동합니다.");
            localStorage.removeItem("accessJwt");
            localStorage.removeItem("refreshJwt");
            setLoginUser(null);
            navigate("/auth/login", {replace: true});
        } else {
            UtilFunction.handleNotOkResponse(response, setLoginUser);
        }
    });

    return {
        postMyInfo,
        isPendingPostMyInfo
    };
}

export default useMyInfoViewModelLocal;
