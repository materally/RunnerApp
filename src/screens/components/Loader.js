import React, { Component } from 'react'
import { Modal, View, ActivityIndicator } from 'react-native'


export default class Loader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading !== undefined ? props.loading : false
        };
    }

    render() {

        return (
            <Modal onRequestClose={() => null} visible={this.state.loading}>
                <View style={{ opacity: 0.7, backgroundColor: "#000", flex: 1, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                        <ActivityIndicator size="large" color="#FFF" />
                    </View>
                </View>
            </Modal>
        )
    }
}