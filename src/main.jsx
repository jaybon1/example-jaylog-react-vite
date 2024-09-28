import ReactDOM from "react-dom/client";
import App from "/src/App.jsx";
import "/src/style/minireset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {StoreProvider} from "/src/store/provider/StoreProvider.jsx";
import {ViewModelProvider} from "/src/viewmodel/provider/ViewModelProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StoreProvider>
        <ViewModelProvider>
            <App/>
        </ViewModelProvider>
    </StoreProvider>
);
