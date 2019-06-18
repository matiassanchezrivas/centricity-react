import React, { Component } from 'react'
import _ from 'lodash'
// import config_menu from '../../config/menu'
// import config from '../../config/config'
import I18n from '../config/i18n'
// // import { fetchClients, fetchClient } from '../../actions-creator/client'
// // import { connect } from 'react-redux';

I18n.setLanguage('en');

const dropdown = [
    {
        'text': 'MY_PROFILE',
        'link': '/#/profile'
    },
    {
        'divider': true
    },
    {
        'text': 'REFRESH_DATA',
        'click': 'refresh()'
    },
    {
        'divider': true
    },
    {
        'text': 'English',
        'languageChange': "en_US"
    },
    {
        'text': 'Español',
        'languageChange': "es_ES"
    },
    {
        'divider': true
    },
    {
        'text': 'HELP',
        'click': 'help()'
    },
    {
        'text': 'FEEDBACK_SUGGESTIONS',
        'click': 'feedback()'
    },
    {
        'text': 'TUTORIAL',
        'click': 'tutorial()'
    },
    {
        'divider': true
    },
    {
        'text': 'LOG_OUT',
        'click': '$rootScope.$broadcast("logout")'
    }
];

class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        const { toggleClientsBar } = this.props;
        return (
            <ul tabindex="-1" class="dropdown-menu ng-scope am-flip-x bottom-right" role="menu" ng-show="content &amp;&amp; content.length" style={{ top: 62, left: 85, display: 'block', visibility: 'visible' }}>
                {dropdown.map(option =>
                    (option.divider) ? <li role="presentation" ng-class="{divider: item.divider, active: item.active}" ng-repeat="item in content" class="ng-scope divider" ></li> :
                        <li onClick={option.link ? () => window.location.replace(option.link) : null} role="presentation" ng-class="{divider: item.divider, active: item.active}" ng-repeat="item in content" class="ng-scope" > <a role="menuitem" tabindex="-1" href="javascript:void(0)" ng-if="!item.divider &amp;&amp; item.click" ng-click="$eval(item.click);$hide()" ng-bind-html="item.text" class="ng-binding ng-scope">{I18n.get((option.text))}
                        </a></li>
                )}
            </ul>
        )
    }
}


export default Dropdown;