import PropTypes from "prop-types";

WriteLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function WriteLayout({children}) {
    return (
        <div
            className="bg-light"
            style={{minHeight: "100vh", overflowX: "hidden"}}
        >
            {children}
        </div>
    );
}

