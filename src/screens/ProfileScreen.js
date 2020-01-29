import React, {Component} from 'react';
import { AsyncStorage, ScrollView, ActivityIndicator, View, StyleSheet, Text, Linking} from 'react-native';
import { Header, Input, Button, Icon } from 'react-native-elements';


export default class ProfileScreen extends Component {
    static navigationOptions = {
        title: 'PickOrder',
        header: null
    }
    state = {
        loginCheckLoading: true,
        phone: '',
        email: '',
        name: '',
        saving: false
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._retrieveData(false);
    }

    _retrieveData = async (save) => {
        try {
          const value = await AsyncStorage.getItem('runner:token');
          if (value !== null) {
              if(save) {
                this._saveProfile(value, this.state.phone, this.state.name)
              } else {
                this._loadProfile(value)
              }
          } else {
            this.props.navigation.navigate('Login');
          }
        } catch (error) {
            console.log(error);
        }
      };

      _removeData = async () => {
        try {
          await AsyncStorage.removeItem('runner:token');
          this.props.navigation.navigate('Login');
        } catch (error) {
          // Error saving data
        }
      };

    _saveProfile = async (token, phone, name) => {
        this.setState({saving: true})
        fetch('http://dolphinx.eu/test/runnerapp/api/change_profile', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "token=" + token + "&phone=" + phone + "&name=" + name
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({saving: false})
                    console.log(responseJson);
                    if(responseJson == null || typeof responseJson === "undefined" || responseJson.hasOwnProperty('code')){
                        this._removeData();
                    } else {
                        this.props.navigation.goBack()
                    }
                })
                .catch((error) =>{
                    console.log(error);
                    this.setState({saving: false})
                })
    }

    _loadProfile = async (token) => {
        fetch('http://dolphinx.eu/test/runnerapp/api/show_my_profile', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "token=" + token
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({loginCheckLoading: false})
                    console.log(responseJson);
                    if(responseJson == null || typeof responseJson === "undefined" || responseJson.hasOwnProperty('code')){
                        this._removeData();
                    } else {
                        this.setState({ name: responseJson.name, email: responseJson.email, phone: responseJson.phone})
                    }
                })
                .catch((error) =>{
                    console.log(error);
                    this.setState({loginCheckLoading: false})
                })
    }

    render() {
        if (this.state.loginCheckLoading) {
            return (
                <View style={{ opacity: 0.7, backgroundColor: "#000", flex: 1, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                        <ActivityIndicator size="large" color="#FFF" />
                    </View>
                </View>
            );
        } else {
            return(
                <View style={{ flex: 1,  backgroundColor: '#FFF' }}>
                    <Header
                        leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                        centerComponent={{ text: 'My profile', style: { color: '#fff' } }}
                        />
                    <ScrollView>
                        <Text style={{ fontWeight: 'bold', paddingTop: 30, paddingBottom: 20, color: '#000', fontSize: 20, textAlign: 'center'}}>Profile settings</Text>
                        <View style={{ flex: 1, width: '80%', padding: 10, alignSelf: 'center'}}>
                            <Input
                                label="Name"
                                placeholder="Please enter your name..."
                                textContentType={ "name" }
                                spellCheck={ false }
                                errorStyle={{ color: 'red' }}
                                onChangeText={(name) => this.setState({name})}
                                value={this.state.name}
                                errorMessage='' />
                        </View>
                        <View style={{ flex: 1, width: '80%', padding: 10, alignSelf: 'center'}}>
                            <Input
                                label="Phone"
                                placeholder="Please enter your phone number..."
                                keyboardType="phone-pad"
                                onChangeText={(phone) => this.setState({phone})}
                                spellCheck={ false }
                                errorStyle={{ color: 'red' }}
                                value={this.state.phone}
                                errorMessage='' />
                        </View>
                        <View style={{ flex: 1, width: '80%', padding: 10, alignSelf: 'center'}}>
                            <Input
                                label="E-mail address"
                                editable={false}
                                errorStyle={{ color: 'red' }}
                                value={this.state.email}
                                errorMessage='' />
                        </View>
                        <View style={{ flex: 1, width: '80%', padding: 20, alignSelf: 'center'}}>
                            <Button
                                title="SAVE"
                                loading={ this.state.saving }
                                onPress={() => this._retrieveData(true) }
                                />
                        </View>
                        <View style={{ flex: 1, width: '80%', padding: 20, paddingTop: 40, alignSelf: 'center'}}>
                            <Button
                                title="I WANT TO BECOME A RUNNER"
                                onPress={() => Linking.openURL('https://runner.com') }
                                />
                        </View>
                    </ScrollView>

                </View>
            );
        }
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