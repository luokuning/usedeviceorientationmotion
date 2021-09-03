<h1 align="center" style="border-bottom: none;">useDeviceOrientationMotion</h1>
<h3 align="center">Card like rotation Value built on top of device orientation event for react-native</h3>

<p align="center">
  <img alt="sementic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" />
  <img alt="npm latest version" src="https://img.shields.io/npm/v/usedeviceorientationmotion/latest.svg" />
  <img alt="RPs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
  <br />
  <br />
  <br />
  <img src="https://github.com/luokuning/usedeviceorientationmotion/blob/main/assets/motion.gif?raw=true" />
</p>

`usedeviceorientationmotion` track device orientation event via [react-native-sensors](https://github.com/react-native-sensors/react-native-sensors), and calculate the right
rotation angle (`rotationX`, `rotationY`). It also leverages [three.js](https://github.com/mrdoob/three.js) to avoid [gimbal lock](https://en.wikipedia.org/wiki/Gimbal_lock) problem.


### Install

Install `usedeviceorientationmotion` and it's peer dependencies.
```bash
npm i usedeviceorientationmotion react-native-sensors three
# or
yarn add usedeviceorientationmotion react-native-sensors three
```

### Usage

```jsx
import useDeviceOrientationValue from 'usedeviceorientationmotion'
import { View, Image, Text, StyleSheet } from 'react-native'
import React from 'react'
import Card from '../../assets/images/address/img.jpg'

const App = () => {
  const { rotation } = useDeviceOrientationValue({
    limit: 12,
    sensitivityX: 90,
    sensitivityY: 45,
  })
  return (
    <View
      style={[
        styles.container,
        {
          transform: [
            { perspective: 800 },
            { rotateX: `${rotation.x}deg` },
            { rotateY: `${rotation.y}deg` },
          ],
        },
      ]}>
      <Image source={Card} style={styles.cardImage} />
      <Text
        style={[
          styles.title,
          { transform: [{ translateX: rotation.x * 0.3 }, { translateY: rotation.y * 0.3 }] },
        ]}>
        CREDIT CARD
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 200,
    marginLeft: 35,
    marginTop: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cardImage: {
    width: 300,
    height: 200,
    borderRadius: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
    position: 'absolute',
    top: 70,
    left: 60,
  },
})

export default App

```

### Paramters

| Key          | Type   | Default Value | Description                                     |
|--------------|--------|---------------|-------------------------------------------------|
| limit        | number | 15            | The maximum degree                              |
| sensitivityX | number | 180           | The ratio that react to device motion in X axis |
| sensitivityY | number | 90            | The ratio that react to device motion in Y axis |


### Return
```jsx
const { rotation, subscribe, unsubscribe } = useDeviceOrientationValue()
```

| Value       | Type                     | Desciption                           |
|-------------|--------------------------|--------------------------------------|
| rotation    | { x: number; y: number } | Rotation angle                       |
| subscribe   | () => void               | Subscribe device orientation event   |
| unsubscribe | () => void               | Unsubscribe device orientation event |
