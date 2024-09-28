import {useEffect} from "react";
import {CardGroup, Container} from "react-bootstrap";
import DefaultLayout from "/src/view/_component/layout/DefaultLayout/index.jsx";
import ArticleCard from "/src/view/_component/common/ArticleCard/index.jsx";
import {useSearchStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import {useMainViewModelGlobal} from "/src/viewmodel/provider/ViewModelProvider.jsx";

export default function MainPage() {

    const {searchValue} = useSearchStoreGlobal();

    const {articleList, pagination, getMain} = useMainViewModelGlobal();

    useEffect(() => {
        getMain();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    return (
        <DefaultLayout>
            <Container className="mt-3">
                <CardGroup className="row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
                    {articleList != null && articleList.map((article, index) => {
                        return (
                            <ArticleCard key={index} article={article}/>
                        );
                    })}
                </CardGroup>
            </Container>
        </DefaultLayout>
    );
}