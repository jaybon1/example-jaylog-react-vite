
export default function ArticleCardStyle() {

    /** @type {React.CSSProperties} jaybonCardContainer */
    const articleCardContainer = {
        height: "150px",
        overflow: "hidden",
    };

    /** @type {React.CSSProperties} jaybonCardImg */
    const articleCardImg = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
    };

    /** @type {React.CSSProperties} jaybonCardText */
    const articleCardText = {
        display: "-webkit-box",
        wordWrap: "break-word",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        height: "100px",
    };

    /** @type {React.CSSProperties} jaybonCardText */
    const articleTitle = {
        cursor: "pointer",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    return {
        articleCardContainer,
        articleCardImg,
        articleCardText,
        articleTitle
    }

}