import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import PropTypes from 'prop-types';
import '../App.css';

const HUD = ({ gameStarted, options, numTrialsLeft, tpScore, fpScore, fnScore, pct, onStartClick, onStopClick }) => {
    let btnText = gameStarted ? "Stop Game" : "Start Game";
    let toggleGame = () => {
        if (gameStarted) {
            onStopClick();
        }
        else {
            onStartClick(options);
        }
    }
    return (
        <div className="row">
            <div className="col-md-5 col-lg-5 col-sm-5 col-xs-5">
                <ButtonToolbar style={{ marginLeft: "0.5em" }}>
                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle={ gameStarted ? "danger" : "success"} onClick={ () => toggleGame() } >{btnText}</Button>
                </ButtonToolbar>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                <ul className="HUD-text">
                    <li>Number of trials left: {numTrialsLeft}</li>
                    <li>TP: <span>{tpScore}</span> FP: <span>{fpScore}</span> FN: <span>{fnScore}</span> PCT: <span>{Math.round(pct)}</span></li>
                </ul>
            </div>
        </div>
    );
}

export default HUD;
