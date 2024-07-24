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

Note For iOS using cocoapods, run:

```sh
$ cd ios/ && pod install
```

**_If you are using Expo, you can start using the package right away. However, if you are using React Native CLI, additional configurations are required._**

### Additional Setup for React Native CLI

If you are using React Native CLI, you need to install and configure expo-modules. Follow the steps provided in the Expo Modules Installation Guide.

from npm:

```sh
npm install expo expo-modules-core expo-sensors expo-location
```

from yarn:

```sh
yarn add expo expo expo-modules-core expo-sensors expo-location
```

Note For iOS using cocoapods, run:

```sh
$ cd ios/ && pod install
```

#### Configuration for iOS

Below is an example of how to modify your `ios/myapp/AppDelegate.h` file:

```diff
#import <RCTAppDelegate.h>
+ #import <Expo/Expo.h>
#import <UIKit/UIKit.h>

- @interface AppDelegate : RCTAppDelegate
+ @interface AppDelegate : EXAppDelegateWrapper

@end

```

Below is an example of how to modify your `ios/Podfile` file:

```diff
+ require File.join(File.dirname(`node --print "require.resolve('expo/package.json')"`), "scripts/autolinking")

# Resolve react_native_pods.rb with node to allow for hoisting
require Pod::Executable.execute_command('node', ['--print',
  'require.resolve'
end

target 'myapp' do
+   use_expo_modules!
+   post_integrate do |installer|
+       begin
+           expo_patch_react_imports!(installer)
+       rescue => e
+           Pod::UI.warn e
+       end
+   end

config = use_native_modules!
use_react_native!(
```

#### Adding Location Permissions to Info.plist

To ensure the app has the necessary permissions to access the device's location, you need to add the following keys to your Info.plist file:

```xml
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to use your location</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to use your location</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to use your location</string>

```

##### Install Pods:

```sh
npx pod-install
```

#### Configuration for Android

Below is an example of how to modify your `android/app/src/main/java/com/myapp/MainActivity.kt` file:

```diff
package com.myapp
+ import expo.modules.ReactActivityDelegateWrapper
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate

/**
 * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
 */
override fun createReactActivityDelegate(): ReactActivityDelegate =
-   DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
+   ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))
```

Below is an example of how to modify your `android/app/src/main/java/com/myapp/MainApplication.kt` file:

```diff
package com.myapp

+ import android.content.res.Configuration
+ import expo.modules.ApplicationLifecycleDispatcher
+ import expo.modules.ReactNativeHostWrapper
import android.app.Application
import com.facebook.react.PackageList

class MainApplication : Application(), ReactApplication {
    override val reactNativeHost: ReactNativeHost =
+ object : DefaultReactNativeHost(this) {
+ ReactNativeHostWrapper(this, object : DefaultReactNativeHost(this) {

        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
                // Packages that cannot be autolinked yet can be added manually here, for example:
                // add(MyReactNativePackage())
            }
        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
+ })
    }

    override val reactHost: ReactHost
-     get() = getDefaultReactHost(applicationContext, reactNativeHost)
+     get() = ReactNativeHostWrapper.createReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        // If you opted-in for the New Architecture, we load the native entry point for this app.
        load()

+     ApplicationLifecycleDispatcher.onApplicationCreate(this)
+    }

+   override fun onConfigurationChanged(newConfig: Configuration) {
+     super.onConfigurationChanged(newConfig)
+     ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
    }
}

```

Below is an example of how to modify your `android/settings.gradle` file:

```diff

apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle");
applyNativeModulesSettingsGradle(settings)
include ':app'
includeBuild('../node_modules/@react-native/gradle-plugin')

+ apply from: new File(["node", "--print", "require.resolve('expo/package.json')"].execute(null, rootDir).text.trim(), "../scripts/autolinking.gradle")
+ useExpoModules()


```

#### Adding Location Permissions to AndroidManifest.xml (Android)

