import ExitImg from "/src/asset/image/exit.svg";
import {useEffect, useRef, useState} from "react";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import WriteLayout from "/src/view/_component/layout/WriteLayout/index.jsx";
import MDEditor from "@uiw/react-md-editor";
import useArticleEditViewModelLocal from "/src/viewmodel/useArticleEditViewModelLocal.jsx";

export default function ArticleEditPage() {

    const {article, getBy, putBy, isPendingPutBy} = useArticleEditViewModelLocal();

    const navigate = useNavigate();

    const {id} = useParams();

    const {loginUser} = useAuthStoreGlobal();

    const titleInputRef = useRef();

    const editorRef = useRef();

    const [markdown, setMarkdown] = useState("");

    const [editorHeight, setEditorHeight] = useState(0);

    const validateFields = () => {
        const title = titleInputRef.current.value;
        if (title === "") {
            alert("제목을 입력하세요.");
            return false;
        }
        if (markdown === "") {
            alert("내용을 입력하세요.");
            return false;
        }
        return true;
    };

    const putArticle = async () => {
        if (!validateFields()) {
            return;
        }
        const reqDto = {
            article: {
                title: titleInputRef.current.value,
                content: markdown,
            },
        };
        putBy({id, reqDto});
    }

    useEffect(() => {
        const setHeight = () => setEditorHeight(window.innerHeight - 170);
        setHeight();
        window.addEventListener("resize", setHeight);
        if (loginUser == null) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/auth/login", {replace: true});
            return;
        }
        if (isNaN(id)) {
            alert("잘못된 접근입니다.");
            navigate("/");
            return;
        }
        getBy(id);
        return () => window.removeEventListener("resize", setHeight);
    }, []);

    useEffect(() => {
        if (article == null) {
            return;
        }
        titleInputRef.current.value = article.title;
        setMarkdown(article.content);
    }, [article]);

    if (loginUser == null) {
        return null;
    }

    if (isNaN(id)) {
        return null;
    }

    return (
        <WriteLayout>
            <Row>
                <Col>
                    <Form.Control
                        ref={titleInputRef}
                        className="border-0 w-100 fs-1 mt-3 mb-3"
                        type="text"
                        placeholder="제목을 입력하세요"
                    />
                </Col>
            </Row>
            <MDEditor ref={editorRef} height={editorHeight} value={markdown} onChange={setMarkdown}/>
            <Row className="row fixed-bottom p-3 bg-white shadow-lg">
                <Col className="me-auto">
                    <Link to={-1} className="text-decoration-none text-dark">
                        <Image src={ExitImg}/>
                        <span className="m-2">나가기</span>
                    </Link>
                </Col>
                <Col className="col-auto">
                    <Button
                        className="btn-light fw-bold text-white"
                        type="button"
                        style={{backgroundColor: "#20c997"}}
                        onClick={putArticle}
                        disabled={isPendingPutBy}
                    >
                        게시하기
                    </Button>
                </Col>
            </Row>
        </WriteLayout>
    );
}
