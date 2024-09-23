import LikeImg from "/src/asset/image/like.svg";
import LikeRedImg from "/src/asset/image/like-red.svg";
import {produce} from "immer";
import {useEffect, useState} from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import DefaultLayout from "/src/page/_component/layout/DefaultLayout/index.jsx";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import {useAuthStore} from "/src/store/provider/StoreProvider.jsx";
import Custom from "/src/util/Custom.js";
import UtilFunctions from "/src/util/UtilFunctions.js";
import MDEditor from '@uiw/react-md-editor';

export default function ArticleWithIdPage() {

    const [article, setArticle] = useState(null);

    const navigate = useNavigate();

    const {id} = useParams();

    const authStore = useAuthStore();

    const [clickLike, isLikePending] = usePendingFunction(async () => {
        if (authStore.loginUser == null) {
            alert("로그인이 필요한 기능입니다.");
            return;
        }
        await Custom.fetch(`${Custom.baseUrl}/v1/article/${id}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (response?.status === 200) {
                response.json()
                    .then((dto) => {
                        setArticle(prev => {
                            return produce(prev, (draft) => {
                                draft.likeCount = dto.data.article.likeCount;
                                draft.isLikeClicked = dto.data.article.isLikeClicked;
                            });
                        });
                    });
            } else {
                UtilFunctions.handleNotOkResponse(response, authStore.setLoginUser);
            }
        });
    });

    const [getArticle] = usePendingFunction(async () => {
        await Custom.fetch(`${Custom.baseUrl}/v1/article/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (response?.status === 200) {
                response.json()
                    .then((dto) => {
                        setArticle(() => dto.data.article);
                    });
            } else {
                UtilFunctions.handleNotOkResponse(response, authStore.setLoginUser);
            }
        });
    });

    const [deleteArticle, isDeleteArticlePending] = usePendingFunction(async () => {
        // https://studyingych.tistory.com/62
        // confirm 실사용 시 위 블로그 참고
        if (window.confirm("정말 삭제하시겠습니까?") === false) return;
        await Custom.fetch(`${Custom.baseUrl}/v1/article/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (response?.status === 200) {
                response.json()
                    .then((dto) => {
                        alert(dto.message);
                        goBack();
                    });
            } else {
                UtilFunctions.handleNotOkResponse(response, authStore.setLoginUser);
            }
        });
    });

    const goBack = () => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get("from") != null) {
            const from = atob(searchParams.get("from"));
            navigate(from);
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        if (isNaN(id)) {
            alert("잘못된 접근입니다.");
            navigate("/");
            return;
        }
        getArticle();
    }, []);

    if (isNaN(id)) {
        return;
    }

    return (
        <DefaultLayout>
            {article != null ? (
                <Container className="p-5">
                    <h1>{article.title}</h1>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
              <span>
                <Image
                    src={article.writer.profileImage}
                    className="ratio ratio-1x1 rounded-circle me-2"
                    style={{width: "20px", height: "20px"}}
                    alt="profile"
                />
                <strong>{article.writer.username}</strong>
              </span>
                            <span className="text-black-50 fw-light ms-3">
                {article.createDate}
              </span>
                        </div>
                        <button
                            id="likeButton"
                            className="btn"
                            onClick={clickLike}
                            disabled={isLikePending}
                        >
                            <Image
                                src={article.isLikeClicked ? LikeRedImg : LikeImg}
                                width="15"
                                alt="좋아요"
                            />
                            <span id="likeCount" className="mx-2 fs-6 text-black-50 fw-light">
                {article.likeCount}
              </span>
                        </button>
                        {authStore.loginUser?.username != null &&
                        authStore.loginUser?.username === article.writer.username ? (
                            <div>
                                <Button
                                    variant="outline-success"
                                    type="button"
                                    onClick={() => {
                                        navigate(`/article/edit/${id}`);
                                    }}
                                >
                                    수정
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    className="ms-2"
                                    type="button"
                                    onClick={deleteArticle}
                                    disabled={isDeleteArticlePending}
                                >
                                    삭제
                                </Button>
                            </div>
                        ) : null}
                    </div>
                    <div style={{marginTop: "100px"}}></div>
                    {article ? <MDEditor.Markdown source={article.content}/> : <div></div>}
                    <Row className="mt-5">
                        <Col className="d-flex justify-content-center">
                            <Button variant="outline-dark" type="button" onClick={goBack}>
                                목록으로
                            </Button>
                        </Col>
                    </Row>
                </Container>
            ) : <div></div>}
        </DefaultLayout>
    );
}