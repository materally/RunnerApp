import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, ListItem, Header, Input, Button, Text } from 'react-native-elements';
import orderitems from '../orderitems.json'

export default class MyOrderItemsScreen extends Component {
    static navigationOptions = {
        title: 'MY ORDERS',
        header: null
    }
    state = {
        Loading: false,
        //orders: []
        orderItems: orderitems
    }
    constructor(props) {
        super(props)
        //this._retrieveData()
    }

    // _retrieveData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('runner:token');
    //       if (value !== null) {
    //         this._loadMyOrders(value)
    //       } else {
    //         this.props.navigation.navigate('Login');
    //       }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //   };

    _removeData = async () => {
        try {
            await AsyncStorage.removeItem('runner:token');
            this.props.navigation.navigate('Login');
        } catch (error) {
            // Error saving data
        }
    };

    // _loadMyOrders = async (token) => {
    //     fetch('http://dolphinx.eu/test/runnerapp/api/my_orders', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             body: "token=" + token
    //         })
    //             .then((response) => response.json())
    //             .then((responseJson) => {
    //                 this.setState({Loading: false})
    //                 console.log(responseJson);
    //                 if(responseJson == null || typeof responseJson === "undefined" || responseJson.hasOwnProperty('code')){
    //                     this._removeData();
    //                 } else {
    //                     this.setState({ orders: responseJson})
    //                 }
    //             })
    //             .catch((error) =>{
    //                 console.log(error);
    //                 this.setState({Loading: false})
    //             })
    // }



    render() {
        const orderItemsJson = this.state.orderItems.items
        const orderItems = orderItemsJson.map((item, i) =>
            <ListItem
                key={i}
                title={item.product_name}
                leftAvatar={{ source: { uri: item.image } }}
                subtitle={"$"+item.price}
                titleStyle={{ fontWeight: 'bold', flexWrap: "wrap" }}
                titleProps={{ numberOfLines: 1 }}
                containerStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#cecece'
                }}
            />
        )

        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'MY ORDERS', style: { color: '#fff' } }}
                />
                <View style={{ paddingTop: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>McDelivery McDonald's</Text>
                </View>
                <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}>
                    {
                        orderItems
                    }
                    <View style={{ paddingTop: 10, paddingBottom: 10, backgroundColor:'#ecf0f1', borderBottomWidth: 1, borderBottomColor: '#95a5a6' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={ styles.totalLeft }>Total:</Text>
                            <Text style={ styles.totalRight }>${this.state.orderItems.summary.total_price}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                            <Text style={ styles.totalLeft }>Delivery Fee:</Text>
                            <Text style={ styles.totalRight }>${this.state.orderItems.summary.delivery_fee}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#95a5a6' }}>
                            <Text style={ styles.totalLeft }>Grand Total:</Text>
                            <Text style={ styles.totalRight }>${this.state.orderItems.summary.grand_total}</Text>
                        </View>
                    </View>
                    <View  style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop:25 }}>
                        <Button
                        title="ACCEPT"
                        icon={
                            <Icon
                              name="check"
                              size={20}
                              color="white"
                            />
                        }
                        containerStyle={{
                            width: '45%'
                        }}
                        titleStyle={{
                            fontWeight: 'bold'
                        }}
                        buttonStyle={{
                            backgroundColor: '#00b894'
                        }}
                        onPress={() => alert("ACCEPTED") }
                        />
                        <Button
                        title="DECLINE"
                        icon={
                            <Icon
                              name="times"
                              size={20}
                              color="white"
                            />
                        }
                        containerStyle={{
                            width: '45%'
                        }}
                        titleStyle={{
                            fontWeight: 'bold'
                        }}
                        buttonStyle={{
                            backgroundColor: '#636e72'
                        }}
                        onPress={() => alert("DECLINED") }
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    totalLeft: {
        textAlign:'right', 
        width:'65%', 
        fontSize: 20
    },
    totalRight: {
        textAlign:'right', 
        width:'34%', 
        fontWeight: 'bold', 
        fontSize: 20, 
        paddingRight: 15 
    }
});