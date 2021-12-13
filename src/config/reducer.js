

const reducer = (state, action) => {
    if( action.type === 'CHECKED_FOOTER_NAV_ITEM') {
        return { ...state, checkedFooterNavItem: action.payload }
    }
    if( action.type === 'OPEN_SEARCH_INPUT') {
        return { ...state, isSearch: action.payload }
    }
    if( action.type === 'LOGIN') {
        return { ...state, isLogin: action.payload }
    }
    if( action.type === 'LOGOUT') {
        return { ...state, isLogin: action.payload }
    }
    if( action.type === 'SHOW_FOOTER') {
        return { ...state, isFooter: action.payload }
    }
    if( action.type === 'HIDE_FOOTER') {
        return { ...state, isFooter: action.payload }
    }
    if( action.type === 'DOCUMENTS_ITEM') {
        return { ...state, documentsItem: action.payload }
    }
    return state
}

export default reducer