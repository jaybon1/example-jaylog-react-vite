import {createContext, useContext} from "react";
import PropTypes from "prop-types";
import useMainViewModelLocal from "/src/viewmodel/useMainViewModelLocal.jsx";
import useMyViewModelLocal from "/src/viewmodel/useMyViewModelLocal.jsx";

const ViewModelContext = createContext(null);

ViewModelProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export function ViewModelProvider({children}) {

    return (
        <ViewModelContext.Provider
            value={{
                mainViewModel: useMainViewModelLocal(),
                myViewModel: useMyViewModelLocal(),
            }}
        >
            {children}
        </ViewModelContext.Provider>
    );

}

export function useMainViewModelGlobal() {
    return useContext(ViewModelContext).mainViewModel;
}

export function useMyViewModelGlobal() {
    return useContext(ViewModelContext).myViewModel;
}
