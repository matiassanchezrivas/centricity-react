import React, { Component } from 'react'
import logoHeader from '../../images/logo-header.png'
import logoHeaderSmall from '../../images/logo-header-small.png'
import { connect } from 'react-redux';
import I18n from '../../config/i18n'
I18n.setLanguage('en');

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { toggleMenu, menuOpen, currentUser, currentClient, loading, loadingBlock } = this.props
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
        {loading && !loadingBlock && <div class="loading" className='active animated fadeIn'></div>}
        {/* User bar */}
        <div className={`userbar animated ${(loading && !loadingBlock) && 'fadeOut'} ${!loading && 'fadeIn'}`}>
          <div class="welcomebar">
            <img class="gravatar" gravatar-src="user.email" gravatar-size="42" />
            <span class="usermenu--welcome">
              {I18n.get('WELCOME')} <span class="usermenu__name">{`${currentUser.name} ${currentUser.lastName}`}</span>
            </span>
            <span class="usermenu" data-animation="am-flip-x" bs-dropdown="dropdown" data-placement="bottom-right">
              {I18n.get('WELCOME')} <span class="usermenu__name" data-icon-after="&#xe5ca;">{`${currentUser.name} ${currentUser.lastName}`}</span>
            </span>
          </div>
          <button type="button" role="button" aria-label="Log out" class="userbar__logout" ng-if="isAuthorized([roles.CH_USER_ADMIN,roles.CH_USER_LIMITED, roles.CH_USER])" ng-click="$emit('logout')"></button>
          <div class="clientsbar" ng-if="isAuthorized([roles.CH_SYSTEM_ADMIN])">
            <div class="adminmenu" data-icon-after="&#xe4ba;" ng-click="openClientsPanel()">
              <span>{currentClient ? currentClient.name : I18n.get('ADMIN_MENU_CLIENTS_SELECTION')}</span>
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

const mapDispatchToProps = function (dispatch) {
  return (
    {}
  )
}

const mapStateToProps = function (state) {
  return {
    currentUser: state.users.currentUser,
    currentClient: null
  };
}

export default connect(mapStateToProps, null)(Header);




