import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type Style = {
  compassImage: ImageStyle;
  compass: ViewStyle;
  kabaa: ViewStyle;
  kabaaImage: ImageStyle;
  container: ViewStyle;
  direction: ViewStyle;
  directionText: TextStyle;
  qiblaDirection: ViewStyle;
  qiblaDirectionImage: ImageStyle;
};

export default StyleSheet.create<Style>({
  compassImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    width: 300,
    height: 300,
    zIndex: 1,
  },
  compass: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  kabaa: {
    width: 300,
    height: 300,
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 1,
  },
  kabaaImage: {
    resizeMode: 'center',
    height: 100,
    width: 40,
    zIndex: 1,
  },
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  direction: {
    zIndex: 2,
  },
  directionText: {
    textAlign: 'center',
    fontSize: 30,
  },
  qiblaDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qiblaDirectionImage: { width: 35, height: 35 },
});
