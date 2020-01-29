/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import LoginScreen from "./src/screens/LoginScreen";
import PickOrderScreen from "./src/screens/PickOrderScreen";
import PutOrderScreen from "./src/screens/PutOrderScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import DashScreen from "./src/screens/DashScreen";
import MyOrderScreen from "./src/screens/MyOrderScreen";
import MapScreen from "./src/screens/MapScreen";
import FirstSetupScreen from "./src/screens/FirstSetupScreen";
import PartnerScreen from "./src/screens/PartnerScreen";
import MyOrderItemsScreen from "./src/screens/MyOrderItemsScreen";
import {
  StackNavigator,
} from 'react-navigation';

/**
 * Screens
 */
const App = StackNavigator({
  Login: { screen: LoginScreen },
  PickOrder: { screen: PickOrderScreen }, 
  Map: { screen: MapScreen }, 
  Dashboard: { screen: DashScreen }, 
  FirstSetup: { screen: FirstSetupScreen }, 
  MyOrder: { screen: MyOrderScreen }, 
  Profile: { screen: ProfileScreen }, 
  PutOrder: { screen: PutOrderScreen }, 
  Partner: { screen: PartnerScreen }, 
  MyOrderItems: { screen: MyOrderItemsScreen }
}, {
  initialRouteName: 'Login',
  headerMode: 'screen'
});

export default App;