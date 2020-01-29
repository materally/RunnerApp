import React, { Component } from 'react';
import { Platform, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Header } from 'react-navigation'

export default class NavHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const headerHeight = Header.HEIGHT;
        const toolbarMargin = ((Platform.OS === 'ios' && Dimensions.get("window").height === 812) ? 20 : 0)
        return (
            <View style={{ backgroundColor: '#00a4ed', height: headerHeight + toolbarMargin, width: '100%', shadowOffset:{  width: 0,  height: 3,  }, shadowColor: '#667', shadowOpacity: 0.3}}>
                <View style={{ position: 'absolute', top: (headerHeight / 2 - 10) + toolbarMargin, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold"}}>{ this.props.title }</Text>
                </View>
                {
                    this.props.goBack == undefined ? // IF
                    <View />
                        : // OR
                    <TouchableOpacity style={{ position: 'absolute', padding: 10, top: (headerHeight / 2 - 12) + toolbarMargin, left: 10, }} onPress={ () => this.props.goBack() } >
                        <Image source={require('../../../images/back.png')} style={{ height: 24, width: 24  }} />
                    </TouchableOpacity>
                }
            </View>
        );
    }
}