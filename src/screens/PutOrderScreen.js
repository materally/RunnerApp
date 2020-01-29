import React, { Component } from 'react';
import { AsyncStorage, ScrollView, ActivityIndicator, View, StyleSheet, Text, Linking } from 'react-native';
import { Header, Input, Button, Icon, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import partners from '../partners.json'


export default class PutOrderScreen extends Component {
    static navigationOptions = {
        title: 'NERABY PARTNERS',
        header: null
    }
    state = {
        save: false,
        partners: partners
    }
    constructor(props) {
        super(props);
    }

    _removeData = async () => {
        try {
            await AsyncStorage.removeItem('runner:token');
            this.props.navigation.navigate('Login');
        } catch (error) {
            // Error saving data
        }
    };

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('runner:token');
            if (value !== null) {
                this._saveOrder(value)
            } else {
                this.props.navigation.navigate('Login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    _saveOrder = async (token) => {
        // order_user_id
        // product_name
        // max_price
        // delivery_max_price
        // category_name // desc
        // create_order
        this.setState({ saving: true })
        fetch('http://dolphinx.eu/test/runnerapp/api/new_order', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token=" + token + "&product_name=" + this.state.product_name + "&product_max_price=" + this.state.max_price + "&delivery_max_price=" + this.state.delivery_max_price + "&category_name=" + this.state.category_name
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ saving: false })
                console.log(responseJson);
                if (responseJson == null || typeof responseJson === "undefined" || responseJson.hasOwnProperty('code')) {
                    this._removeData();
                } else {
                    this.props.navigation.goBack()
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ saving: false })
            })
    }

    render() {
        const partners = this.state.partners.map((partner, index) =>
            <ListItem
                key={index}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                linearGradientProps={(partner.priority > 0) ? {
                    colors: ['#74b9ff', '#0984e3'],
                    start: { x: 1, y: 0 },
                    end: { x: 0.2, y: 0 },
                } : {
                        colors: ['#636e72', '#b2bec3'],
                        start: { x: 1, y: 0 },
                        end: { x: 0.2, y: 0 },
                    }}
                ViewComponent={LinearGradient} // Only if no expo
                leftAvatar={{ rounded: true, source: {uri: (partner.image === null) ?  "https://picsum.photos/50/50/?random" : partner.image }}}
                title={partner.shop_name}
                titleStyle={{ color: 'white', fontWeight: 'bold', flexWrap: "wrap" }}
                titleProps={{ numberOfLines: 1 }}
                subtitleStyle={{ color: 'white' }}
                subtitle={partner.distance+ " miles"}
                chevronColor="white"
                chevron
                containerStyle={{ borderRadius: 6, width: '95%', marginBottom: 10 }}
                onPress={ () => this.props.navigation.navigate('Partner')}
            />
        )


        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'NEARBY PARTNERS', style: { color: '#fff' } }}
                />
                <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: 30 }}>
                    {/* <Text style={{ fontWeight: 'bold', paddingTop: 30, paddingBottom: 20, color: '#000', fontSize: 20, textAlign: 'center'}}>Make a request</Text> */}
                    {partners}
                    {/* <View style={{ flex: 1, width: '80%', padding: 20, alignSelf: 'center'}}>
                            <Button
                                title="SAVE"
                                loading={ this.state.saving }
                                onPress={() => this._retrieveData() }
                                />
                        </View>
                        <View style={{ flex: 1, width: '80%', padding: 20, paddingTop: 40, alignSelf: 'center'}}>
                            <Button
                                title="I WANT TO BECOME A RUNNER"
                                onPress={() => Linking.openURL('https://runner.com') }
                                />
                        </View> */}
                </ScrollView>
            </View>
        );
    }
}