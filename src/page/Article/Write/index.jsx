import ExitImg from "/src/asset/image/exit.svg";
import {useEffect, useRef, useState} from "react";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "/src/store/provider/StoreProvider.jsx";
import WriteLayout from "/src/page/_component/layout/WriteLayout/index.jsx";
import MDEditor from "@uiw/react-md-editor";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import Custom from "/src/util/Custom.js";
import UtilFunctions from "/src/util/UtilFunctions.js";

export default function ArticleWritePage() {

    const navigate = useNavigate();

    const authStore = useAuthStore();

    const titleInputRef = useRef();

    const editorRef = useRef();

    const [markdown, setMarkdown] = useState("");

    const [editorHeight, setEditorHeight] = useState(0);

    // 임시저장 함수
    const tempArticleSave = () => {
        const tempArticle = {
            title: titleInputRef.current.value,
            content: markdown,
        };
        localStorage.setItem("tempArticle", JSON.stringify(tempArticle));
        alert("임시저장되었습니다.");
    };

    // 글작성 페이지 이동시 임시저장된 글이 있으면 불러오기
    const tempArticleCheck = () => {
        const tempArticle = localStorage.getItem("tempArticle");
        if (tempArticle != null) {
            if (
                window.confirm(
                    "임시저장된 글이 있습니다. 불러오시겠습니까?\n취소하시면 임시저장 글이 삭제 됩니다."
                )
            ) {
                const tempArticle = JSON.parse(localStorage.getItem("tempArticle"));
                titleInputRef.current.value = tempArticle.title;
                setMarkdown(() => tempArticle.content);
            } else {
                localStorage.removeItem("tempArticle");
            }
        }
    };

    // 글 저장시 유효성 검사 함수
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

    // 글 저장 함수
    const [postArticle, isPostArticlePending] = usePendingFunction(async () => {
        if (!validateFields()) {
            return;
        }
        const dto = {
            article: {
                title: titleInputRef.current.value,
                content: markdown,
            },
        };
        await Custom.fetch(`${Custom.baseUrl}/v1/article`, {
            method: "POST",
            body: JSON.stringify(dto),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response?.status === 200) {
                response.json().then((dto) => {
                    localStorage.removeItem("tempArticle");
                    alert(dto.message);
                    navigate(`/article/${dto.data.article.id}`, {replace: true});
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
        tempArticleCheck();
        return () => window.removeEventListener("resize", setHeight);
    }, []);

    if (authStore.loginUser == null) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/auth/login", {replace: true});
        return <></>;
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
                        className="btn-light fw-bold"
                        type="button"
                        onClick={tempArticleSave}
                    >
                        임시저장
                    </Button>
                </Col>
                <Col className="col-auto">
                    <Button
                        className="btn-light fw-bold text-white"
                        type="button"
                        style={{backgroundColor: "#20c997"}}
                        onClick={postArticle}
                        disabled={isPostArticlePending}
                    >
                        게시하기
                    </Button>
                </Col>
            </Row>
        </WriteLayout>
    );
}
