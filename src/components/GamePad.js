import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import '../App.css';

var buttonStyle = {
    marginLeft: "0.5em",
    marginTop: "1em"
}


const GamePad = ({ positionDisabled, audioDisabled, onPositionClick, onAudioClick }) => {
    return (
        <div className="row" style={{ marginTop: "1em" }}>
            <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
                <Button disabled={positionDisabled} style={buttonStyle} onClick={() => onPositionClick()} className="btn-lg btn-warning ">Position (A)</Button>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                <Button disabled={audioDisabled} style={buttonStyle} onClick={() => onAudioClick()} className="btn-lg btn-warning">Sound (L)</Button>
            </div>
        </div>
    );
}
GamePad.propTypes = {
    onPositionClick: PropTypes.func.isRequired,
    onAudioClick: PropTypes.func.isRequired,
}

export default GamePad;
