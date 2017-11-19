import React, { Component } from 'react';
import { connect } from 'react-redux';
import HUD from './HUD';
import * as act from '../actions';

const mapStateToProps = state => {
    return {
        gameStarted: state.game.gameStarted,
        options: state.game.options,
        numTrialsLeft: state.game.numTrialsLeft, 
        tpScore: (state.game.score.numPositionTP + state.game.score.numAudioTP), 
        fpScore: (state.game.score.numPositionFP + state.game.score.numAudioFP),
        fnScore: (state.game.score.numPositionFN + state.game.score.numAudioFN),
        pct: state.game.score.pct
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onStartClick: (opt) => {
            dispatch(act.startGame(opt));
        },
        onStopClick: () => {
            dispatch(act.stopGame());
        },
        
    };
};

const HUDContainer = connect(mapStateToProps, mapDispatchToProps)(HUD);

export default HUDContainer;
