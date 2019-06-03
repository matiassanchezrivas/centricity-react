import React, { Component } from 'react'
import _ from 'lodash'
import config_menu from '../../config/menu'
import config from '../../config/config'
import I18n from '../../config/i18n'
I18n.setLanguage('en');

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
          console.log(item.name, 'item:', item.roles, 'user:', roles, _.intersection(item.roles, roles))
          return item.roles.length == 0 || _.intersection(item.roles, roles).length > 0 ?
            <li>
              <a href={item.ref && config.CENTRICITY_FRONT + '/#' + config_menu[item.ref].url} ui-sref-active="active" data-icon-after={item.submenu && '&#xe5cd;'} class="ch-menu__link">{I18n.get(item.name)}</a>
            </li>
            : null
        }
        )}
      </ul>
    )
  }

  render() {
    return (
      <div class="aside" tabindex="-1" role="dialog">
        <div class="aside-dialog">
          <div class="aside-content">
            <div class="aside-header">
              <div class="aside-close" ng-click="$hide()">&#xe2aa;</div>
              <h4 class="aside-title" translate>{I18n.get('ADMIN_MENU_CLIENTS_TITLE')}</h4>
            </div>
            <div class="aside-body">
              <div class="customer-actions">
                <input class="customer-search" ng-model="search.name" />
                <div class="customer-search-icon">F</div>
                <button class="customer-manage" ui-sref="app.customers-management" ng-click="$hide()" translate>{I18n.get('CUSTOMERS_MANAGEMENT')}</button>
              </div>
              <div ng-if="clients.length === 0" class="no-customers" translate>{I18n.get('ADMIN_MENU_NO_CLIENTS')}</div>
              <div ng-repeat="client in clients | filter:search | orderBy:'name'" ng-class="{'disabled': !client.enabled}"
                class="customer-selection" ng-click="selectClient(client)">{'client.name'}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Sidebar