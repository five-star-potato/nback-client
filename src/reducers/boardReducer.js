var defaultState = () => ({
    coords: {
        x: -1,
        y: -1,
        alphabet: ''
    }
});

const boardReducer = (state = defaultState(), action) => {
    switch (action.type) {
        case 'SELECT_COORD':
            return { ...state, coords: { x: action.x, y: action.y, alphabet: action.alphabet } };
        default:
            return state
    }
}

export default boardReducer;