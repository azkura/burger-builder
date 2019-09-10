import React from 'react'
import classes from './ToggleButton.css'

const toggleButton = (props) => (
  <div className={classes.ToggleButton} onClick={props.click}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default toggleButton