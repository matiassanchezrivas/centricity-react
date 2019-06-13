import React, { Component } from 'react'
import _ from 'lodash'
import config_menu from '../../config/menu'
import config from '../../config/config'
import I18n from '../../config/i18n'
import { fetchClients, fetchClient } from '../../actions-creator/client'
import { connect } from 'react-redux';

I18n.setLanguage('en');

const hardcodedRoles = ['CH_SYSTEM_ADMIN']

class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchClients()
  }

  renderMenu(menu, roles) {
    return (
      <ul>
        {menu.map(item => {
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

  selectClient(client) {
    this.props.fetchClient(client);
    this.props.toggleClientsBar();
  }

  render() {
    const { toggleClientsBar, clients } = this.props;
    return (
      <div className="aside" tabindex="-1" role="dialog">
        <div className="aside-dialog">
          <div className="aside-content">
            <div className="aside-header">
              <div className="aside-close" onClick={toggleClientsBar}>&#xe2aa;</div>
              <h4 className="aside-title">{I18n.get('ADMIN_MENU_CLIENTS_TITLE')}</h4>
            </div>
            <div className="aside-body">
              <div className="customer-actions">
                <input onChange={this.filterClients} className="customer-search" ng-model="search.name" />
                <div className="customer-search-icon">F</div>
                <button className="customer-manage" ui-sref="app.customers-management" onClick={e => window.location.replace('/#/customers-management')}>{I18n.get('CUSTOMERS_MANAGEMENT')}</button>
              </div>
              {/* No customers */}
              {(!clients || !clients.length) && <div className="no-customers">{I18n.get('ADMIN_MENU_NO_CLIENTS')}</div>}
              {/* Customers list */}
              {clients && clients.length && clients.map(c => <div
                className="customer-selection" onClick={e => this.selectClient(c)}>{c.name}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = function (dispatch) {
  return (
    {
      fetchClients: () => dispatch(fetchClients()),
      fetchClient: (client) => dispatch(fetchClient(client))
    }
  )
}

const mapStateToProps = function (state) {
  return {
    clients: state.clients.clients,
    currentClient: state.clients.currentClient,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);