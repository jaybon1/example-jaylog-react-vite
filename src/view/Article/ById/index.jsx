import LikeImg from "/src/asset/image/like.svg";
import LikeRedImg from "/src/asset/image/like-red.svg";
import {useEffect} from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import DefaultLayout from "/src/view/_component/layout/DefaultLayout/index.jsx";
import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import MDEditor from '@uiw/react-md-editor';
import useArticleByIdViewModelLocal from "/src/viewmodel/useArticleByIdViewModelLocal.jsx";
import UtilFunction from "/src/util/UtilFunction.js";

export default function ArticleByIdPage() {

    const {loginUser} = useAuthStoreGlobal();

    const {
        article,
        getBy,
        deleteBy,
        isPendingDeleteBy,
        postLikeBy,
        isPendingPostLikeBy
    } = useArticleByIdViewModelLocal();

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if (isNaN(id)) {
            alert("잘못된 접근입니다.");
            navigate("/");
            return;
        }
        getBy(id);
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
                            onClick={() => postLikeBy({id})}
                            disabled={isPendingPostLikeBy}
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
                        {loginUser?.username != null &&
                        loginUser?.username === article.writer.username ? (
                            <div>
                                <Button
                                    variant="outline-success"
                                    type="button"
                                    onClick={() => {
                                        navigate(`/article/${id}/edit`);
                                    }}
                                >
                                    수정
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    className="ms-2"
                                    type="button"
                                    onClick={() => deleteBy({id})}
                                    disabled={isPendingDeleteBy}
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
                            <Button variant="outline-dark" type="button"
                                    onClick={() => UtilFunction.goBackBy(navigate)}>
                                목록으로
                            </Button>
                        </Col>
                    </Row>
                </Container>
            ) : <div></div>}
        </DefaultLayout>
    );
}