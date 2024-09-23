import {createContext, useContext, useMemo} from "react";
import PropTypes from "prop-types";
import AuthStore from "/src/store/AuthStore.jsx";
import SearchStore from "/src/store/SearchStore.jsx";

const StoreContext = createContext(null);

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export function StoreProvider({children}) {

    return (
        <StoreContext.Provider
            value={{
                authStore : new AuthStore(),
                searchStore : new SearchStore()
            }}
        >
            {children}
        </StoreContext.Provider>
    );

}

export function useAuthStore(){
    return useContext(StoreContext).authStore;
}

export function useSearchStore(){
    return useContext(StoreContext).searchStore;
}