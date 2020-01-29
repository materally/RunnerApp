import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, ListItem, Header, Input, Button } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import myorders from '../myorders.json'

export default class MyOrderScreen extends Component {
  static navigationOptions = {
    title: 'MY ORDERS',
    header: null
  }
  state = {
    loginCheckLoading: false,
    //orders: []
    orders: myorders
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
  //                 this.setState({loginCheckLoading: false})
  //                 console.log(responseJson);
  //                 if(responseJson == null || typeof responseJson === "undefined" || responseJson.hasOwnProperty('code')){
  //                     this._removeData();
  //                 } else {
  //                     this.setState({ orders: responseJson})
  //                 }
  //             })
  //             .catch((error) =>{
  //                 console.log(error);
  //                 this.setState({loginCheckLoading: false})
  //             })
  // }

  renderRow(item, i) {
    console.log(item)
    color = ['#636e72', '#b2bec3']
    if (item.status == 0) {
      color = ['#636e72', '#b2bec3']
    }
    if (item.status == 1) {
      color = ['#f1c40f', '#f39c12']
    }
    if (item.status == 2) {
      color = ['#74b9ff', '#0984e3']
    }
    if (item.status == 3) {
      color = ['#2ecc71', '#27ae60']
    }
    return (
      <ListItem
        key={i}
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
          colors: color,
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
        ViewComponent={LinearGradient} // Only if no expo
        leftAvatar={{ rounded: true, source: { uri: (item.image === null) ? "https://picsum.photos/50/50/?random" : item.image } }}
        title={item.shop_name}
        titleStyle={{ color: 'white', fontWeight: 'bold', flexWrap: "wrap" }}
        titleProps={{ numberOfLines: 1 }}
        subtitleStyle={{ color: 'white' }}
        subtitle={item.ordered}
        chevronColor="white"
        chevron
        containerStyle={{ borderRadius: 6, width: '95%', marginBottom: 10 }}
        onPress={() => { this.props.navigation.navigate('MyOrderItems'); }}
      />
    )
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
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <Header
            leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack() }}
            centerComponent={{ text: 'MY ORDERS', style: { color: '#fff' } }}
          />
          <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: 30 }}>
            {
              this.state.orders.map((item, i) => (
                this.renderRow(item, i)
              ))
            }
          </ScrollView>
        </View>
      );
    }
  }
}