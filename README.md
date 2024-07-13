# QiblaFinder

QiblaFinder is a component for React Native that displays the Qibla direction and compass functionality. This component provides dynamic updates based on device sensor data and offers visual feedback on the Qibla and compass directions.

## Installation

To install the package using Yarn and Npm, run the following command:


from yarn:
```sh
yarn add react-native-qibla-finder
 ```

 from npm:
```sh
npm install react-native-qibla-finder
 ```


## Usage

Here's a basic example of how to use the component:


```javascript
import React from 'react';
import { View } from 'react-native';
import { QiblaFinder } from 'react-native-qibla-finder;

const App = () => (
  <View style={{ flex: 1 }}>
    <QiblaFinder />
  </View>
);

export default App;
```

## Props 

| Prop                       | Type                         | Default                                    | Description                                  |
|----------------------------|------------------------------|--------------------------------------------|----------------------------------------------|
| `backgroundColor`          | `string`                     | `transparent`                              | Background color                             |
| `style`                    | `StyleProp<ViewStyle>`       | `-`                                        | Additional styles for the container          |
| `qiblaDirectionImage`      | `string`                     | `require('./assets/kaaba.png')`            | Image for Qibla direction                    |
| `qiblaDirectionImageStyle` | `StyleProp<ImageStyle>`      | `-`                                        | Styles for Qibla direction image             |
| `qiblaDirectionTextStyle`  | `StyleProp<TextStyle>`       | `-`                                        | Styles for Qibla direction text              |
| `qiblaDirectionStyle`      | `StyleProp<ViewStyle>`       | `-`                                        | Styles for Qibla direction container         |
| `compassDirectionStyle`    | `StyleProp<ViewStyle>`       | `-`                                        | Styles for compass direction container       |
| `compassDirectionTextStyle`| `StyleProp<TextStyle>`       | `-`                                        | Styles for compass direction text            |
| `compassStyle`             | `StyleProp<ViewStyle>`       | `-`                                        | Styles for compass container                 |
| `compassImage`             | `string`                     | `require('./assets/compass.png')`          | Image for compass                            |
| `compassImageStyle`        | `StyleProp<ImageStyle>`      | `-`                                        | Styles for compass image                     |
| `kaabaImage`               | `string`                     | `require('./assets/kaaba.png')`            | Image for Kaaba                              |
| `kaabaStyle`               | `StyleProp<ViewStyle>`       | `-`                                        | Styles for Kaaba container                   |
| `showLoadingIndicator`     | `boolean`                    | `true`                                     | Whether to show the loading indicator        |
| `loadingIndicatorSize`     | `number`                     | `50`                                       | Size of the loading indicator                |
| `loadingIndicatorColor`    | `string`                     | `black`                                    | Color of the loading indicator               |
| `showQiblaDirection`       | `boolean`                    | `true`                                     | Whether to show the Qibla direction          |
| `showCompassDirection`     | `boolean`                    | `true`                                     | Whether to show the compass direction        |
| `vibrateDisable`           | `boolean`                    | `false`                                    | Whether to disable vibration                 |
| `onError`                  | `(error: string) => void`    | `-`                                        | Callback function to handle errors           |


## Example Usage

For more control and customization, see the following example:


```javascript
import React from 'react';
import { View } from 'react-native';
import { QiblaFinder } from 'react-native-qibla-finder';

const App = () => (
  <View style={{ flex: 1 }}>
    <QiblaFinder
      backgroundColor="white"
      qiblaDirectionImage="path/to/custom-qibla-image.png"
      compassImage="path/to/custom-compass-image.png"
      showLoadingIndicator={true}
      loadingIndicatorSize={60}
      loadingIndicatorColor="blue"
      showQiblaDirection={true}
      showCompassDirection={true}
      vibrateDisable={false}
      onError={(error) => console.error("QiblaFinder Error: ", error)}
    />
  </View>
);

export default App;
```
