import React from 'react';
import PropTypes from 'prop-types'
import './Keyboard.css';

const Keyboard = ({keyboard, onclick}) => {
    return (<span className={`letters`} onClick={() => onclick(keyboard)}>{keyboard}</span>)
}

Keyboard.propTypes = {
    keyboard: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired,
}

export default Keyboard;