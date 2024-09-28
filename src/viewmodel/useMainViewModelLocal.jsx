import {useState} from "react";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import UtilFunction from "/src/util/UtilFunction.js";
import MainRepository from "/src/model/MainRepository.js";
import {useAuthStoreGlobal, useSearchStoreGlobal} from "/src/store/provider/StoreProvider.jsx";

function useMainViewModelLocal() {

    const {setLoginUser} = useAuthStoreGlobal();

    const {searchValue} = useSearchStoreGlobal();

    const [articleList, setArticleList] = useState();
    const [pagination, setPagination] = useState();

    const [getMain] = usePendingFunction(async () => {
        const response = await MainRepository.get(searchValue);
        if (response?.status === 200) {
            const resDto = await response.json();
            setArticleList(() => resDto.data.articlePage.content);
            setPagination(() => resDto.data.articlePage.page);
        } else {
            UtilFunction.handleNotOkResponse(response, setLoginUser);
        }
    });

    return {
        articleList,
        pagination,
        getMain
    };
}

export default useMainViewModelLocal;
