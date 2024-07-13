import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo
} from 'react';
import { ActivityIndicator, Image, Text, Vibration, View } from 'react-native';
import { QiblaFinderProps, QiblaFinderRef } from '../index.d';

import styles from './QiblaFinder.style';
import { rotateStyle } from './RotateStyle';
import { useQiblaFinder } from './hook/useQiblaCompass';

/**
 * A component to display the Qibla direction, compass functionality, and related visual indicators.
 * It offers dynamic updates based on device sensor data and provides visual feedback on the Qibla and compass directions.
 *
 * @component
 * @param {QiblaFinderProps} props - The props passed to the component.
 * @param {React.Ref} ref - Ref to access internal functions from the parent component, such as reinitializing the compass.
 */
const QiblaFinder = forwardRef<QiblaFinderRef, QiblaFinderProps>(
  (
    {
      backgroundColor = 'transparent', // Default background color
      style, // Additional styles for the container
      showQiblaDirection = true, // Flag to show or hide Qibla direction
      qiblaDirectionTextStyle, // Styles for the Qibla direction text
      qiblaDirectionImageStyle, // Styles for the Qibla direction image
      qiblaDirectionStyle, // Styles for the Qibla direction container
      compassStyle, // Styles for the compass container
      qiblaDirectionImage = require('./assets/kaaba.png'), // Default Qibla direction image
      compassImage = require('./assets/compass.png'), // Default compass image
      kaabaImage = require('./assets/kaaba.png'), // Default Kaaba image
      loadingIndicatorSize = 50, // Size of the loading indicator
      loadingIndicatorColor = 'black', // Color of the loading indicator
      showLoadingIndicator = true, // Flag to show or hide the loading indicator
      showCompassDirection = true, // Flag to show or hide the compass direction
      compassDirectionStyle, // Styles for the compass direction container
      compassDirectionTextStyle, // Styles for the compass direction text
      compassImageStyle, // Styles for the compass image
      kaabaStyle, // Styles for the Kaaba image container
      vibrateDisable = false, // Flag to enable or disable vibration
      onError // Callback function to handle errors
    },
    ref
  ) => {
    //#region  Custom Hooks

    // Using custom hook to get Qibla direction and compass functionalities
    const {
      qiblaCoordinate,
      compassDirection,
      compassDegree,
      compassRotate,
      kabaRotate,
      error,
      isLoading,
      isAligned,
      reinitCompass
    } = useQiblaFinder();

    // Exposing reinitCompass method to parent component via ref
    useImperativeHandle(ref, () => ({ reinitCompass }), [reinitCompass]);

    //#endregion

    //#region Callback Hooks

    // Callback to handle vibration
    const handleVibrate = useCallback(() => {
      Vibration.vibrate();
    }, []);

    //#endregion

    //#region Memo Hooks

    // Memoized component for rendering Qibla direction
    const renderQiblaDirection = useMemo(
      () =>
        showQiblaDirection ? (
          <View style={[styles.qiblaDirection, qiblaDirectionStyle]}>
            <Image
              source={qiblaDirectionImage}
              style={[styles.qiblaDirectionImage, qiblaDirectionImageStyle]}
            />
            <Text style={[styles.directionText, qiblaDirectionTextStyle]}>
              {qiblaCoordinate.toFixed(0)}°
            </Text>
          </View>
        ) : null,
      [
        showQiblaDirection,
        qiblaDirectionTextStyle,
        qiblaCoordinate,
        qiblaDirectionImage,
        qiblaDirectionImageStyle,
        qiblaDirectionStyle
      ]
    );

    // Memoized component for rendering compass direction
    const renderCompassDirection = useMemo(
      () =>
        showCompassDirection ? (
          <View style={[styles.direction, compassDirectionStyle]}>
            <Text style={[styles.directionText, compassDirectionTextStyle]}>
              {compassDirection}
            </Text>
            <Text style={[styles.directionText, compassDirectionTextStyle]}>
              {compassDegree}°
            </Text>
          </View>
        ) : null,
      [
        showCompassDirection,
        compassDirection,
        compassDegree,
        compassDirectionTextStyle,
        compassDirectionStyle
      ]
    );

    // Memoized component for rendering compass
    const renderCompass = useMemo(
      () => (
        <View style={[styles.compass, compassStyle]}>
          <Image
            source={compassImage}
            style={[
              styles.compassImage,
              compassImageStyle,
              rotateStyle(compassRotate)
            ]}
          />
          <View style={[styles.kabaa, kaabaStyle, rotateStyle(kabaRotate)]}>
            <Image source={kaabaImage} style={styles.kabaaImage} />
          </View>
        </View>
      ),
      [
        compassImage,
        kaabaImage,
        compassRotate,
        kabaRotate,
        compassStyle,
        compassImageStyle,
        kaabaStyle
      ]
    );

    //#endregion

    //#region useEffects

    // Effect to handle errors
    useEffect(() => {
      if (error && onError) {
        onError(error);
      }
    }, [error, onError]);

    // Effect to handle vibration when aligned
    useEffect(() => {
      if (!vibrateDisable) {
        if (isAligned) {
          handleVibrate();
        }
      }
    }, [isAligned, handleVibrate, vibrateDisable]);

    //#endregion

    // Show loading indicator if loading
    if (isLoading && showLoadingIndicator) {
      return (
        <View style={[styles.container, { backgroundColor }]}>
          <ActivityIndicator
            size={loadingIndicatorSize}
            color={loadingIndicatorColor}
          />
        </View>
      );
    }

    // Main render return
    return (
      <View style={[styles.container, style]}>
        {renderCompassDirection}
        {renderCompass}
        {renderQiblaDirection}
      </View>
    );
  }
);

export default QiblaFinder;
