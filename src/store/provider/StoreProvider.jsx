import {createContext, useContext} from "react";
import PropTypes from "prop-types";
import useAuthStoreLocal from "/src/store/useAuthStoreLocal.jsx";
import useSearchStoreLocal from "/src/store/useSearchStoreLocal.jsx";

const StoreContext = createContext(null);

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export function StoreProvider({children}) {

    return (
        <StoreContext.Provider
            value={{
                authStore: useAuthStoreLocal(),
                searchStore: useSearchStoreLocal()
            }}
        >
            {children}
        </StoreContext.Provider>
    );

}

export function useAuthStoreGlobal() {
    return useContext(StoreContext).authStore;
}

export function useSearchStoreGlobal() {
    return useContext(StoreContext).searchStore;
}