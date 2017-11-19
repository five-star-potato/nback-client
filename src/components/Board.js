import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Overlay from 'react-bootstrap/lib/Overlay';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import popover from 'react-bootstrap/lib/Popover';
import tooltip from 'react-bootstrap/lib/Tooltip';
import PropTypes from 'prop-types';
import '../App.css';
import alphabet_c from '../assets/audio/c.mp3';
import alphabet_h from '../assets/audio/h.mp3';
import alphabet_j from '../assets/audio/j.mp3';
import alphabet_k from '../assets/audio/k.mp3';
import alphabet_r from '../assets/audio/r.mp3';
import alphabet_s from '../assets/audio/s.mp3';
import alphabet_u from '../assets/audio/u.mp3';
import alphabet_w from '../assets/audio/w.mp3';
import alphabet_z from '../assets/audio/z.mp3';

var hlSquare = {
  backgroundColor: "magenta"
}
var tblCenter = {
  width: "100%",
  float: "none",
  margin: "0 auto"
}

var scoreMsg = (p) =>
  p == 0 ? "Are you still playing?" :
    p <= 20 ? "Don't give up!" :
      p <= 40 ? "You can do better!" :
        p <= 60 ? "Not bad!" :
          p <= 80 ? "You passed this level!" :
            "You can move on to the next level!";

const Board = ({ coords, showResult, score, onCloseResult }) => {
  var audio;
  switch (coords.alphabet) {
    case 'C':
      audio = new Audio(alphabet_c);
      break;
    case 'H':
      audio = new Audio(alphabet_h);
      break;
    case 'K':
      audio = new Audio(alphabet_k);
      break;
    case 'J':
      audio = new Audio(alphabet_j);
      break;
    case 'R':
      audio = new Audio(alphabet_r);
      break;
    case 'S':
      audio = new Audio(alphabet_s);
      break;
    case 'U':
      audio = new Audio(alphabet_u);
      break;
    case 'W':
      audio = new Audio(alphabet_w);
      break;
    case 'Z':
      audio = new Audio(alphabet_z);
      break;
  }
  if (audio)
    audio.play();

  return (
    <div>
      <div className="row">
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><div className="alert alert-info Square-Block" role="alert" style={coords.x === 0 && coords.y === 0 ? hlSquare : null}></div></div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><div className="alert alert-info Square-Block" role="alert" style={coords.x === 0 && coords.y === 1 ? hlSquare : null}></div></div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><div className="alert alert-info Square-Block" role="alert" style={coords.x === 0 && coords.y === 2 ? hlSquare : null}></div></div>
      </div>
      <div className="row">
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><div className="alert alert-info Square-Block" role="alert" style={coords.x === 1 && coords.y === 0 ? hlSquare : null}></div></div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><div className="alert alert-info Square-Block" role="alert" style={coords.x === 1 && coords.y === 1 ? hlSquare : null}></div></div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><div className="alert alert-info Square-Block" role="alert" style={coords.x === 1 && coords.y === 2 ? hlSquare : null}></div></div>
      </div>
      <div className="row">
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><div className="alert alert-info Square-Block" role="alert" style={coords.x === 2 && coords.y === 0 ? hlSquare : null}></div></div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><div className="alert alert-info Square-Block" role="alert" style={coords.x === 2 && coords.y === 1 ? hlSquare : null}></div></div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><div className="alert alert-info Square-Block" role="alert" style={coords.x === 2 && coords.y === 2 ? hlSquare : null}></div></div>
      </div>

      <Modal show={showResult} onHide={() => onCloseResult()}>
        <Modal.Header closeButton>
          <Modal.Title>{scoreMsg(score.pct)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your score is: {score.pct}</p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"># of correct hits</th>
                <th scope="col"># of incorrect hits</th>
                <th scope="col"># of miss</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Position</th>
                <td>{score.numPositionTP}</td>
                <td>{score.numPositionFP}</td>
                <td>{score.numPositionFN}</td>
              </tr>
              <tr>
                <th scope="row">Audio</th>
                <td>{score.numAudioTP}</td>
                <td>{score.numAudioFP}</td>
                <td>{score.numAudioFN}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onCloseResult()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Board.propTypes = {
  coords:
  PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
}

export default Board;
