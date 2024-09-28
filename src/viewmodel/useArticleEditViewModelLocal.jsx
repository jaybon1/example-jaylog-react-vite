import {useState} from "react";
import UtilFunction from "/src/util/UtilFunction.js";
import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import ArticleRepository from "/src/model/ArticleRepository.js";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import {useNavigate} from "react-router-dom";

function useArticleEditViewModelLocal() {

    const {loginUser, setLoginUser} = useAuthStoreGlobal();

    const [article, setArticle] = useState();

    const navigate = useNavigate();

    const getBy = async (id) => {
        const response = await ArticleRepository.getBy(id);
        if (response?.status === 200) {
            const resDto = await response.json();
            setArticle(() => resDto.data.article);
        } else {
            UtilFunction.handleNotOkResponse(response, setLoginUser);
        }
    }

    const [putBy, isPendingPutBy] = usePendingFunction(async (props) => {
        if (loginUser == null) {
            alert("로그인이 필요한 기능입니다.");
            return;
        }
        const response = await ArticleRepository.putBy(props.id, props.reqDto);
        if (response?.status === 200) {
            const resDto = await response.json();
            alert(resDto.message);
            navigate(`/article/${props.id}`, {replace: true});
        } else {
            UtilFunction.handleNotOkResponse(response, setLoginUser);
        }
    });

    return {
        article,
        getBy,
        putBy,
        isPendingPutBy
    };
}

export default useArticleEditViewModelLocal;
