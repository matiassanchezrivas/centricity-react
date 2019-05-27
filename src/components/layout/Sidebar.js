import React, { Component } from 'react'
import { I18n } from '@aws-amplify/core';
import dict from '../../i18n/i18n.json'
I18n.putVocabularies(dict);
I18n.setLanguage('es');

const menu = [
  { MENU_ADMIN_DASHBOARD: { class: '', ref: '', roles: [] } },
  { MENU_DASHBOARD: { class: '', ref: '', roles: [] } },
  { MENU_GROUPS: { class: '', ref: '', roles: [] } },
  {
    COMPONENTS: {
      class: '', ref: '', roles: [], submenu: [
        { MENU_BACK: { class: '', ref: '', roles: [] } },
        { SERVERS: { class: '', ref: '', roles: [] } },
        { LOAD_BALANCERS: { class: '', ref: '', roles: [] } },
        {
          STORAGE: {
            class: '', ref: '', roles: [], submenu: [
              { MENU_BACK: { class: '', ref: '', roles: [] } },
              { VOLUMES: { class: '', ref: '', roles: [] } },
              { MENU_SNAPSHOTS: { class: '', ref: '', roles: [] } },
            ]
          }
        },
        { MENU_SECURITY_GROUPS: { class: '', ref: '', roles: [] } },
      ]
    }
  },

  { MENU_MAP_DISTRIBUTION: { class: '', ref: '', roles: [] } },
  { MENU_SCHEDULING: { class: '', ref: '', roles: [] } },
  { MENU_WORKSPACES: { class: '', ref: '', roles: [] } },
  { MENU_APPSTREAM: { class: '', ref: '', roles: [] } },
  { MENU_CONNECT: { class: '', ref: '', roles: [] } },
  {
    MENU_MEDIABOX: {
      class: '', ref: '', roles: [], submenu: [{ MENU_BACK: { class: '', ref: '', roles: [] } },
      { MEDIA_BOX_STREAM_MANAGER: { class: '', ref: '', roles: [] } },
      { MEDIA_BOX_PAST_EVENTS: { class: '', ref: '', roles: [] } },
      { MEDIA_BOX_MEDIA_LIBRARY: { class: '', ref: '', roles: [] } },
      { MEDIA_BOX_STATS: { class: '', ref: '', roles: [] } },]
    }
  },
  { MENU_CREDENTIALS: { class: '', ref: '', roles: [] } },
  { MENU_CUSTOMER_SETTINGS: { class: '', ref: '', roles: [] } },
  { LOGS_REPORTS: { class: '', ref: '', roles: [] } },
  { MENU_SETTINGS: { class: '', ref: '', roles: [] } }]

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  renderMenu(menu, roles) {
    return (
      <ul>
        ${menu.map(item => {
          console.log(item)
          return true ?
            <li ng-if="isAuthorized([roles.CH_SYSTEM_ADMIN])">
              <a href ui-sref="app.admin-dashboard" ui-sref-active="active" class="ch-menu__link">{I18n.get(Object.keys(item)[0])}</a>
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


            <li ng-if="isAuthorized([roles.CH_SYSTEM_ADMIN])">
              <a href ui-sref="app.admin-dashboard" ui-sref-active="active" class="ch-menu__link" translate>MENU_ADMIN_DASHBOARD</a>
            </li>
            <li ng-if="hasApplications([applications.CLOUDPOXEE])">
              <a href ui-sref="app.dashboard" ui-sref-active="active" class="ch-menu__link" translate>MENU_DASHBOARD</a>
            </li>
            <li ng-if="hasApplications([applications.CLOUDPOXEE])">
              <a href ui-sref="app.groups" ui-sref-active="active" class="ch-menu__link" translate>MENU_GROUPS</a>
            </li>
            <li class="app-cloudpoxee">
              <a href="#" class="ch-menu__link" data-icon-after="&#xe5cd;" translate>{I18n.get("COMPONENTS")}</a>
              <div class="ch-level">
                <h2 translate>COMPONENTS</h2>
                <a class="ch-back" href="#" data-icon-before="&#xe5cc;" translate>{I18n.get("MENU_BACK")}</a>
                <ul>
                  <li ng-if="hasApplications([applications.CLOUDPOXEE])">
                    <a href ui-sref="app.servers" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("SERVERS")}</a>
                  </li>
                  <li ng-if="hasApplications([applications.CLOUDPOXEE])">
                    <a href ui-sref="app.load-balancers" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("LOAD_BALANCERS")}</a>
                  </li>
                  <li>
                    <a href="#" class="ch-menu__link" data-icon-after="&#xe5cd;" translate>{I18n.get("STORAGE")}</a>
                    {/* <div class="ch-level"> */}
                    <h2 translate>STORAGE</h2>
                    <a class="ch-back" href="#" data-icon-before="&#xe5cc;" translate>{I18n.get("MENU_BACK")}</a>
                    <ul>
                      <li ng-if="hasApplications([applications.CLOUDPOXEE])">
                        <a href ui-sref="app.volumes" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("VOLUMES")}</a>
                      </li>
                      <li ng-if="hasApplications([applications.CLOUDPOXEE])">
                        <a ui-sref="app.snapshots" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MENU_SNAPSHOTS")}</a>
                      </li>
                    </ul>
                  </li>
                  {/* <!--  <li>
                  <a href ui-sref="app.lambda" ui-sref-active="active" class="ch-menu__link" translate>MENU_LAMBDAS</a>
                </li>
                <li>
                  <a href ui-sref="app.commands" ui-sref-active="active" class="ch-menu__link" translate>MENU_COMMANDS</a>
                </li> --> */}
                  <li ng-if="isAuthorized([roles.CH_USER,roles.CH_USER_ADMIN,roles.CH_USER_LIMITED,roles.CH_SYSTEM_ADMIN])">
                    <a href ui-sref="app.security-groups" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MENU_SECURITY_GROUPS")}</a>
                  </li>
                </ul>
              </div>
            </li>
            <li ng-if="hasApplications([applications.CLOUDPOXEE])">
              <a href ui-sref="app.map-distribution" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MENU_MAP_DISTRIBUTION")}</a>
            </li>
            <li ng-if="hasApplications([applications.SCHEDULER])">
              <a href ui-sref="app.scheduling" class="ch-menu__link" ui-sref-active="active" translate>{I18n.get("MENU_SCHEDULING")}</a>
            </li>
            {/* <!-- <li class="app-cloudpoxee">
            <a href="#" class="ch-menu__link" data-icon-after="&#xe5cd;" translate>MENU_BEST_PRACTICES</a>
            <div class="ch-level">
              <h2 translate>MENU_BEST_PRACTICES</h2>
              <a class="ch-back" href="#" data-icon-before="&#xe5cc;" translate>MENU_BACK</a>
              <ul>
                <li ng-if="hasApplications([applications.CLOUDPOXEE])">
                  <a href ui-sref="app.best-practice-results" class="ch-menu__link" ui-sref-active="active" translate>MENU_BEST_PRACTICE_RESULTS</a>
                </li>
                <li ng-if="hasApplications([applications.CLOUDPOXEE])">
                  <a href ui-sref="app.best-practice-manager" ui-sref-active="active" class="ch-menu__link" translate>MENU_BEST_PRACTICE_MANAGER</a>
                </li>
              </ul>
            </div>
          </li> -->*/}
            <li ng-if="hasApplications([applications.WORKSPACES])">
              <a href ui-sref="app.workspaces" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MENU_WORKSPACES")}</a>
            </li>

            <li ng-if="hasApplications([applications.APPSTREAM])">
              <a href ui-sref="app.appstream" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MENU_APPSTREAM")}</a>
            </li>

            <li ng-if="hasApplications([applications.CONNECT])">
              <a href ui-sref="app.connect" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MENU_CONNECT")}</a>
            </li>
            <li class="app-mediabox">
              <a href="#" class="ch-menu__link" data-icon-after="&#xe5cd;" translate>{I18n.get("MENU_MEDIABOX")}</a>
              <div class="ch-level">
                <h2 translate>MENU_MEDIABOX</h2>
                <a class="ch-back" href="#" data-icon-before="&#xe5cc;" translate>{I18n.get("MENU_BACK")}</a>
                <ul>
                  <li ng-if="hasApplications([applications.MEDIABOX])">
                    <a href ui-sref="app.mediabox_stream_manager" class="ch-menu__link" ui-sref-active="active" translate>{I18n.get("MEDIA_BOX_STREAM_MANAGER")}</a>
                  </li>
                  <li ng-if="hasApplications([applications.MEDIABOX])">
                    <a href ui-sref="app.mediabox_past_events" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MEDIA_BOX_PAST_EVENTS")}</a>
                  </li>
                  <li ng-if="hasApplications([applications.MEDIABOX])">
                    <a href ui-sref="app.mediabox_media_library" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MEDIA_BOX_MEDIA_LIBRARY")}</a>
                  </li>
                  <li ng-if="hasApplications([applications.MEDIABOX])">
                    <a ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MEDIA_BOX_STATS")}</a>
                  </li>
                </ul>
              </div>
            </li>
            <li ng-if="isAuthorized([roles.CH_USER,roles.CH_USER_ADMIN,roles.CH_USER_LIMITED,roles.CH_SYSTEM_ADMIN])">
              <a href ui-sref="app.credentials" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MENU_CREDENTIALS")}</a>
            </li>
            <li ng-if="isAuthorized([roles.CH_SYSTEM_ADMIN])">
              <a href ui-sref="app.customer-settings" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MENU_CUSTOMER_SETTINGS")}</a>
            </li>
            <li ng-if="isAuthorized([roles.CH_SYSTEM_ADMIN, roles.CH_USER,roles.CH_USER_ADMIN,roles.CH_USER_LIMITED])">
              <a href ui-sref="app.logs-report" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("LOGS_REPORTS")}</a>
            </li>
            <li ng-if="isAuthorized([roles.CH_USER,roles.CH_USER_ADMIN,roles.CH_USER_LIMITED])">
              <a href ui-sref="app.customer-settings" ui-sref-active="active" class="ch-menu__link" translate>{I18n.get("MENU_SETTINGS")}</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
export default Sidebar