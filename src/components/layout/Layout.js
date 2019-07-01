import React, { Component } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Clientsbar from './Clientsbar'
import { fetchUser } from '../../actions-creator/user'
import { connect } from 'react-redux';
import { fetchClients, fetchClient } from '../../actions-creator/client';

class Layout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            optionsMenuOpen: false,
            clientsMenuOpen: false,
            submenus: [],
            level: 0,
            loading: true,
        }

        this.onClickSubmenu = this.onClickSubmenu.bind(this);
        this.onClickMenuBack = this.onClickMenuBack.bind(this);
        this.toggleOptionsBar = this.toggleOptionsBar.bind(this);
        this.toggleClientsBar = this.toggleClientsBar.bind(this);
    }

    async componentDidMount() {
        this.props.fetchClients();
        let session = localStorage.getItem('cloudpoxee.session')
        if (!session) {
            // window.location.replace('/#/login')
            this.setState({ loading: false })
            const u = await this.props.fetchUser()
                .catch(e => {
                    // window.location.replace('/#/login')
                    this.setState({ loading: false })
                })
                .then(e => this.setState({ loading: false }))
        } else {
            //ir a /user/me
            const parsedSession = JSON.parse(session);
            // if (!parsedSession.user.customer) window.location.replace('#/dashboard')
            await this.props.fetchClient(parsedSession.user.customer)
            await this.props.fetchUser(parsedSession.sessionId)
                .then(e => this.setState({ loading: false }))
                .catch(e => {
                    window.location.replace('/#/login')
                })
        }
    }

    toggleOptionsBar() {
        const { level, optionsMenuOpen } = this.state;
        if (level > 0) {
            this.setState({
                optionsMenuOpen: level - 1,
            });
        } else {
            this.setState({
                optionsMenuOpen: !optionsMenuOpen,
            });
        }



        // _openMenu: function (subLevel) {
        // 	// increment level depth
        // 	++this.level;

        // 	// move the main wrapper
        // 	var levelFactor = (this.level - 1) * this.options.levelSpacing,
        // 		translateVal = this.options.type === 'overlap' ? this.el.offsetWidth + levelFactor : this.el.offsetWidth;

        // 	this._setTransform('translate3d(' + translateVal + 'px,0,0)');

        // 	if (subLevel) {
        // 		// reset transform for sublevel
        // 		this._setTransform('', subLevel);
        // 		// need to reset the translate value for the level menus that have the same level depth and are not open
        // 		for (var i = 0, len = this.levels.length; i < len; ++i) {
        // 			var levelEl = this.levels[i];
        // 			if (levelEl != subLevel && !$(levelEl).hasClass('ch-level-open')) {
        // 				this._setTransform('translate3d(-100%,0,0) translate3d(' + -1 * levelFactor + 'px,0,0)', levelEl);
        // 			}
        // 		}
        // 	}
        // 	// add class ch-pushed to main wrapper if opening the first time
        // 	if (this.level === 1) {
        // 		$(this.wrapper).addClass('ch-pushed');
        // 		this.open = true;
        // 	}
        // 	// add class ch-level-open to the opening level element
        // 	$(subLevel || this.levels[0]).addClass('ch-level-open');

        // 	var scope = angular.element('.js-menu-trigger').scope();
        // 	if (!scope.$$phase) {
        // 		scope.$apply(function () {
        // 			scope.menuOpen = true;
        // 		});
        // 	} else {
        // 		scope.menuOpen = true;
        // 	}
        // },
    }

    toggleClientsBar() {
        const { clientsMenuOpen } = this.state;
        this.setState({
            clientsMenuOpen: !clientsMenuOpen,
        });
    }

    onClickSubmenu(submenu) {
        const { submenus, level } = this.state;
        if (submenus.indexOf(submenu) === -1) {
            let newSubmenus = [...submenus, submenu];
            this.setState({
                submenus: newSubmenus, level: level + 1
            })
        }
    }

    onClickMenuBack(submenu) {
        const { submenus, level } = this.state;
        let newSubmenus = [...submenus]
        var index = newSubmenus.indexOf(submenu);
        if (index !== -1) {
            newSubmenus.splice(index, 1);
            this.setState({
                submenus: newSubmenus, level: level - 1
            })
        }
    }

    render() {
        const { clientsMenuOpen, optionsMenuOpen, loading, submenus, level } = this.state;
        return (
            !loading && <div className='aside-open aside-with-am-fade-and-slide-right'>

                {clientsMenuOpen && <Clientsbar toggleClientsBar={this.toggleClientsBar} />}
                <div className="ch-container ng-scope">
                    <div
                        id="ch-pusher"
                        className={`ch-pusher ${optionsMenuOpen ? 'ch-pushed' : ''} `}
                        style={optionsMenuOpen ? Styles.translateOpen : Styles.translateClosed}
                    >
                        {/* ch menu */}
                        <Sidebar toggleOptionsBar={this.toggleOptionsBar} onClickSubmenu={this.onClickSubmenu} onClickMenuBack={this.onClickMenuBack} submenus={submenus} level={level} />
                        <div className="ch-scroller">
                            <div className="scroller-inner">
                                <Header
                                    toggleOptionsBar={this.toggleOptionsBar}
                                    toggleClientsBar={this.toggleClientsBar}
                                    menuOpen={optionsMenuOpen}
                                />
                                <div className="state-content" >
                                    <div className="cp-content ng-scope">
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const Styles = {
    translateOpen: { transform: 'translate(300px, 0px)' },
    translateClose: { transform: 'translate(0px, 0px)' }
}
const mapDispatchToProps = function (dispatch) {
    return (
        {
            fetchUser: () => dispatch(fetchUser()),
            fetchClients: () => dispatch(fetchClients()),
            fetchClient: (client) => dispatch(fetchClient(client))
        }
    )
}

const mapStateToProps = function (state) {
    return {
    };
}

export default connect(null, mapDispatchToProps)(Layout);