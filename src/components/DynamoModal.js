import React, { Component } from 'react'
import { connect } from 'react-redux';
import DynamoList from './configurations/DynamoList'

class Tabla extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleCloseModal() {
        this.setState({ openModal: false })
    }

    componentDidMount() {
    }

    render() {
        const { openModal } = this.state;
        const { tables } = this.props;
        return (
            <div>
                <DynamoList
                    items={tables}
                />
            </div>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return (
        {
            // changeLanguaje: (languaje) => dispatch(changeLanguaje(languaje)),
        }
    )
}

const mapStateToProps = function (state) {
    return {
        // languaje: state.settings.currentLanguaje,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabla);