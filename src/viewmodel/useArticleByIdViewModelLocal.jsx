import {useState} from "react";
import UtilFunction from "/src/util/UtilFunction.js";
import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import ArticleRepository from "/src/model/ArticleRepository.js";
import {produce} from "immer";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import {useNavigate} from "react-router-dom";

function useArticleByIdViewModelLocal() {

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

    const [deleteBy, isPendingDeleteBy] = usePendingFunction(async (props) => {
        if (loginUser == null) {
            alert("로그인이 필요한 기능입니다.");
            return;
        }
        if (!confirm("정말 삭제하시겠습니까?")) {
            return;
        }
        const response = await ArticleRepository.deleteBy(props.id);
        if (response?.status === 200) {
            const resDto = await response.json();
            alert(resDto.message);
            UtilFunction.goBackBy(navigate);
        } else {
            UtilFunction.handleNotOkResponse(response, setLoginUser);
        }
    });

    const [postLikeBy, isPendingPostLikeBy] = usePendingFunction(async (props) => {
        if (loginUser == null) {
            alert("로그인이 필요한 기능입니다.");
            return;
        }
        const response = await ArticleRepository.postLikeBy(props.id);
        if (response?.status === 200) {
            const resDto = await response.json();
            setArticle(prev => {
                return produce(prev, (draft) => {
                    draft.likeCount = resDto.data.article.likeCount;
                    draft.isLikeClicked = resDto.data.article.isLikeClicked;
                });
            });
        } else {
            UtilFunction.handleNotOkResponse(response, setLoginUser);
        }
    });

    return {
        article,
        getBy,
        deleteBy,
        isPendingDeleteBy,
        postLikeBy,
        isPendingPostLikeBy
    };
}

export default useArticleByIdViewModelLocal;
