import {useAuthStore} from "/src/store/provider/StoreProvider.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainPage from "/src/page/Main/index.jsx";
import AuthLoginPage from "/src/page/Auth/Login/index.jsx";
import MyPage from "/src/page/My/index.jsx";
import MyInfoPage from "/src/page/My/Info/index.jsx";
import Error404Page from "/src/page/Error/404/index.jsx";
import ArticleWithIdPage from "/src/page/Article/WithId/index.jsx";
import ArticleEditPage from "/src/page/Article/Edit/index.jsx";
import ArticleWritePage from "/src/page/Article/Write/index.jsx";
import AuthJoinPage from "/src/page/Auth/Join/index.jsx";

function App() {

    const authStore = useAuthStore();

    if (authStore.loginUser === undefined) {
        return <div></div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/main" element={<Navigate to={"/"} replace={true} />}/>
                <Route path="/auth/join" element={<AuthJoinPage/>}/>
                <Route path="/auth/login" element={<AuthLoginPage/>}/>
                <Route path="/article/:id" element={<ArticleWithIdPage/>}/>
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
