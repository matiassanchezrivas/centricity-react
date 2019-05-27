import React, { Component } from 'react'
import { I18n } from '@aws-amplify/core';
import dict from '../../i18n/i18n.json'
import _ from 'lodash'
import roles from '../../constants/roles'

I18n.putVocabularies(dict);
I18n.setLanguage('es');


const menu = [
  { name: "MENU_ADMIN_DASHBOARD", class: '', ref: '', roles: [roles.CH_SYSTEM_ADMIN] },
  { name: "MENU_DASHBOARD", class: '', ref: '', roles: ['admin'] },
  { name: "MENU_GROUPS", class: '', ref: '', roles: [] },
  {
    name: "COMPONENTS",
    class: '', ref: '', roles: [], submenu: [
      { name: "MENU_BACK", class: '', ref: '', roles: [] },
      { name: "SERVERS", class: '', ref: '', roles: [] },
      { name: "LOAD_BALANCERS", class: '', ref: '', roles: [] },
      {
        name: "STORAGE",
        class: '', ref: '', roles: [], submenu: [
          { name: "MENU_BACK", class: '', ref: '', roles: [] },
          { name: "VOLUMES", class: '', ref: '', roles: [] },
          { name: "MENU_SNAPSHOTS", class: '', ref: '', roles: [] },
        ]
      }
      ,
      { name: "MENU_SECURITY_GROUPS", class: '', ref: '', roles: [roles.CH_USER, roles.CH_USER_ADMIN, roles.CH_USER_LIMITED, roles.CH_SYSTEM_ADMIN] },
    ]
  }
  ,

  { name: "MENU_MAP_DISTRIBUTION", class: '', ref: '', roles: [] },
  { name: "MENU_SCHEDULING", class: '', ref: '', roles: [] },
  { name: "MENU_WORKSPACES", class: '', ref: '', roles: [] },
  { name: "MENU_APPSTREAM", class: '', ref: '', roles: [] },
  { name: "MENU_CONNECT", class: '', ref: '', roles: [] },
  {
    name: "MENU_MEDIABOX",
    class: '', ref: '', roles: [], submenu: [
      { name: "MENU_BACK", class: '', ref: '', roles: [] },
      { name: "MEDIA_BOX_STREAM_MANAGER", class: '', ref: '', roles: [] },
      { name: "MEDIA_BOX_PAST_EVENTS", class: '', ref: '', roles: [] },
      { name: "MEDIA_BOX_MEDIA_LIBRARY", class: '', ref: '', roles: [] },
      { name: "MEDIA_BOX_STATS", class: '', ref: '', roles: [] },]
  }
  ,
  { name: "MENU_CREDENTIALS", class: '', ref: '', roles: [roles.CH_USER, roles.CH_USER_ADMIN, roles.CH_USER_LIMITED, roles.CH_SYSTEM_ADMIN] },
  { name: "MENU_CUSTOMER_SETTINGS", class: '', ref: '', roles: [roles.CH_SYSTEM_ADMIN] },
  { name: "LOGS_REPORTS", class: '', ref: '', roles: [roles.CH_SYSTEM_ADMIN, roles.CH_USER, roles.CH_USER_ADMIN, roles.CH_USER_LIMITED] },
  { name: "MENU_SETTINGS", class: '', ref: '', roles: [roles.CH_USER, roles.CH_USER_ADMIN, roles.CH_USER_LIMITED] }]

const hardcodedRoles = ['CH_SYSTEM_ADMIN']

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  renderMenu(menu, roles) {
    return (
      <ul>
        {menu.map(item => {
          console.log(item, _.intersection(item.roles, roles))
          return item.roles.length == 0 || _.intersection(item.roles, roles).length > 0 ?
            <li ng-if="isAuthorized([roles.CH_SYSTEM_ADMIN])">
              <a href ui-sref="app.admin-dashboard" ui-sref-active="active" data-icon-after={item.submenu && '&#xe5cd;'} class="ch-menu__link">{I18n.get(item.name)}</a>
            </li>
            : null
        }
        )}
      </ul>

    )
  }

  render() {
    return (
      <nav id="ch-menu" class="ch-menu" menu>
        <div class="ch-level">
          <h2>{I18n.get("MENU_HEADLINE")}</h2>
          <ul>
            {this.renderMenu(menu, ['admin'])}
          </ul>
        </div>
      </nav>
    )
  }
}
export default Sidebar