import React, { Component } from 'react'
import _ from 'lodash'
// import config_menu from '../../config/menu'
// import config from '../../config/config'
import I18n from '../config/i18n'
import { changeLanguaje } from '../actions-creator/settings'
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
        'languageChange': "en"
    },
    {
        'text': 'Español',
        'languageChange': "es"
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
        'logout': true
    }
];

class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
    }

    onClick(option) {
        const { changeLanguaje } = this.props;
        const { link, languageChange, logout } = option;

        if (link) window.location.replace('/v1/index.html' + link);
        if (languageChange) { changeLanguaje(languageChange); console.log('changeLanguaje', languageChange) }
        if (logout) { localStorage.removeItem('cloudpoxee.session'); window.location.replace('/v1/index.html#/login') }
    }

    render() {
        const { toggleClientsBar, languaje, handleChange } = this.props;
        I18n.setLanguage(languaje);
        console.log('languaje', languaje)
        return (
            <ClickAwayListener onClickAway={() => handleChange(false)}>
                <ul tabindex="-1" class="dropdown-menu ng-scope am-flip-x bottom-right" role="menu" ng-show="content &amp;&amp; content.length" style={{ top: 62, left: 85, display: 'block', visibility: 'visible' }}>
                    {dropdown.map(option =>
                        (option.divider) ? <li role="presentation" ng-class="{divider: item.divider, active: item.active}" ng-repeat="item in content" class="ng-scope divider" ></li> :
                            <li onClick={() => this.onClick(option)} role="presentation" ng-class="{divider: item.divider, active: item.active}" ng-repeat="item in content" class="ng-scope" > <a role="menuitem" tabindex="-1" href="javascript:void(0)" ng-if="!item.divider &amp;&amp; item.click" ng-click="$eval(item.click);$hide()" ng-bind-html="item.text" class="ng-binding ng-scope">{I18n.get((option.text))}
                            </a></li>
                    )}
                </ul>
            </ClickAwayListener>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return (
        {
            changeLanguaje: (languaje) => dispatch(changeLanguaje(languaje)),
        }
    )
}

const mapStateToProps = function (state) {
    return {
        languaje: state.settings.currentLanguaje,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);