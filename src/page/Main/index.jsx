import {useEffect, useState} from "react";
import {CardGroup, Container} from "react-bootstrap";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import DefaultLayout from "/src/page/_component/layout/DefaultLayout/index.jsx";
import ArticleCard from "/src/page/_component/common/ArticleCard/index.jsx";
import {useAuthStore, useSearchStore} from "/src/store/provider/StoreProvider.jsx";
import Custom from "/src/util/Custom.js";
import UtilFunctions from "/src/util/UtilFunctions.js";

export default function MainPage() {

    const [articlePage, setArticlePage] = useState();

    const authStore = useAuthStore();

    const searchStore = useSearchStore();

    const [getMain] = usePendingFunction(async () => {
        await Custom.fetch(`${Custom.baseUrl}/v1/main?searchValue=${searchStore.search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response?.status === 200) {
                response.json()
                    .then((dto) => {
                        setArticlePage(() => dto.data.articlePage);
                    });
            } else {
                UtilFunctions.handleNotOkResponse(response, authStore.setLoginUser);
            }
        });
    }, 300);

    useEffect(() => {
        getMain();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchStore.search]);

    return (
        <DefaultLayout>
            <Container className="mt-3">
                <CardGroup className="jaybon-card-group row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
                    {articlePage != null && articlePage.content.map((article, index) => {
                        return (
                            <ArticleCard key={index} article={article}/>
                        );
                    })}
                </CardGroup>
            </Container>
        </DefaultLayout>
    );
}