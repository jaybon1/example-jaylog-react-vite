import {useLocation, useNavigate} from "react-router-dom";
import LikeImg from "/src/asset/image/like.svg";
import LikeRedImg from "/src/asset/image/like-red.svg";
import NoImageImg from "/src/asset/image/no-image.png";
import {Card, Col, Image, InputGroup, Row} from "react-bootstrap";
import ArticleCardStyle from "/src/view/_component/common/ArticleCard/style.jsx";
import PropTypes from "prop-types";

ArticleCard.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number.isRequired,
        writer: PropTypes.shape({
            username: PropTypes.string.isRequired,
            profileImage: PropTypes.string.isRequired
        }).isRequired,
        title: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        thumbnail: PropTypes.string,
        likeCount: PropTypes.number.isRequired,
        isLikeClicked: PropTypes.bool.isRequired,
        createDate: PropTypes.string.isRequired
    }).isRequired
};

export default function ArticleCard(props) {

    const {article} = props;

    const style = ArticleCardStyle();

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Col>
            <Card className="m-3">
                <div style={style.articleCardContainer}>
                    <Card.Img
                        variant="top"
                        src={article.thumbnail ? article.thumbnail : NoImageImg}
                        style={style.articleCardImg}
                        alt="..."
                    />
                </div>
                <Card.Body>
                    <Card.Title
                        onClick={() => {
                            const searchParams = new URLSearchParams(location.search);
                            searchParams.set("from", btoa(`${location.pathname}?${searchParams.toString()}`));
                            navigate(`/article/${article.id}?${searchParams.toString()}`);
                        }}
                        style={style.articleTitle}
                    >
                        {article.title}
                    </Card.Title>
                    <Card.Text style={style.articleCardText}>{article.summary}</Card.Text>
                    <small className="text-muted">{article.createDate}</small>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col>
                            <InputGroup>
                                <Image
                                    src={article.writer.profileImage}
                                    alt="profile"
                                    className="ratio ratio-1x1 rounded-circle me-2"
                                    style={{width: "24px", height: "24px"}}
                                />
                                <strong>{article.writer.username}</strong>
                            </InputGroup>
                        </Col>
                        <Col className="col-auto">
                            <InputGroup>
                                <Image
                                    src={
                                        article.isLikeClicked
                                            ? LikeRedImg
                                            : LikeImg
                                    }
                                    width="15"
                                />
                                <span className="mx-2 fs-6 text-black-50 fw-light">
                                  {article.likeCount}
                                </span>
                            </InputGroup>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Col>
    );
}