import React, { Component } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Clientsbar from './Clientsbar'

class Layout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menuOpen: false,
            sublevel: 0,
            level: 0,
        }

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    componentDidMount() {
    }

    toggleMenu() {

        const { level, menuOpen } = this.state;
        console.log(menuOpen, !menuOpen)
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
        const { menuOpen } = this.state;
        return (
            <div className='aside-open aside-with-am-fade-and-slide-right'>
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
                                    <div className="cp-content workspaces ng-scope"></div>
                                    <div class="cp-content__header">
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
export default Layout