import React, {Component} from 'react';
import {View, StyleSheet, Image, PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps'
import { Header, Button, Overlay, Icon, Text } from 'react-native-elements';

export default class MapScreen extends Component {
    static navigationOptions = {
        title: 'PickOrder',
        header: null
    }
    state = {
        infoPopup: false,
    }
    constructor(props) {
        super(props);
        this.togglePopup = this.togglePopup.bind(this)
    }

    togglePopup() {
        this.setState({ infoPopup: !this.state.infoPopup })
    }

    onMapPress(e) {
        let region = {
          latitude:       e.nativeEvent.coordinate.latitude,
          longitude:      e.nativeEvent.coordinate.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
        }
        this.onRegionChange(region, region.latitude, region.longitude);
      }

      _reqPerm = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Runner App need ACCESS_FINE_LOCATION Permission',
              message:
                'We need your GPS to find you on the map ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            
            this.watchID = navigator.geolocation.watchPosition((position) => {
                // Create the object to update this.state.mapRegion through the onRegionChange function
                let region = {
                  latitude:       position.coords.latitude,
                  longitude:      position.coords.longitude,
                  latitudeDelta:  0.00922*1.5,
                  longitudeDelta: 0.00421*1.5
                }
                this.onRegionChange(region, region.latitude, region.longitude);
              }, (error)=>console.log(error));

          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }

    componentDidMount() {
        this.setState({
            position: false,
            region: null
        });
        this._reqPerm()
    }

    onRegionChange(region, lastLat, lastLong) {
        if(lastLat && lastLong) {
            this.setState({
                position: {
                    latitude: lastLat || this.state.latitude,
                    longitude: lastLong || this.state.longitude,
                },
                region
            });
        }
      }

    getCurrentLocation(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let region = {
                    latitude:       position.coords.latitude,
                    longitude:      position.coords.longitude,
                    latitudeDelta:  0.00922*1.5,
                    longitudeDelta: 0.00421*1.5
                }
                this.onRegionChange(region, region.latitude, region.longitude);
            },
            (error) => alert(error.message),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        const { region, position } = this.state
        console.log(position);
        return(
            <View style={{ flex: 1,  backgroundColor: '#FFF' }}>
                <Header
                    leftComponent={{ icon: 'history', color: '#fff', onPress: () => this.props.navigation.navigate('MyOrder') }}
                    centerComponent={{ text: 'Runner', style: { color: '#fff' } }}
                    rightComponent={ { icon: 'person', color: '#fff', onPress: () => this.props.navigation.navigate('Profile') }}
                    />

                <MapView 
                    style={styles.map}
                    region={region}
                    showsUserLocation={true}
                    onPress={this.onMapPress.bind(this)}
                    onRegionChange={this.onRegionChange.bind(this)}>
                {position && (
                    <MapView.Circle
                    center={position}
                    radius={2}
                    strokeColor={'transparent'}
                    fillColor={'rgba(112,185,213,0.30)'}
                    />
                )}
                {position && (
                    <MapView.Circle
                    center={position}
                    radius={1}
                    strokeColor={'transparent'}
                    fillColor={'#3594BC'}
                    />
                )}
                {position && (
                    <MapView.Marker
                    coordinate={position} />
                )}
                </MapView>
                <Overlay
                    isVisible={ this.state.infoPopup }
                    width="auto"
                    height="auto"
                    >
                    <View style={{ padding: 10, width: 270 }}>
                        <Image source={require('../../images/logo.jpg')} style={{ width: 250, height: 72, alignContent: "center" }} />
                        <Text style={{ paddingTop: 20 }}>1. Select your current position with click on the map</Text>
                        <Text>2. Click on the order here button</Text>
                        <Text>3. Fill the form about the order</Text>
                        <Button
                            onPress={() => this.togglePopup() }
                            title="OK"
                            style={{ paddingTop: 10, paddingBottom: 10 }}
                            titleStyle={{ padding: 10 }}
                        />
                    </View>
                </Overlay>

                <View 
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        zIndex: 10,
                        width: '100%',
                        flex: 1, flexDirection: 'row',
                        justifyContent: 'space-around'
                        }}>
                    <View style={{ width: '33%', paddingLeft: 10}}> 
                        <Icon
                            raised
                            name='location-arrow'
                            type='font-awesome'
                            color='#f50'
                            onPress={() => this.getCurrentLocation() } />
                    </View>
                    <View style={{ width: '34%', justifyContent: "space-around" }}>
                        <Button
                            icon={
                                <Icon
                                name="shopping-cart"
                                type='font-awesome'
                                size={15}
                                color="white"
                                />
                            }
                            onPress={ () => this.props.navigation.navigate('PutOrder', { position }) }
                            title="Order here"
                            titleStyle={{ paddingLeft: 10 }}
                        />
                    </View>
                    <View style={{ width: '33%', alignItems: "flex-end", paddingRight: 10}}>
                        <Icon
                            raised
                            name='info'
                            type='font-awesome'
                            color='#f50'
                            onPress={() => this.togglePopup() } />
                    </View>
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EEE',
    },
    map: {
      flex: 1,
      zIndex: -1,
    }
  })