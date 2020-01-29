import React, {Component} from 'react';
import {View} from 'react-native';
import NavHeader from './components/NavHeader';

export default class PickOrderScreen extends Component {
    static navigationOptions = {
        title: 'PickOrder',
        header: null
    }
    state = {
    }
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return(
            <View style={{ flex: 1,  backgroundColor: '#FFF' }}>
                <NavHeader title="Available orders" goBack={ () => { console.log('goBack'); } }/>
            </View>
        );
    }
}