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
        const { level, submenus, optionsMenuOpen } = this.state;
        this.setState({
            optionsMenuOpen: !optionsMenuOpen,
            submenus: !optionsMenuOpen ? [] : submenus,
            level: !optionsMenuOpen ? 0 : level,
        });

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

                {clientsMenuOpen && <Clientsbar clientsMenuOpen={clientsMenuOpen} toggleClientsBar={this.toggleClientsBar} />}
                <div className="ch-container ng-scope">
                    <div
                        id="ch-pusher"
                        className={`ch-pusher ${optionsMenuOpen ? 'ch-pushed' : ''} `}
                        style={optionsMenuOpen ? Styles.translateOpen : Styles.translateClosed}
                    >
                        {/* ch menu */}
                        <Sidebar optionsMenuOpen={optionsMenuOpen} toggleOptionsBar={this.toggleOptionsBar} onClickSubmenu={this.onClickSubmenu} onClickMenuBack={this.onClickMenuBack} submenus={submenus} level={level} />
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