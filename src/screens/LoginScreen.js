import React, {Component} from 'react';
import {AsyncStorage, ScrollView, TextInput, ActivityIndicator, Dimensions, Animated, TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
        header: null
    }
    state = {
        loginCheckLoading: true,
        background_position: new Animated.Value(0),
        homeFade: new Animated.Value(1),
        loginFade: new Animated.Value(0),
        registrationFade: new Animated.Value(0),
        loadingAnim: new Animated.Value(0),
        show_login: false,
        show_loading: false,
        show_registration: false,
        login_mail: '',
        login_pw: '',
        mail: '',
        pw: '',
        phone: '',
        name: ''
    }
    constructor(props) {
        super(props);
        this.showScreen = this.showScreen.bind(this)
    }

    componentDidMount() {
        this._retrieveData();
    }

    _storeData = async (token) => {
        try {
          await AsyncStorage.setItem('runner:token', token);
        } catch (error) {
          // Error saving data
        }
      };

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('runner:token');
          if (value !== null) {
            this.props.navigation.navigate('Map');
          } else {
            this.setState({loginCheckLoading: false})
          }
        } catch (error) {
            console.log(error);
        }
      };

    _onPressBackToLogin() {
        this.setState({show_login: true});
        Animated.timing(
            this.state.registrationFade,
            {
            toValue: 0,
            duration: 300,
            }
        ).start(() => {
            this.showScreen("login");
            Animated.timing(
                this.state.loginFade,
                {
                toValue: 1,
                duration: 300,
                }
            ).start();
        })
    }

    showScreen(screen) {
        if (screen == "login") {
            this.setState({show_registration: false, show_login: true});
        } else {
            this.setState({show_registration: true, show_login: false});
        }
    }

    _onPressRegistration() {
        this.setState({show_registration: true});
        Animated.timing(
            this.state.loginFade,
            {
            toValue: 0,
            duration: 300,
            }
        ).start(() => {
            this.showScreen("registration");
            Animated.timing(
                this.state.registrationFade,
                {
                toValue: 1,
                duration: 300,
                }
            ).start();
        })
    }
    _onPressRegister() {
        this.setState({show_loading: true});
        Animated.timing(
            this.state.loadingAnim,
            {
            toValue: 1,
            duration: 100,
            }
        ).start(() => {
            fetch('http://dolphinx.eu/test/runnerapp/api/registration', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "email=" + this.state.mail + "&pw=" + this.state.pw + "&phone=" + this.state.phone + "&name=" + this.state.name
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(typeof responseJson === "undefined" || responseJson.hasOwnProperty('code')){
                        Animated.timing(
                            this.state.loadingAnim,
                            {
                            toValue: 0,
                            duration: 100,
                            }
                        ).start(() => {
                            this.setState({show_loading: false}, function() {
                                alert(responseJson.msg);
                            });
                        });
                    } else {
                        Animated.timing(
                            this.state.loadingAnim,
                            {
                            toValue: 0,
                            duration: 100,
                            }
                        ).start(() => {
                            this.setState({show_loading: false}, function() {
                                this.setState({show_login: true});
                                Animated.timing(
                                    this.state.registrationFade,
                                    {
                                    toValue: 0,
                                    duration: 300,
                                    }
                                ).start(() => {
                                    this.showScreen("login");
                                    Animated.timing(
                                        this.state.loginFade,
                                        {
                                        toValue: 1,
                                        duration: 300,
                                        }
                                    ).start(() => {
                                        alert("Thank you for your registration. We send out a confirmation email, pls use the link and you can login and use RunnerArrender!");
                                    });
                                })
                            });
                        });
                    }
                })
                .catch((error) =>{
                    console.log(error);
                    Animated.timing(
                        this.state.loadingAnim,
                        {
                        toValue: 0,
                        duration: 100,
                        }
                    ).start(() => {
                        this.setState({show_loading: false}, function() {
                            alert("Fatal error");
                        });
                    });
                });
            })
    }
    _onPressLogin() {
        const { navigate } = this.props.navigation;
        this.setState({show_loading: true});
        Animated.timing(
            this.state.loadingAnim,
            {
            toValue: 1,
            duration: 100,
            }
        ).start(() => {
            fetch('http://dolphinx.eu/test/runnerapp/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "email=" + this.state.login_mail + "&pw=" + this.state.login_pw
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(typeof responseJson === "undefined" || responseJson.hasOwnProperty('code')){
                        Animated.timing(
                            this.state.loadingAnim,
                            {
                            toValue: 0,
                            duration: 100,
                            }
                        ).start(() => {
                            this.setState({show_loading: false}, function() {
                                alert(responseJson.msg);
                            });
                        });
                    } else {
                        this.setState({show_loading: false}, function() {
                            this._storeData(responseJson.token);
                            navigate('Map', { name: responseJson.name, user_id: responseJson.id });
                        });
                    }
                })
                .catch((error) =>{
                    Animated.timing(
                        this.state.loadingAnim,
                        {
                        toValue: 0,
                        duration: 100,
                        }
                    ).start(() => {
                        this.setState({show_loading: false}, function() {
                            alert("Fatal error");
                        });
                    });
                });
            })
    }

    _onPressGoOn() {
        let height = Dimensions.get('window').height;
        this.setState({show_login: true});
        Animated.parallel([
            Animated.timing(
                this.state.background_position,
                {
                toValue: height + 100,
                duration: 600,
                }
            ),
            Animated.timing(
                this.state.homeFade,
                {
                toValue: 0,
                duration: 150,
                }
            )]).start(() => {
                Animated.timing(
                    this.state.loginFade,
                    {
                    toValue: 1,
                    duration: 300,
                    }
                ).start()
            });
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
            return (
                <View style={styles.container}>
                    <Animated.View style={{ flex: 1, bottom: this.state.background_position }}>
                        <Image source={require('../../images/login_background.png')} style={styles.backgroundImage} />
                    </Animated.View>
                    <Animated.View style={{ flex: 1, opacity: this.state.homeFade, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                        <View style={ styles.appNamePos }>
                            <Text style={ styles.appName } >RunnerRander</Text>
                            <View style={ styles.horizLine } />
                            <Text style={ styles.slogen } >Your package is safe with us</Text>
                        </View>
                        <View style={ styles.loginPos }>
                            <TouchableOpacity onPress={this._onPressGoOn.bind(this)} underlayColor="white">
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>LOGIN TO ER</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    { this.state.show_login ?
                    <Animated.View style={{ flex: 1, opacity: this.state.loginFade, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                        <ScrollView>
                            <View style={{alignItems: 'center', marginTop: 80}}>
                                <View style={{ flex: 1, width: 250, alignItems: 'center' }}>
                                    <Image source={require('../../images/logo.jpg')} style={{ width: 250, height: 72 }} />
                                    <TextInput autoCapitalize="none" keyboardType="email-address" style={{ width: 250, fontSize: 16, marginTop: 30, borderBottomColor: '#00a1ed', color:'#00a1ed', borderBottomWidth: 1}} placeholderTextColor='#00a1ed' placeholder="Your email" onChangeText={(login_mail) => this.setState({login_mail})} />
                                    <TextInput  style={{ width: 250, fontSize: 16, marginTop: 30, borderBottomColor: '#00a1ed', color:'#00a1ed', borderBottomWidth: 1 }} placeholderTextColor='#00a1ed' placeholder="Your password" secureTextEntry={true} onChangeText={(login_pw) => this.setState({login_pw})} />
                                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                                        <TouchableOpacity onPress={this._onPressLogin.bind(this)} underlayColor="white">
                                            <View style={styles.button}>
                                                <Text style={styles.buttonText}>Login</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                                        <TouchableOpacity onPress={this._onPressRegistration.bind(this)} underlayColor="white">
                                            <View style={styles.button}>
                                                <Text style={styles.buttonText}>Create New Account</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </Animated.View> : <View/>}
                    { this.state.show_registration ?
                    <Animated.View style={{ flex: 1, opacity: this.state.registrationFade, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                        <ScrollView>
                            <View style={{alignItems: 'center', marginTop: 80}}>
                                <View style={{ flex: 1, width: 250, alignItems: 'center' }}>
                                    <Image source={require('../../images/logo.jpg')} style={{ width: 250, height: 72 }} />
                                    <TextInput  style={{ width: 250, fontSize: 16, marginTop: 30, borderBottomColor: '#00a1ed', color:'#00a1ed',  borderBottomWidth: 1}} placeholderTextColor='#00a1ed' placeholder="Your name" onChangeText={(name) => this.setState({name})} />
                                    <TextInput spellCheck={ false } autoCapitalize="none" keyboardType="email-address" style={{ width: 250, fontSize: 16, marginTop: 30, borderBottomColor: '#00a1ed', color:'#00a1ed',  borderBottomWidth: 1}} placeholderTextColor='#00a1ed' placeholder="Your email" onChangeText={(mail) => this.setState({mail})} />
                                    <TextInput keyboardType="phone-pad" style={{ width: 250, fontSize: 16, marginTop: 30, borderBottomColor: '#00a1ed', color:'#00a1ed',  borderBottomWidth: 1}} placeholderTextColor='#00a1ed' placeholder="Your phone number" onChangeText={(phone) => this.setState({phone})} />
                                    <TextInput  style={{ width: 250, fontSize: 16, marginTop: 30, borderBottomColor: '#00a1ed', color:'#00a1ed', borderBottomWidth: 1 }} placeholderTextColor='#00a1ed' placeholder="Your password" secureTextEntry={true} onChangeText={(pw) => this.setState({pw})} />
                                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                                        <TouchableOpacity onPress={this._onPressRegister.bind(this)} underlayColor="white">
                                            <View style={styles.button}>
                                                <Text style={styles.buttonText}>Register</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                                        <TouchableOpacity onPress={this._onPressBackToLogin.bind(this)} underlayColor="white">
                                            <View style={styles.button}>
                                                <Text style={styles.buttonText}>Back to login</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </Animated.View> : <View/>}
                    { this.state.show_loading ?
                    <Animated.View style={{ zIndex: 2, opacity: this.state.loadingAnim, flex: 1, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                        <View style={{ opacity: 0.7, backgroundColor: "#000", flex: 1, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                                <ActivityIndicator size="large" color="#FFF" />
                            </View>
                        </View>
                    </Animated.View> : <View />}
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