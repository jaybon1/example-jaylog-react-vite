import UtilFunction from "/src/util/UtilFunction.js";
import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import ArticleRepository from "/src/model/ArticleRepository.js";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import {useNavigate} from "react-router-dom";

function useArticleWriteViewModelLocal() {

    const {loginUser, setLoginUser} = useAuthStoreGlobal();

    const navigate = useNavigate();

    const [postBy, isPendingPostBy] = usePendingFunction(async (props) => {
        if (loginUser == null) {
            alert("로그인이 필요한 기능입니다.");
            return;
        }
        const response = await ArticleRepository.postBy(props.reqDto);
        if (response?.status === 200) {
            const resDto = await response.json();
            localStorage.removeItem("tempArticle");
            alert(resDto.message);
            navigate(`/article/${resDto.data.article.id}`, {replace: true});
        } else {
            UtilFunction.handleNotOkResponse(response, setLoginUser);
        }
    });

    return {
        postBy,
        isPendingPostBy
    };
}

export default useArticleWriteViewModelLocal;
