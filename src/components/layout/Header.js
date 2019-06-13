import React, { Component } from 'react'
import logoHeader from '../../images/logo-header.png'
import logoHeaderSmall from '../../images/logo-header-small.png'
import Dropdown from '../../components/Dropdown'
import { connect } from 'react-redux';
import I18n from '../../config/i18n'
I18n.setLanguage('en');

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownMenu: false,
    }
  }

  render() {
    const { toggleClientsBar, toggleOptionsBar, menuOpen, currentUser, currentClient, loading, loadingBlock } = this.props
    const { dropdownMenu } = this.state;
    const isAuthorized = () => true
    return (
      <div className="topbar">
        {/* Button toggle menu */}
        <button onClick={toggleOptionsBar} type="button" role="button" aria-label="Toggle Navigation" className={`lines-button x js-menu-trigger ${menuOpen && 'close-menu'}`} ng-show="isAuthorized([roles.CH_USER,roles.CH_USER_ADMIN,roles.CH_USER_LIMITED]) || (isAuthorized([roles.CH_SYSTEM_ADMIN]) && customer)">
          <span className="lines"></span>
        </button>
        {/* Logo */}
        <img className="logo" src={logoHeader} onClick={window.location.replace('/#/dashboard')} />
        <img className="logo-small" src={logoHeaderSmall} onClick="go('app.dashboard')" />
        {/* Loading */}
        {loading && !loadingBlock && <div className='active animated fadeIn'></div>}
        {/* User bar */}
        <div className={`userbar animated ${(loading && !loadingBlock) && 'fadeOut'} ${!loading && 'fadeIn'}`}>
          <div className="welcomebar">
            <img className="gravatar" gravatar-src={currentUser.email} gravatar-size="42" />
            <span className="usermenu--welcome">
              {I18n.get('WELCOME')} <span className="usermenu__name">{`${currentUser.name} ${currentUser.lastName}`}</span>
            </span>
            <span className="usermenu" data-animation="am-flip-x" bs-dropdown="dropdown" data-placement="bottom-right">
              {I18n.get('WELCOME')} <span className="usermenu__name" onClick={() => this.setState({ dropdownMenu: !dropdownMenu })} data-icon-after="&#xe5ca;">{`${currentUser.name} ${currentUser.lastName}`}</span>
            </span>
            {dropdownMenu && <Dropdown />}
          </div>
          <button type="button" role="button" aria-label="Log out" className="userbar__logout" ng-if="isAuthorized([roles.CH_USER_ADMIN,roles.CH_USER_LIMITED, roles.CH_USER])" ng-click="$emit('logout')"></button>

          {/* CLIENTS BAR */}
          {isAuthorized() && <div className="clientsbar">
            <div className="adminmenu" onClick={toggleClientsBar} data-icon-after="&#xe4ba;">
              <span>{currentClient ? currentClient.name : I18n.get('ADMIN_MENU_CLIENTS_SELECTION')}</span>
            </div>
          </div>}

        </div>
        {/* User bar responsive */}
        {/* <div className="user-bar-responsive" ng-className="{'animated fadeOut': loading && !loadingBlock, 'animated fadeIn': !loading }">
          <div className="usermenu" data-animation="am-flip-x" bs-dropdown="dropdown" data-placement="bottom-right"></div>
          <div className="clientmenu" ng-if="isAuthorized([roles.CH_SYSTEM_ADMIN])">&#xe0e6;</div>
        </div> */}
      </div >
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
    currentClient: state.clients.currentClient
  };
}

export default connect(mapStateToProps, null)(Header);




