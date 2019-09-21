import React, { Component } from 'react'
import { connect } from 'react-redux'

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
        <Toolbar 
          isAuth={this.props.isAuthenticated}
          showingSideDrawer={this.sideDrawerOpenHandler}/>
        <SideDrawer 
          isAuth={this.props.isAuthenticated}
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)