To ensure the app has the necessary permissions to access the device's location, you need to add the following permissions to your AndroidManifest.xml file:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.myapp">

    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>

    <application
        android:requestLegacyExternalStorage="true"
        android:usesCleartextTraffic="true"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="true"
        android:theme="@style/AppTheme">

        <!-- Other configurations -->

    </application>
</manifest>

```

## Usage

Here's a basic example of how to use the component:

```javascript
import React from 'react';
import { View } from 'react-native';
import { QiblaFinder } from 'react-native-qibla-finder';

const App = () => (
  <View style={{ flex: 1 }}>
    <QiblaFinder />
  </View>
);

export default App;
```

## Props

| Prop                        | Type                      | Default                           | Description                            |
| --------------------------- | ------------------------- | --------------------------------- | -------------------------------------- |
| `backgroundColor`           | `string`                  | `transparent`                     | Background color                       |
| `style`                     | `StyleProp<ViewStyle>`    | `-`                               | Additional styles for the container    |
| `qiblaDirectionImage`       | `string`                  | `require('./assets/kaaba.png')`   | Image for Qibla direction              |
| `qiblaDirectionImageStyle`  | `StyleProp<ImageStyle>`   | `-`                               | Styles for Qibla direction image       |
| `qiblaDirectionTextStyle`   | `StyleProp<TextStyle>`    | `-`                               | Styles for Qibla direction text        |
| `qiblaDirectionStyle`       | `StyleProp<ViewStyle>`    | `-`                               | Styles for Qibla direction container   |
| `compassDirectionStyle`     | `StyleProp<ViewStyle>`    | `-`                               | Styles for compass direction container |
| `compassDirectionTextStyle` | `StyleProp<TextStyle>`    | `-`                               | Styles for compass direction text      |
| `compassStyle`              | `StyleProp<ViewStyle>`    | `-`                               | Styles for compass container           |
| `compassImage`              | `string`                  | `require('./assets/compass.png')` | Image for compass                      |
| `compassImageStyle`         | `StyleProp<ImageStyle>`   | `-`                               | Styles for compass image               |
| `kaabaImage`                | `string`                  | `require('./assets/kaaba.png')`   | Image for Kaaba                        |
| `kaabaStyle`                | `StyleProp<ViewStyle>`    | `-`                               | Styles for Kaaba container             |
| `showLoadingIndicator`      | `boolean`                 | `true`                            | Whether to show the loading indicator  |
| `loadingIndicatorSize`      | `number`                  | `50`                              | Size of the loading indicator          |
| `loadingIndicatorColor`     | `string`                  | `black`                           | Color of the loading indicator         |
| `showQiblaDirection`        | `boolean`                 | `true`                            | Whether to show the Qibla direction    |
| `showCompassDirection`      | `boolean`                 | `true`                            | Whether to show the compass direction  |
| `vibrateDisable`            | `boolean`                 | `false`                           | Whether to disable vibration           |
| `onError`                   | `(error: string) => void` | `-`                               | Callback function to handle errors     |

## Example Usage

For more control and customization, see the following example:

```javascript
import React from 'react';
import { View } from 'react-native';
import { QiblaFinder } from 'react-native-qibla-finder';

const App = () => (
  <View style={{ flex: 1 }}>
    <QiblaFinder
      backgroundColor='white'
      qiblaDirectionImage='path/to/custom-qibla-image.png'
      compassImage='path/to/custom-compass-image.png'
      showLoadingIndicator={true}
      loadingIndicatorSize={60}
      loadingIndicatorColor='blue'
      showQiblaDirection={true}
      showCompassDirection={true}
      vibrateDisable={false}
      onError={(error) => console.error('QiblaFinder Error: ', error)}
    />
  </View>
);

export default App;
```

## Feedback

If you have any feedback, please reach out to us at dogankablan@hotmail.com.tr
