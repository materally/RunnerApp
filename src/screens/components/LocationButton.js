import React, { Component } from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'


export default class LocationButton extends Component {

  static defaultProps = {
    icon: 'home',
    onPress: () => {},
  }

  render() {
    const {onPress, icon} = this.props

/*<Image
          style={styles.image}
          source={AssetMap[icon]}
        />*/

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.5}
      >
        
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    shadowOpacity: 0.12,
  },
  image: {
    width: 21,
    height: 21,
  }
})
