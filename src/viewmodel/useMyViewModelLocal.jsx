import {useState} from "react";
import UtilFunction from "/src/util/UtilFunction.js";
import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import MyRepository from "/src/model/MyRepository.js";

function useMyViewModelLocal() {

    const {setLoginUser} = useAuthStoreGlobal();

    const [myArticleList, setMyArticleList] = useState();
    const [likeArticleList, setLikeArticleList] = useState();

    const getMy = async () => {
        const response = await MyRepository.get();
        if (response?.status === 200) {
            const resDto = await response.json();
            setMyArticleList(() => resDto.data.myArticleList);
            setLikeArticleList(() => resDto.data.likeArticleList);
        } else {
            UtilFunction.handleNotOkResponse(response, setLoginUser);
        }
    }

    return {
        myArticleList,
        likeArticleList,
        getMy
    };
}

export default useMyViewModelLocal;
