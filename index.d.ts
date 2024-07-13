import { ComponentType } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface QiblaFinderProps {
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  qiblaDirectionImage?: string;
  qiblaDirectionImageStyle?: StyleProp<ImageStyle>;
  qiblaDirectionTextStyle?: StyleProp<TextStyle>;
  qiblaDirectionStyle?: StyleProp<ViewStyle>;
  compassDirectionStyle?: StyleProp<ViewStyle>;
  compassDirectionTextStyle?: StyleProp<TextStyle>;
  compassStyle?: StyleProp<ViewStyle>;
  compassImage?: string;
  compassImageStyle?: StyleProp<ImageStyle>;
  kaabaImage?: string;
  kaabaStyle?: StyleProp<ViewStyle>;
  showLoadingIndicator?: boolean;
  loadingIndicatorSize?: number;
  loadingIndicatorColor?: string;
  showQiblaDirection?: boolean;
  showCompassDirection?: boolean;
  vibrateDisable?: boolean;
  onError?: (error: string) => void;
}

export interface QiblaFinderRef {
  resetCompass: () => void;
}

declare module 'react-native-qible-finder' {
  const QiblaFinder: ComponentType<QiblaFinderProps>;
  export default QiblaFinder;
}
