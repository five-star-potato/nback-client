import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import * as act from '../actions';

const mapStateToProps = state => {
    return {
        coords: state.board.coords,
        showResult: state.game.showResult,
        score: state.game.score
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCloseResult: () => {
            dispatch(act.closeResult());
        }
    };
};


const BoardContainer = connect(mapStateToProps,mapDispatchToProps)(Board);

export default BoardContainer;
