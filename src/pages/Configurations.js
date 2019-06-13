import React, { Component } from 'react'
import queryString from 'query-string';
import { fetchUser } from '../actions-creator/user'
import { connect } from 'react-redux';

class Layout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            links: [],
            loading: true
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
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