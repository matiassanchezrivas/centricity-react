import React, { Component } from 'react'
import { connect } from 'react-redux';
import Table from '../components/table'

class CloudfrontTemplates extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Table></Table>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return (
        {

        }
    )
}

const mapStateToProps = function (state) {
    return {
    };
}

export default connect(null, mapDispatchToProps)(CloudfrontTemplates);