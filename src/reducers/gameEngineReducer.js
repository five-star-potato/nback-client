var defaultState = () => ({
    options: {
        delay: 2000,
        numTrials: 5,
        numBack: 1
    },
    showResult: false,
    gameStarted: false,
    numTrialsLeft: 5,
    turns: [],
    position_pressed: false,
    audio_pressed: false,
    score: {
        pct: 0.0,
        numAudioTP: 0,  // hit the right audio      True Positive
        numAudioTN: 0,
        numAudioFP: 0,  // hit the wrong audio      False Positive
        numAudioFN: 0,  // miss the right audio     False Negative  
        numPositionTP: 0,  // hit the right position    True Positive
        numPositionTN: 0,
        numPositionFP: 0,  // hit the wrong position    False Positive
        numPositionFN: 0  // miss the right position   False Negative 
    }
});

const calculateScore = (s) => ((s.numPositionTP + s.numAudioTP) * 100.0 /
    (s.numPositionTP + s.numAudioTP + s.numPositionFP + s.numAudioFP + s.numPositionFN + s.numAudioFN))
    || 0; // convert NaN to 0

const gameEngineReducer = (state = defaultState(), action) => {
    switch (action.type) {
        case 'DECREMENT_TURN': {
            return { ...state, 
                position_pressed: false,
                audio_pressed: false,
                numTrialsLeft: state.numTrialsLeft - 1 
            };
        }
        case 'CLOSE_RESULT': {
            return { ...state, showResult: false };
        } break;
        case 'SHOW_RESULT': {
            return { ...state, showResult: true };
        } break;

        case 'START_GAME': {
            return { ...defaultState(), gameStarted: true, numTrialsLeft: state.options.numTrials };
        } break;

        case 'STOP_GAME': {
            return { ...state, gameStarted: false };
        } break;

        case 'PRESS_POSITION': {
            console.log("position pressed");
            return { ...state, position_pressed: true }
        } break;

        case 'PRESS_AUDIO': {
            console.log("audio pressed");
            return { ...state, audio_pressed: true }
        } break;

        case 'ADD_TRIALS': {
            //console.log(state.turns);
            return {
                ...state,
                turns: JSON.parse(JSON.stringify(action.trials))
            };
        } break;

        case 'CHECK_POSITION': {
            var newState = { ...state };
            if (state.position_pressed && state.turns.length > state.options.numBack) {
                let lastEle = state.turns.slice(-1)[0]; // last element
                let t = state.turns[state.turns.length - state.options.numBack - 1];
                if (t.x === lastEle.x && t.y === lastEle.y)
                    // Pressing POS is correct
                    newState.score.numPositionTP++;
                else    // Pressing POS is incorrect
                    newState.score.numPositionFP++;
            }
            else { // not enough count yet; you shouldn't have pressed
                newState.score.numPositionFP++
            }
            newState.score.pct = calculateScore(newState.score);
            return newState;
        } break;

        case 'CHECK_AUDIO': {
            var newState = { ...state };
            if (state.audio_pressed && state.turns.length > state.options.numBack) {
                let lastEle = state.turns.slice(-1)[0]; // last element
                let t = state.turns[state.turns.length - state.options.numBack - 1];
                if (t.alphabet === lastEle.alphabet)
                    // Pressing POS is correct
                    newState.score.numAudioTP++;
                else    // Pressing POS is incorrect
                    newState.score.numAudioFP++;
            }
            else { // not enough count yet; you shouldn't have pressed
                newState.score.numAudioFP++
            }
            newState.score.pct = calculateScore(newState.score);
            return newState;
        } break;

        case 'CHECK_BOTH': {
            // check to see if the user has missed pressing the buttons at the right moment
            var newState = { ...state };
            if (state.turns.length > state.options.numBack) {
                let lastEle = state.turns.slice(-1)[0]; // last element
                let t = state.turns[state.turns.length - state.options.numBack - 1];

                if (!state.position_pressed && t.x === lastEle.x && t.y === lastEle.y)
                    // Missed pressing button
                    newState.score.numPositionFN++;
                if (!state.position_pressed && (t.x !== lastEle.x || t.y !== lastEle.y))
                    // don't press is the right decision
                    newState.score.numPositionTN++;

                // don't care if button is pressed (handled by CHECK_POSITION or AUDIO), or if positions doesn't match

                if (!state.audio_pressed && t.alphabet === lastEle.alphabet)
                    // Missed pressing button
                    newState.score.numAudioFN++;
                if (!state.audio_pressed && t.alphabet != lastEle.alphabet)
                    // don't press is the right decision
                    newState.score.numAudioTN++;

            }
            newState.score.pct = calculateScore(newState.score);
            return newState;
        } break;

        default:
            return state;
            break;
    }
}

export default gameEngineReducer;