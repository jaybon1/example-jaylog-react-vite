import {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Form, Image, InputGroup, Row,} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useAuthStoreGlobal} from "/src/store/provider/StoreProvider.jsx";
import UserInfoLayout from "/src/view/_component/layout/UserInfoLayout/index.jsx";
import MyInfoExplain from "/src/view/My/Info/_component/MyInfoExplain/index.jsx";
import useMyInfoViewModelLocal from "/src/viewmodel/useMyInfoViewModelLocal.jsx";

export default function MyInfoPage() {

    const {loginUser} = useAuthStoreGlobal();

    const {putInfo, isPendingPutInfo} = useMyInfoViewModelLocal();

    const refs = useRef({
        profileImageElement: null,
        fileElement: null,
        pwElement: null,
        pw2Element: null,
        simpleDescElement: null,
    });

    const [croppedBlob, setCroppedBlob] = useState(null);

    const navigate = useNavigate();

    const setDefaultProfileImg = () => {
        refs.current.profileImageElement.src =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    };

    const setChangeProfileImg = () => {
        cropImage();
        const fileElement = refs.current.fileElement;

        if (fileElement.files && fileElement.files[0]) {
            const myFile = fileElement.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                refs.current.profileImageElement.setAttribute("src", e.target.result);
            };

            reader.readAsDataURL(myFile);
        }
    };

    const validateFields = () => {
        const {pwElement, pw2Element} = refs.current;

        if (pwElement.value !== pw2Element.value) {
            alert("비밀번호가 일치하지 않습니다.");
            pw2Element.focus();
            return false;
        }

        return true;
    };

    // 헤더 용량 문제로 인해 이미지 크기를 줄이는 함수
    const cropImage = () => {
        const fileElement = refs.current.fileElement;
        if (fileElement.files && fileElement.files[0]) {
            const myFile = fileElement.files[0];
            if (!myFile.type.startsWith("image/")) {
                alert("이미지 파일을 선택하세요.");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new window.Image();
                img.src = e.target.result;
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const cropX = 0;
                    const cropY = 0;
                    const cropWidth = 32;
                    const cropHeight = 32;
                    canvas.width = cropWidth;
                    canvas.height = cropHeight;
                    ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
                    canvas.toBlob(function (blob) {
                        setCroppedBlob(blob);  // 전역 변수에 저장하여 업로드 시 사용
                    }, myFile.type);
                }
            };
            reader.readAsDataURL(myFile);
        }
    };

    const requestChangeInfo = async () => {
        if (!validateFields()) {
            return;
        }

        const formData = new FormData();

        // formData.append("profileImage", refs.current.fileElement.files[0]);

        if (croppedBlob != null) {
            formData.append("profileImage", croppedBlob, "profileImage." + croppedBlob.type.split("/")[1]);
        }

        if (refs.current.pwElement.value) {
            formData.append("password", refs.current.pwElement.value);
        }

        if (refs.current.simpleDescElement.value) {
            formData.append("simpleDescription", refs.current.simpleDescElement.value);
        }

        await putInfo({formData});
    }

    useEffect(() => {
        if (loginUser == null) {
            alert("로그인이 필요합니다.");
            navigate("/auth/login", {replace: true});
        }
    }, [loginUser, navigate]);

    if (loginUser == null) {
        return null;
    }

    return (
        <UserInfoLayout isNavbar={true}>
            <Card className="shadow-2-strong" style={{borderRadius: "1rem"}}>
                <Card.Body className="p-5 text-center">
                    <h3 className="mb-3">내 정보 수정</h3>
                    <div className="d-flex justify-content-center">
            <span>
              <Image
                  ref={(el) => (refs.current.profileImageElement = el)}
                  src={loginUser.profileImage}
                  className="ratio ratio-1x1 rounded-circle"
                  style={{width: "100px", height: "100px"}}
                  alt="profile"
              />
              <Form.Control
                  ref={(el) => (refs.current.fileElement = el)}
                  type="file"
                  accept="image/*"
                  className="mt-3 mb-3"
                  style={{width: "100%"}}
                  onClick={setDefaultProfileImg}
                  onChange={setChangeProfileImg}
              />
            </span>
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="idAddOn">아이디</InputGroup.Text>
                        <Form.Control
                            defaultValue={loginUser.username}
                            type="text"
                            aria-describedby="idAddOn"
                            disabled
                        />
                    </InputGroup>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="pwAddOn">새 비밀번호</InputGroup.Text>
                                <Form.Control
                                    ref={(el) => (refs.current.pwElement = el)}
                                    type="password"
                                    aria-describedby="pwAddOn"
                                />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="pw2AddOn">비번확인</InputGroup.Text>
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
                            defaultValue={loginUser.simpleDescription}
                            aria-describedby="simpleDescAddOn"
                        />
                    </InputGroup>
                    <Row>
                        <Col>
                            <Button
                                variant="outline-primary"
                                type="button"
                                style={{width: "100%"}}
                                onClick={() => navigate("/my", {replace: true})}
                            >
                                취소
                            </Button>
                        </Col>
                        <Col className="col-8">
                            <Button
                                className="btn-primary"
                                type="button"
                                style={{width: "100%"}}
                                onClick={requestChangeInfo}
                                disabled={isPendingPutInfo}
                            >
                                수정하기
                            </Button>
                        </Col>
                    </Row>
                    <hr/>
                    <MyInfoExplain/>
                    {/*<div style={{fontSize: "12px"}}>*/}
                    {/*    <div>이미지 파일 용량 관련(base64이미지)로</div>*/}
                    {/*    <div>프로필 업로드 시 32 * 32 로 잘려서 출력됩니다.</div>*/}
                    {/*</div>*/}
                </Card.Body>
            </Card>
        </UserInfoLayout>
    );
}