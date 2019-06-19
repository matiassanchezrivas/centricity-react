import React, { Component } from 'react'
import dict from '../../i18n/i18n.json'
import _ from 'lodash'
import roles from '../../constants/roles'
import config_menu from '../../config/menu'
import config from '../../config/config'
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import I18n from '../../config/i18n'

const menu = [
  { name: "MENU_ADMIN_DASHBOARD", class: '', ref: "app.admin-dashboard", roles: [roles.CH_SYSTEM_ADMIN] },
  { name: "MENU_DASHBOARD", class: '', ref: "app.dashboard", roles: ['admin'] },
  { name: "MENU_GROUPS", class: '', ref: "app.groups", roles: [] },
  {
    name: "COMPONENTS",
    class: '', ref: '', roles: [], submenu: [
      { name: "MENU_BACK", class: '', ref: '', roles: [] },
      { name: "SERVERS", class: '', ref: "app.servers", roles: [] },
      { name: "LOAD_BALANCERS", class: '', ref: 'app.load-balancers', roles: [] },
      {
        name: "STORAGE",
        class: '', ref: '', roles: [], submenu: [
          { name: "MENU_BACK", class: '', ref: '', roles: [] },
          { name: "VOLUMES", class: '', ref: "app.volumes", roles: [] },
          { name: "MENU_SNAPSHOTS", class: '', ref: "app.snapshots", roles: [] },
        ]
      }
      ,
      { name: "MENU_SECURITY_GROUPS", class: '', ref: "app.security-groups", roles: [roles.CH_USER, roles.CH_USER_ADMIN, roles.CH_USER_LIMITED, roles.CH_SYSTEM_ADMIN] },
    ]
  }
  ,

  { name: "MENU_MAP_DISTRIBUTION", class: '', ref: "app.map-distribution", roles: [] },
  { name: "MENU_SCHEDULING", class: '', ref: "app.scheduling", roles: [] },
  { name: "MENU_WORKSPACES", class: '', ref: "app.workspaces", roles: [] },
  { name: "MENU_APPSTREAM", class: '', ref: "app.appstream", roles: [] },
  { name: "MENU_CONNECT", class: '', ref: "app.connect", roles: [] },
  {
    name: "MENU_MEDIABOX",
    class: '', ref: '', roles: [], submenu: [
      { name: "MENU_BACK", class: '', ref: '', roles: [] },
      { name: "MEDIA_BOX_STREAM_MANAGER", class: '', ref: "app.mediabox_stream_manager", roles: [] },
      { name: "MEDIA_BOX_PAST_EVENTS", class: '', ref: "app.mediabox_past_events", roles: [] },
      { name: "MEDIA_BOX_MEDIA_LIBRARY", class: '', ref: "app.mediabox_media_library", roles: [] },
      { name: "MEDIA_BOX_STATS", class: '', ref: '', roles: [] },]
  }
  ,
  { name: "MENU_CREDENTIALS", class: '', ref: "app.credentials", roles: [roles.CH_USER, roles.CH_USER_ADMIN, roles.CH_USER_LIMITED, roles.CH_SYSTEM_ADMIN] },
  { name: "MENU_CUSTOMER_SETTINGS", class: '', ref: "app.customer-settings", roles: [roles.CH_SYSTEM_ADMIN] },
  { name: "LOGS_REPORTS", class: '', ref: "app.logs-report", roles: [roles.CH_SYSTEM_ADMIN, roles.CH_USER, roles.CH_USER_ADMIN, roles.CH_USER_LIMITED] },
  { name: "MENU_SETTINGS", class: '', ref: "app.customer-settings", roles: [roles.CH_USER, roles.CH_USER_ADMIN, roles.CH_USER_LIMITED] },
  { name: "MENU_CLOUDFORMATION_TEMPLATES", onClick: '/cloudformationTemplates', class: '', ref: "app.customer-settings", roles: [roles.CH_USER, roles.CH_USER_ADMIN, roles.CH_USER_LIMITED] },
  { name: "MENU_CONFIGURATIONS", class: '', onClick: '/configurations', ref: "app.customer-settings", roles: [roles.CH_USER, roles.CH_USER_ADMIN, roles.CH_USER_LIMITED] }]


class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.renderMenu = this.renderMenu.bind(this);
    this.onClickReact = this.onClickReact.bind(this);
  }

  onClickReact(link, callback) {
    this.props.history.push(link);
    if (callback) callback();
  }

  renderMenu(menu, roles) {
    const { toggleOptionsBar } = this.props;
    const { languaje } = this.props;
    I18n.setLanguage(languaje);
    return (
      <ul>
        {menu.map(item => {
          const only = config_menu[item.ref] && config_menu[item.ref].data && config_menu[item.ref].data.permissions && config_menu[item.ref].data.permissions.only;
          return item.roles.length == 0 || !only || _.intersection(item.roles, only).length > 0 ?
            <li>
              {
                item.submenu ?
                  <a href={item.ref && config.CENTRICITY_FRONT + '/#' + config_menu[item.ref].url} ui-sref-active="active" data-icon-after='&#xe5cd;' class="ch-menu__link">{I18n.get(item.name)}</a> :
                  <a onClick={item.onClick ? () => this.onClickReact(item.onClick, toggleOptionsBar) : null} href={item.onClick ? null : item.ref && config.CENTRICITY_FRONT + '/#' + config_menu[item.ref].url} ui-sref-active="active" class="ch-menu__link">{I18n.get(item.name)}</a>
              }
            </li>
            : null
        }
        )}
      </ul>
    )
  }

  render() {
    const { currentUser } = this.props;
    return (
      <nav id="ch-menu" class="ch-menu" menu>
        <div class="ch-level">
          <h2>{I18n.get("MENU_HEADLINE")}</h2>
          <ul>
            {this.renderMenu(menu, currentUser.roles)}
          </ul>
        </div>
      </nav>
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
    currentClient: null,
    languaje: state.settings.currentLanguaje,
  };
}

export default connect(mapStateToProps, null)(withRouter(Sidebar));