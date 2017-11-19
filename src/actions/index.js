export const toggleShape = (x, y, a) => {
    console.log(`x: ${x} y: ${y}`);
    return (dispatch) => {
        dispatch({
            type: 'SELECT_COORD',
            x: x,
            y: y,
            alphabet: a
        });
        setTimeout(() => {
            dispatch({
                type: 'SELECT_COORD',
                x: -1,
                y: -1,
                alphabet: ''
            });
        },700)
    }
}

export const showResult = () => {
    return {
        type: 'SHOW_RESULT'
    }
}
export const addTrials = (trials) => {
    return {
        type: 'ADD_TRIALS',
        trials: trials
    }
}

export const checkBoth = () => {
    return {
        type: 'CHECK_BOTH'
    }
}
export const checkPosition = () => {
    return {
        type: 'CHECK_POSITION'
    }
}

export const checkAudio = () => {
    return {
        type: 'CHECK_AUDIO'
    }
}

const alphabets = ['C', 'H', 'J', 'K', 'R', 'S', 'U', 'W', 'Z'];

// let generateTurn = () => {
//     // first generate a probability of whether
//     let x = parseInt(Math.random() * 3);
//     let y = parseInt(Math.random() * 3);

//     let alphabet = alphabets[parseInt(Math.random() * alphabets.length)];
//     return { x, y, alphabet };
// };

let generateTrials = (numBack, numTrials) => {
    // First get a probability range
    var cutoff = 0.5;
    var probPosRange = Math.random() * cutoff;
    var probAlphaRange = Math.random() * cutoff;
    var probPos = Math.random();
    var probAlpha = Math.random();
    var trials = [];
    for (var i = 0; i < numTrials; i++) {
        var turn = {
            x: parseInt(Math.random() * 3),
            y: parseInt(Math.random() * 3),
            alphabet: alphabets[parseInt(Math.random() * alphabets.length)]
        };
        if (probPos > probPosRange && i >= numBack) {
            turn.x = trials.slice(-1 * numBack)[0].x;            
            turn.y = trials.slice(-1 * numBack)[0].y;            
        }
        if (probAlpha > probAlphaRange && i >= numBack) {
            turn.alphabet = trials.slice(-1 * numBack)[0].alphabet;            
        }
        trials.push(turn);
    }
    return trials;
};

var gameTimer;

export function startGame(options) {
    return (dispatch) => {
        dispatch({ type: 'START_GAME' });
        var trials = generateTrials(options.numBack, options.numTrials);
        dispatch(addTrials(trials));
        let cnt = 0;
        setTimeout(() => {
            var t = trials[cnt];
            // for the first display of turns, set a 1 sec delay; subsequent delays are based on options
            dispatch(toggleShape(t.x, t.y, t.alphabet));
            dispatch({type: 'DECREMENT_TURN'});
            
            gameTimer = setInterval(() => {
                dispatch(checkBoth());
                cnt++;
                if (cnt < options.numTrials) {
                    t = trials[cnt];                
                    dispatch(toggleShape(t.x, t.y, t.alphabet));
                    dispatch({type: 'DECREMENT_TURN'});
                } 
                else {
                    dispatch(toggleShape(-1, -1, ''));
                    dispatch(showResult());
                    dispatch(stopGame());       
                }
                // play audio
            }, options.delay);
        }, 1000);
    }
}

export const stopGame = () => {
    return (dispatch) => {
        console.log("clearing interval");
        dispatch(toggleShape(-1, -1, ''));
        clearInterval(gameTimer);
        dispatch({ type: 'STOP_GAME' });
    }
}

export const pressPosition = () => ({ type: 'PRESS_POSITION' });

export const pressAudio = () => ({ type: 'PRESS_AUDIO' });

export const closeResult = () => ({ type: 'CLOSE_RESULT'});
