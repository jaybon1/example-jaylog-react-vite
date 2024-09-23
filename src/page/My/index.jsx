import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "/src/store/provider/StoreProvider.jsx";
import DefaultLayout from "/src/page/_component/layout/DefaultLayout/index.jsx";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import Custom from "/src/util/Custom.js";
import UtilFunctions from "/src/util/UtilFunctions.js";
import ArticleCard from "/src/page/_component/common/ArticleCard/index.jsx";

export default function MyPage() {
    const authStore = useAuthStore();
    const navigate = useNavigate();

    const [myArticleList, setMyArticleList] = useState([]);
    const [likeArticleList, setLikeArticleList] = useState([]);

    const [getMy] = usePendingFunction(async () => {
        await Custom.fetch(`${Custom.baseUrl}/v1/my`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (response?.status === 200) {
                response.json()
                    .then((dto) => {
                        setMyArticleList(() => dto.data.myArticleList);
                        setLikeArticleList(() => dto.data.likeArticleList);
                    });
            } else {
                UtilFunctions.handleNotOkResponse(response, authStore.setLoginUser);
            }
        });
    });

    useEffect(() => {
        if (authStore.loginUser == null) {
            alert("로그인이 필요합니다.");
            navigate("/auth/login", {replace: true});
        }
        getMy();
    }, []);

    return (
        <DefaultLayout>
            {authStore.loginUser ? (
                <div>
                    <Container>
                        <Row className="row-cols-2 justify-content-center my-5">
                            <Col>
                                <div className="d-flex justify-content-center">
                                    <img
                                        src={authStore.loginUser.profileImage}
                                        className="ratio ratio-1x1 rounded-circle"
                                        style={{width: "100px", height: "100px"}}
                                        alt="profile"
                                    />
                                </div>
                            </Col>
                            <Col>
                                <h2>{authStore.loginUser.username}</h2>
                                <p>{authStore.loginUser.simpleDescription}</p>
                                <Link to="/my/info" style={{color: "#20c997"}}>
                                    내 정보 수정
                                </Link>
                            </Col>
                        </Row>
                        <hr className="border-3 border-top"/>
                    </Container>
                    <Container className="mt-5">
                        <Row className="row-cols-1 row-cols-md-2">
                            <Col>
                                <h5 className="text-center">내 글</h5>
                                <Row className="row-cols-1 card-group my-5">
                                    {myArticleList.map((article, index) => (
                                        <ArticleCard key={index} article={article}/>
                                    ))}
                                </Row>
                            </Col>
                            <Col>
                                <h5 className="text-center">내가 좋아요 한 글</h5>
                                <Row className="row-cols-1 card-group my-5">
                                    {likeArticleList.map((article, index) => (
                                        <ArticleCard key={index} article={article}/>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            ) : (
                <div></div>
            )}
        </DefaultLayout>
    );
}