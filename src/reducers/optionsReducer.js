var defaultState = () => ({
    options: {
        delay: 3000,
        numTrials: 10,
        numBack: 3
    }
});

const optionsReducer = (state = defaultState(), action) => {
    switch (action.type) {
        case 'SET_OPTIONS':
            return { ...state, ...action };
        default:
            return state
    }
}

export default optionsReducer;