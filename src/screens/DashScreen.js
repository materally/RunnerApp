import React, {Component} from 'react';
import {ScrollView, TextInput, ActivityIndicator, Dimensions, Animated, TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import NavHeader from './components/NavHeader';

export default class DashScreen extends Component {
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
            <View style={styles.container}>
                <NavHeader title="Dashboard" />
                <ScrollView>

                    <View style={{ alignItems: 'center', padding: 15 }}>
                        <TouchableOpacity underlayColor="white">
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>LOGOUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', padding: 15 }}>
                        <TouchableOpacity underlayColor="white">
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>LOGOUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    button: {
        width: 200,
        alignItems: 'center',
        backgroundColor: '#edbe00'
    },
    buttonText: {
        fontSize: 16,
        padding: 10,
        color: '#FFF',
        fontWeight: 'bold',
    },
    horizLine: {
        backgroundColor: '#edbe00',
        height: 7,
        width: 70,
        marginTop: 30,
        marginBottom: 30,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    slogen: {
        color: '#FFF',
        fontSize: 20,
    }, 
    appName: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
    }, 
    loginPos: {
        position: 'absolute',
        bottom:60,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    appNamePos: {
        position: 'absolute',
        top: 200,
        bottom: 20,
        left: 20,
        right: 20
    },
});