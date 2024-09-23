import LogoImg from "/src/asset/image/jaylog.png";
import {Anchor, Button, Container, Dropdown, Form, Image, InputGroup, Navbar, NavDropdown, Row,} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuthStore, useSearchStore} from "/src/store/provider/StoreProvider.jsx";

export default function DefaultNavbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const authStore = useAuthStore();
    const searchStore = useSearchStore();
    //
    // const searchInputRef = useRef();
    //
    // useEffect(() => {
    //     const keyupHandler = (e) => {
    //         if (e.key === "Enter") {
    //             console.log("searchInputRef.current.value", searchInputRef.current.value);
    //         }
    //     }
    //     searchInputRef.current.addEventListener("keyup", keyupHandler);
    //     return () => {
    //         searchInputRef.current.removeEventListener("keyup", keyupHandler);
    //     };
    // }, []);

    return (
        <div
            className="sticky-top shadow"
            style={{backgroundColor: "rgba(255, 255, 255, 0.95)"}}
        >
            <Navbar>
                <Container>
                    <Link to={"/"} className="navbar-brand fs-3 text-dark">
                        <Image src={LogoImg} style={{height: "50px"}}/>
                    </Link>
                    {location.pathname === "/" && (
                        <Form className="d-none d-sm-none d-md-flex">
                            <Form.Control
                                type="text"
                                placeholder="검색어를 입력하세요."
                                value={searchStore.search}
                                onChange={(e) => searchStore.setSearch(e.target.value)}
                            />
                        </Form>
                    )}
                    <div>
                        <InputGroup>
                            <div>
                                {authStore.loginUser ? (
                                    <Button
                                        className="rounded-pill btn-dark px-3"
                                        type="button"
                                        onClick={() => navigate("/article/write")}
                                    >
                                        새 글 작성
                                    </Button>
                                ) : (
                                    <Button
                                        className="rounded-pill btn-dark px-3"
                                        type="button"
                                        onClick={() => navigate("/auth/login")}
                                    >
                                        로그인
                                    </Button>
                                )}
                            </div>
                            <Row className="align-content-center ms-3">
                                {authStore.loginUser && (
                                    <NavDropdown
                                        title={
                                            <Image
                                                src={authStore.loginUser.profileImage}
                                                className="ratio ratio-1x1 rounded-circle me-2"
                                                style={{width: "24px", height: "24px"}}
                                            />
                                        }
                                    >
                                        {/*<div className="dropdown-item d-md-none">*/}
                                        {/*    <Form className="d-flex">*/}
                                        {/*        <Form.Control*/}
                                        {/*            type="text"*/}
                                        {/*            placeholder="search"*/}
                                        {/*            value={searchStore.search}*/}
                                        {/*            onChange={searchChangeHandler}*/}
                                        {/*        />*/}
                                        {/*    </Form>*/}
                                        {/*</div>*/}
                                        <Dropdown.Divider className="d-md-none"/>
                                        <Link to={"/my"} className="dropdown-item">
                                            내 제이로그
                                        </Link>
                                        <Dropdown.Divider/>
                                        <Anchor
                                            href="#"
                                            onClick={() => {
                                                localStorage.removeItem("accessJwt");
                                                localStorage.removeItem("refreshJwt");
                                                authStore.setLoginUser(null);
                                                navigate("/main", {replace: true});
                                            }}
                                            className="dropdown-item"
                                        >
                                            로그아웃
                                        </Anchor>
                                    </NavDropdown>
                                )}
                            </Row>
                        </InputGroup>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}

