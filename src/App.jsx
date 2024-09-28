import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainPage from "/src/view/Main/index.jsx";
import AuthLoginPage from "/src/view/Auth/Login/index.jsx";
import MyPage from "/src/view/My/index.jsx";
import MyInfoPage from "/src/view/My/Info/index.jsx";
import Error404Page from "/src/view/Error/404/index.jsx";
import ArticleByIdPage from "/src/view/Article/ById/index.jsx";
import ArticleEditPage from "/src/view/Article/Edit/index.jsx";
import ArticleWritePage from "/src/view/Article/Write/index.jsx";
import AuthJoinPage from "/src/view/Auth/Join/index.jsx";

function App() {

    const authStoreGlobal = useAuthStoreGlobal();

    if (authStoreGlobal.loginUser === undefined) {
        return <div></div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/main" element={<Navigate to={"/"} replace={true}/>}/>
                <Route path="/auth/join" element={<AuthJoinPage/>}/>
                <Route path="/auth/login" element={<AuthLoginPage/>}/>
                <Route path="/article/:id" element={<ArticleByIdPage/>}/>
                <Route path="/article/write" element={<ArticleWritePage/>}/>
                <Route path="/article/edit/:id" element={<ArticleEditPage/>}/>
                <Route path="/my" element={<MyPage/>}/>
                <Route path="/my/info" element={<MyInfoPage/>}/>
                <Route path="*" element={<Error404Page/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
