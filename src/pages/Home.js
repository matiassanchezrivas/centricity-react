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

            <div className="ch-scroller">
                <div className="scroller-inner">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor lorem, feugiat tempor viverra in, pellentesque pharetra magna. Etiam non iaculis felis. Aenean nec est in mi iaculis ornare. Etiam vitae justo in sapien interdum finibus ut sit amet justo. Curabitur vitae odio congue, faucibus lectus vitae, semper lacus. Nullam luctus mollis malesuada. Aliquam viverra felis non ligula tristique iaculis. Donec dictum euismod purus, at convallis erat lobortis eget. Vestibulum lacinia venenatis libero, eu tempor nisl pretium sit amet. Vivamus ante erat, cursus id accumsan eu, aliquam in nisl. Mauris eget dictum sapien. Quisque at euismod turpis. Donec bibendum pulvinar faucibus. Curabitur sit amet ligula molestie, euismod felis sed, accumsan tortor. In hac habitasse platea dictumst. Etiam commodo dignissim venenatis. Vestibulum ut accumsan neque.Proin aliquam congue augue a egestas. Fusce congue turpis id arcu ullamcorper, in elementum felis ullamcorper. Praesent gravida lorem magna, in elementum odio posuere vitae. Donec semper sit amet elit vitae molestie. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc sit amet hendrerit lacus, id fermentum massa. Donec eu posuere metus, non pharetra dolor. Vestibulum sit amet nisi laoreet, tincidunt tortor id, ullamcorper ligula. Cras faucibus eleifend ligula in posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus eleifend porttitor leo, vestibulum placerat tortor ornare quis. Suspendisse venenatis magna quis maximus ultricies. Curabitur scelerisque blandit justo, id aliquam felis efficitur eu. Cras eget lectus lobortis, consequat nunc non, dictum diam. Donec venenatis ornare sem a finibus. Sed in lacus cursus, sollicitudin mi nec, viverra neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam congue felis vitae rutrum tempor. Proin blandit augue at eros aliquet posuere. Integer vulputate finibus ex, nec fringilla lorem tincidunt porttitor. Ut id orci dui. Aliquam vel pulvinar ipsum. Donec eget dictum sapien, non molestie mi. Nam vulputate vel diam volutpat fringilla. Cras vel quam vel neque commodo scelerisque iaculis et felis. Vestibulum ipsum arcu, tincidunt nec laoreet id, aliquam sed nibh. Quisque sodales ullamcorper mauris, eget consequat enim fringilla quis. Fusce laoreet blandit placerat. Nulla molestie ligula mi, non fringilla diam pellentesque condimentum. Vivamus vel massa pulvinar lectus pellentesque mattis. Cras molestie libero ornare ornare bibendum. Phasellus vitae commodo arcu, nec vestibulum lacus.
                    </div>
            </div>

        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return (
        {
            fetchUser: (token) => dispatch(fetchUser(token))
        }
    )
}

const mapStateToProps = function (state) {
    return {
    };
}

export default connect(null, mapDispatchToProps)(Layout);