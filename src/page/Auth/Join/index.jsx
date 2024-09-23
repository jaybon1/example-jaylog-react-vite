import JaylogImg from "/src/asset/image/jaylog.png";
import {useEffect, useRef} from "react";
import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import UserInfoLayout from "/src/page/_component/layout/UserInfoLayout/index.jsx";
import Custom from "/src/util/Custom.js";
import UtilFunctions from "/src/util/UtilFunctions.js";

export default function AuthJoinPage() {
    const refs = useRef({
        idElement: null,
        pwElement: null,
        pw2Element: null,
        simpleDescElement: null,
    });

    const navigate = useNavigate();

    const validateFields = () => {
        const {idElement, pwElement, pw2Element} = refs.current;

        if (idElement.value === "") {
            alert("아이디를 입력하세요.");
            idElement.focus();
            return false;
        }

        if (pwElement.value === "") {
            alert("비밀번호를 입력하세요.");
            pwElement.focus();
            return false;
        }

        if (pw2Element.value === "") {
            alert("비밀번호 확인을 입력하세요.");
            pw2Element.focus();
            return false;
        }

        if (pwElement.value !== pw2Element.value) {
            alert("비밀번호가 일치하지 않습니다.");
            pw2Element.focus();
            return false;
        }

        return true;
    };

    // 버튼을 여러번 클릭하지 않도록 처리.
    const [requestJoin, isPending] = usePendingFunction(async () => {
        if (!validateFields()) {
            return;
        }

        const reqDto = {
            user: {
                username: refs.current.idElement.value,
                password: refs.current.pwElement.value,
                simpleDescription: refs.current.simpleDescElement.value
            },
        };

        await fetch(`${Custom.baseUrl}/v1/auth/join`, {
            method: `post`,
            body: JSON.stringify(reqDto),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (response?.status === 200) {
                response.json()
                    .then((dto) => {
                        alert(dto.message);
                        navigate("/auth/login", {replace: true});
                    });
            } else {
                UtilFunctions.handleNotOkResponse(response);
            }
        });
    });

    useEffect(() => {
        refs.current.idElement.focus();
    }, []);

    return (
        <UserInfoLayout isNavbar={true}>
            <Card className="shadow-2-strong" style={{borderRadius: "1rem"}}>
                <Card.Body className="p-5 text-center">
                    <h3 className="mb-3">
                        <img src={JaylogImg} style={{height: "100px"}} alt="jaylog"></img>
                    </h3>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="idAddOn">*아이디</InputGroup.Text>
                        <Form.Control
                            ref={(el) => (refs.current.idElement = el)}
                            type="text"
                            aria-describedby="idAddOn"
                        />
                    </InputGroup>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="pwAddOn">*비밀번호</InputGroup.Text>
                                <Form.Control
                                    ref={(el) => (refs.current.pwElement = el)}
                                    type="password"
                                    aria-describedby="pwAddOn"
                                />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="pw2AddOn">*비번확인</InputGroup.Text>
                                <Form.Control
                                    ref={(el) => (refs.current.pw2Element = el)}
                                    type="password"
                                    aria-describedby="pw2AddOn"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="simpleDescAddOn">한 줄 소개</InputGroup.Text>
                        <Form.Control
                            ref={(el) => (refs.current.simpleDescElement = el)}
                            type="text"
                            aria-describedby="simpleDescAddOn"
                        />
                    </InputGroup>
                    <Button
                        className="btn-primary"
                        style={{width: "100%"}}
                        onClick={requestJoin}
                        disabled={isPending}
                    >
                        회원가입
                    </Button>
                    <hr className="my-4"/>
                    <Link to="/auth/login">아이디가 있으신가요? 로그인</Link>
                </Card.Body>
            </Card>
        </UserInfoLayout>
    );
}