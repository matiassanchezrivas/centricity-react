import React, { Component } from 'react'
import logoHeader from '../../images/logo-header.png'
import logoHeaderSmall from '../../images/logo-header-small.png'

const user = {
  name: 'matias',
  lastName: 'sanchez'
}


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { toggleMenu, menuOpen } = this.props
    const loading = true;
    const loadingBlock = false;
    return (
      <div class="topbar">
        {/* Button toggle menu */}
        <button onClick={toggleMenu} type="button" role="button" aria-label="Toggle Navigation" className={`lines-button x js-menu-trigger ${menuOpen && 'close-menu'}`} ng-show="isAuthorized([roles.CH_USER,roles.CH_USER_ADMIN,roles.CH_USER_LIMITED]) || (isAuthorized([roles.CH_SYSTEM_ADMIN]) && customer)">
          <span class="lines"></span>
        </button>
        {/* Logo */}
        <img class="logo" src={logoHeader} ng-click="go('app.dashboard')" />
        <img class="logo-small" src={logoHeaderSmall} ng-click="go('app.dashboard')" />
        {/* Loading */}
        <div class="loading" ng-class="{'active animated fadeIn': loading && !loadingBlock }"></div>
        {/* User bar */}
        <div className={`userbar animated ${(loading && !loadingBlock) && 'fadeOut'} ${!loading && 'fadeIn'}`}>
          <div class="welcomebar">
            <img class="gravatar" gravatar-src="user.email" gravatar-size="42" />
            <span class="usermenu--welcome">
              {'WELCOME'} <span class="usermenu__name">{`${user.name} ${user.lastName}`}</span>
            </span>
            <span class="usermenu" data-animation="am-flip-x" bs-dropdown="dropdown" data-placement="bottom-right">
              {'WELCOME'} <span class="usermenu__name" data-icon-after="&#xe5ca">{`${user.name} ${user.lastName}`}</span>
            </span>
          </div>
          <button type="button" role="button" aria-label="Log out" class="userbar__logout" ng-if="isAuthorized([roles.CH_USER_ADMIN,roles.CH_USER_LIMITED, roles.CH_USER])" ng-click="$emit('logout')"></button>
          <div class="clientsbar" ng-if="isAuthorized([roles.CH_SYSTEM_ADMIN])">
            <div class="adminmenu" data-icon-after="&#xe4ba" ng-click="openClientsPanel()">
              <span ng-if="customer != null">{'customer.name'}</span>
              <span ng-if="customer == null" >ADMIN_MENU_CLIENTS_SELECTION</span>
            </div>
          </div>
        </div>
        {/* User bar responsive */}
        <div class="user-bar-responsive" ng-class="{'animated fadeOut': loading && !loadingBlock, 'animated fadeIn': !loading }">
          <div class="usermenu" data-animation="am-flip-x" bs-dropdown="dropdown" data-placement="bottom-right"></div>
          <div class="clientmenu" ng-if="isAuthorized([roles.CH_SYSTEM_ADMIN])">&#xe0e6;</div>
        </div>
      </div>
    )
  }
}

export default Header




