import {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import DefaultLayout from "/src/view/_component/layout/DefaultLayout/index.jsx";
import ArticleCard from "/src/view/_component/common/ArticleCard/index.jsx";
import {useMyViewModelGlobal} from "/src/viewmodel/provider/ViewModelProvider.jsx";

export default function MyPage() {

    const {loginUser} = useAuthStoreGlobal();

    const {myArticleList, likeArticleList, getMy} = useMyViewModelGlobal();

    const navigate = useNavigate();

    useEffect(() => {
        if (loginUser == null) {
            alert("로그인이 필요합니다.");
            navigate("/auth/login", {replace: true});
        }
        getMy();
    }, []);

    if (loginUser == null) {
        return null;
    }

    return (
        <DefaultLayout>
            {loginUser ? (
                <div>
                    <Container>
                        <Row className="row-cols-2 justify-content-center my-5">
                            <Col>
                                <div className="d-flex justify-content-center">
                                    <img
                                        src={loginUser.profileImage}
                                        className="ratio ratio-1x1 rounded-circle"
                                        style={{width: "100px", height: "100px"}}
                                        alt="profile"
                                    />
                                </div>
                            </Col>
                            <Col>
                                <h2>{loginUser.username}</h2>
                                <p>{loginUser.simpleDescription}</p>
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
                                    {myArticleList && myArticleList.map((article, index) => (
                                        <ArticleCard key={index} article={article}/>
                                    ))}
                                </Row>
                            </Col>
                            <Col>
                                <h5 className="text-center">내가 좋아요 한 글</h5>
                                <Row className="row-cols-1 card-group my-5">
                                    {likeArticleList && likeArticleList.map((article, index) => (
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