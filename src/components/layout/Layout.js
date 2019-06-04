import React, { Component } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Clientsbar from './Clientsbar'
import { fetchUser } from '../../actions-creator/user'
import { connect } from 'react-redux';

class Layout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menuOpen: false,
            sublevel: 0,
            level: 0,
            loading: true,
        }

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    async componentDidMount() {
        let session = localStorage.getItem('cloudpoxee.session')
        console.log('session', session);
        if (!session) {
            window.location.replace('/#/login')
        } else {
            //ir a /user/me
            const parsedSession = JSON.parse(session);
            console.log('parsedSession', parsedSession);

            const u = await this.props.fetchUser(parsedSession.sessionId)
                .catch(e => {
                    window.location.replace('/#/login')
                })
                .then(e => this.setState({ loading: false }))
        }
    }

    toggleMenu() {

        const { level, menuOpen } = this.state;
        this.setState({
            menuOpen: !menuOpen,

        });


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

    render() {
        const { menuOpen, loading } = this.state;
        return (
            !loading && <div className='aside-open aside-with-am-fade-and-slide-right'>
                {/* <Clientsbar /> */}
                <div className="ch-container ng-scope container">
                    <div
                        id="ch-pusher"
                        className={`ch-pusher ${menuOpen ? 'ch-pushed' : ''} `}
                        style={menuOpen ? Styles.translateOpen : Styles.translateClosed}
                    >
                        {/* ch menu */}
                        <Sidebar />
                        <div className="ch-scroller">
                            <div className="scroller-inner">
                                <Header
                                    toggleMenu={this.toggleMenu}
                                    menuOpen={menuOpen}
                                />
                                <div className="state-content">
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
            fetchUser: () => dispatch(fetchUser())
        }
    )
}

const mapStateToProps = function (state) {
    return {
    };
}

export default connect(null, mapDispatchToProps)(Layout);