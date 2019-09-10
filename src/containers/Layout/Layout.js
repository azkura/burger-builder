import React, { Component } from 'react'
import classes from './Layout.css'

import Aux from '../Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true})
  }

  sideDrawerCloseHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar showingSideDrawer={this.sideDrawerOpenHandler}/>
        <SideDrawer 
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler} 
        />
        <main className={classes.Content}>
          { this.props.children }
        </main>
      </Aux>
    )
  }
}

export default Layout