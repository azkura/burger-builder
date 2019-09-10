import React from 'react'
import classes from './Toolbar.css'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import ToggleButton from '../../Navigation/SideDrawer/ToggleButton/ToggleButton'

const toolbar = props => (
  <header className={classes.Toolbar}>
    <ToggleButton click={props.showingSideDrawer}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
)

export default toolbar