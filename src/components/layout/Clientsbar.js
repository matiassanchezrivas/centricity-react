import React, { Component } from 'react'
import _ from 'lodash'
import config_menu from '../../config/menu'
import config from '../../config/config'
import I18n from '../../config/i18n'
import { fetchClients, fetchClient } from '../../actions-creator/client'
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.filterClients = this.filterClients.bind(this);
    this.state = {
      filteredClients: this.props.clients
    };
  }

  componentDidMount() {
    this.props.fetchClients()
  }

  renderMenu(menu, roles) {
    return (
      <ul>
        {menu.map(item => {
          return item.roles.length === 0 || _.intersection(item.roles, roles).length > 0 ?
            <li>
              <a href={item.ref && config.CENTRICITY_FRONT + '/index.html#' + config_menu[item.ref].url} ui-sref-active="active" data-icon-after={item.submenu && '&#xe5cd;'} class="ch-menu__link">{I18n.get(item.name)}</a>
            </li>
            : null
        }
        )}
      </ul>
    )
  }

  filterClients(e) {
    if (!this.props.clients) return
    const { value } = e.target;
    const filteredClients = this.props.clients.map(c => { if (c.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) return c }).filter(e => { if (e && e.enabled) return e })
    this.setState({ filteredClients })
  }

  selectClient(client) {
    this.props.fetchClient(client);
    this.props.toggleClientsBar();
  }

  render() {
    const { toggleClientsBar, languaje, clientsMenuOpen } = this.props;
    const { filteredClients } = this.state;
    I18n.setLanguage(languaje);
    return (
      <ClickAwayListener onClickAway={clientsMenuOpen ? toggleClientsBar : () => { }}>
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
                  <button className="customer-manage" ui-sref="app.customers-management" onClick={e => window.location.replace(+'/v1/index.html#/customers-management')}>{I18n.get('CUSTOMERS_MANAGEMENT')}</button>
                </div>
                {/* No customers */}
                {(!filteredClients || !filteredClients.length) && <div className="no-customers">{I18n.get('ADMIN_MENU_NO_CLIENTS')}</div>}
                {/* Customers list */}
                {filteredClients && filteredClients.length && filteredClients.map(c => <div
                  className="customer-selection" onClick={e => this.selectClient(c)}>{c.name}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ClickAwayListener>
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
    languaje: state.settings.currentLanguaje,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);