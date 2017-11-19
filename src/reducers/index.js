import { combineReducers } from 'redux';
import board from './boardReducer';
import game from './gameEngineReducer';
import options from './optionsReducer';

const gameApp = combineReducers({
    board,
    game,
    options
});

export default gameApp;