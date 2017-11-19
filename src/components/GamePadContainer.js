import React, { Component } from 'react';
import { connect } from 'react-redux';
import GamePad from './GamePad';
import * as act from '../actions';

const mapStateToProps = state => {
    return {
        positionDisabled: state.game.position_pressed,
        audioDisabled: state.game.audio_pressed
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onPositionClick: () => {
            dispatch(act.pressPosition());
            dispatch(act.checkPosition());
        },
        onAudioClick: () => {
            dispatch(act.pressAudio());
            dispatch(act.checkAudio());
        }
    };
};

const GamePadContainer = connect(mapStateToProps, mapDispatchToProps)(GamePad);

export default GamePadContainer;
