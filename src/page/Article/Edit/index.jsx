import ExitImg from "/src/asset/image/exit.svg";
import {useEffect, useRef, useState} from "react";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAuthStore} from "/src/store/provider/StoreProvider.jsx";
import WriteLayout from "/src/page/_component/layout/WriteLayout/index.jsx";
import MDEditor from "@uiw/react-md-editor";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import Custom from "/src/util/Custom.js";
import UtilFunctions from "/src/util/UtilFunctions.js";

export default function ArticleEditPage() {

    const navigate = useNavigate();

    const {id} = useParams();

    const authStore = useAuthStore();

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
                        titleInputRef.current.value = dto.data.article.title;
                        setMarkdown(dto.data.article.content);
                    });
            } else {
                UtilFunctions.handleNotOkResponse(response, authStore.setLoginUser);
            }
        });
    });

    const [putArticle, isPutArticlePending] = usePendingFunction(async () => {
        if (!validateFields()) {
            return;
        }
        const dto = {
            article: {
                title: titleInputRef.current.value,
                content: markdown,
            },
        };
        await Custom.fetch(`${Custom.baseUrl}/v1/article/${id}`, {
            method: "PUT",
            body: JSON.stringify(dto),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response?.status === 200) {
                response.json().then((dto) => {
                    alert(dto.message);
                    navigate(`/article/${id}`, {replace: true});
                });
            } else {
                UtilFunctions.handleNotOkResponse(response, authStore.setLoginUser);
            }
        });
    });

    useEffect(() => {
        const setHeight = () => setEditorHeight(window.innerHeight - 170);
        setHeight();
        window.addEventListener("resize", setHeight);
        if (authStore.loginUser == null) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/auth/login", {replace: true});
            return;
        }
        if (isNaN(id)) {
            alert("잘못된 접근입니다.");
            navigate("/");
            return;
        }
        getArticle();
        return () => window.removeEventListener("resize", setHeight);
    }, []);

    if (authStore.loginUser == null) {
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
                        disabled={isPutArticlePending}
                    >
                        게시하기
                    </Button>
                </Col>
            </Row>
        </WriteLayout>
    );
}
