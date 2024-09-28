import LogoImg from "/src/asset/image/jaylog.png";
import {Anchor, Button, Container, Dropdown, Form, Image, InputGroup, Navbar, NavDropdown, Row,} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuthStoreGlobal, useSearchStoreGlobal} from "/src/store/provider/StoreProvider.jsx";

export default function DefaultNavbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const authStoreGlobal = useAuthStoreGlobal();
    const {searchValue, setSearchValue} = useSearchStoreGlobal();

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
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </Form>
                    )}
                    <div>
                        <InputGroup>
                            <div>
                                {authStoreGlobal.loginUser ? (
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
                                {authStoreGlobal.loginUser && (
                                    <NavDropdown
                                        title={
                                            <Image
                                                src={authStoreGlobal.loginUser.profileImage}
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
                                        {/*<Dropdown.Divider className="d-md-none"/>*/}
                                        <Link to={"/my"} className="dropdown-item">
                                            내 제이로그
                                        </Link>
                                        <Dropdown.Divider/>
                                        <Anchor
                                            href="#"
                                            onClick={() => {
                                                localStorage.removeItem("accessJwt");
                                                localStorage.removeItem("refreshJwt");
                                                authStoreGlobal.setLoginUser(null);
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

