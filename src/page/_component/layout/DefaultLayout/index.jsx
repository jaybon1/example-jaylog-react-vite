import DefaultNavbar from "/src/page/_component/common/DefaultNavbar/index.jsx";
import PropTypes from "prop-types";

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default function DefaultLayout({ children }) {
    return (
        <div className="bg-light" style={{ minHeight: "100vh" }}>
            <DefaultNavbar />
            {children}
        </div>
    );
};