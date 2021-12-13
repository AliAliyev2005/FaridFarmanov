import { createContext, useContext, useReducer, useState } from "react";
import reducer from "./reducer";

const AppContect = createContext();

export const AppProvider = ({ children }) => {

	const initialState = {
		checkedFooterNavItem: "",
		isSidebarOpen: false,
        isSearch: false,
        isLogin: true,
        isFooter: true,
        documentsItem: '',
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const getCheckedFooterNavItem = (id) => {
		dispatch({ type: "CHECKED_FOOTER_NAV_ITEM", payload: id });
	};
    const openSearchInput = (bl) => {
        dispatch({ type: 'OPEN_SEARCH_INPUT', payload: bl})
    }
    const login = () => {
        dispatch({ type: 'LOGIN', payload: true})
    }
    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: false})
    }
    const showFooter = () => {
        dispatch({ type: 'SHOW_FOOTER', payload: true})
    }
    const hideFooter = () => {
        dispatch({ type: 'HIDE_FOOTER', payload: false})
    }
    const getDocumentsItem = (item) => {
        dispatch({ type: 'DOCUMENTS_ITEM', payload: item})
    }

	return (
		<AppContect.Provider
			value={{
				...state,
				getCheckedFooterNavItem,
                openSearchInput,
                login,
                logout,
                showFooter,
                hideFooter,
                getDocumentsItem,
			}}
		>
			{children}
		</AppContect.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContect);
};
