import React, {Component} from 'react';
import {View} from 'react-native';
import NavHeader from './components/NavHeader';

export default class FirstSetupScreen extends Component {
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
        return(
            <View style={{ flex: 1,  backgroundColor: '#FFF' }}>
                <NavHeader title="Available orders" goBack={ () => { console.log('goBack'); } }/>
            </View>
        );
    }
}