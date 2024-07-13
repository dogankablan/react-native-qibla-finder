import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';

// Directions are defined for compass point simplification.
const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

// Function to determine compass direction based on degree.
const getDirection = (degree: number) => {
  const index = Math.floor(((degree + 22.5) % 360) / 45);
  return directions[index];
};

// Collection of functions to handle calculations
//#region CalculateFunctions

// Calculate the angle in degrees from magnetometer value.
const calculateDegree = (magnetometerValue: number): number => {
  return magnetometerValue - 90 >= 0
    ? magnetometerValue - 90
    : magnetometerValue + 271;
};

// Apply hysteresis to reduce noise in the magnetometer data.
const applyHysteresis = (
  value: number,
  lastValue: number | null,
  threshold: number
) => {
  if (lastValue === null || Math.abs(value - lastValue) > threshold) {
    return value;
  }
  return lastValue;
};

let lastX: number | null = null;
let lastY: number | null = null;

// Calculate angle using magnetometer sensor data.
const calculateAngle = (magnetometerValue: { x: number; y: number }) => {
  if (!magnetometerValue) {
    return 0;
  }

  const { x, y } = magnetometerValue;

  const stableX = applyHysteresis(x, lastX, 1);
  const stableY = applyHysteresis(y, lastY, 1);

  lastX = stableX;
  lastY = stableY;

  let angleValue = Math.atan2(stableY, stableX) * (180 / Math.PI);
  angleValue = angleValue >= 0 ? angleValue : angleValue + 360;

  return Math.round(angleValue);
};

// Calculate the direction to Qibla from current geographic location.
const calculateQibla = (latitude: number, longitude: number) => {
  const PI = Math.PI;
  const latk = (21.4225 * PI) / 180.0;
  const longk = (39.8264 * PI) / 180.0;
  const phi = (latitude * PI) / 180.0;
  const lambda = (longitude * PI) / 180.0;
  return (
    (180.0 / PI) *
    Math.atan2(
      Math.sin(longk - lambda),
      Math.cos(phi) * Math.tan(latk) - Math.sin(phi) * Math.cos(longk - lambda)
    )
  );
};

//#endregion

// Interface definition for Qibla Compass reference.
export interface QiblaFinderRef {
  reinitCompass: () => void;
}

// Interface definition for Qibla Compass reference.
export interface QiblaFinderProps {
  qiblaCoordinate: number;
  compassDirection: string;
  compassDegree: number;
  compassRotate: number;
  kabaRotate: number;
  error: string | null;
  isLoading: boolean;
  isAligned: boolean;
  reinitCompass: () => void;
}

// Custom hook to handle Qibla direction and compass functionalities.
export const useQiblaFinder = (): QiblaFinderProps => {
  const [subscription, setSubscription] = useState<any>(null);
  const [magnetometer, setMagnetometer] = useState<number>(0);
  const [qiblaCoordinateState, setQiblaCoordinateState] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAligned, setIsAligned] = useState(false);

  // Subscribes to magnetometer updates.
  const subscribe = useCallback(() => {
    Magnetometer.setUpdateInterval(20);
    setSubscription(
      Magnetometer.addListener(data => {
        setMagnetometer(calculateAngle(data));
      })
    );
  }, []);

  // Initializes the compass and requests location permissions.
  const initCompass = useCallback(async () => {
    setIsLoading(true);

    try {
      const isAvailable = await Magnetometer.isAvailableAsync();
      if (!isAvailable) {
        setError('Compass is not available on this device');
        setIsLoading(false);
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission not granted');
        setIsLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const qiblaValue = calculateQibla(
        location.coords.latitude,
        location.coords.longitude
      );
      setQiblaCoordinateState(qiblaValue);
      subscribe();
    } finally {
      setIsLoading(false);
    }
  }, [subscribe]);

  // Unsubscribe from magnetometer to avoid memory leaks.
  const unsubscribe = useCallback(() => {
    subscription && subscription.remove();
    setSubscription(null);
  }, [subscription]);

  useEffect(() => {
    initCompass();

    return () => {
      unsubscribe();
    };
    // This ensures the effect only reruns if initCompass changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initCompass]);

  const compassDegree = useMemo(
    () => calculateDegree(magnetometer),
    [magnetometer]
  );

  useEffect(() => {
    if (Math.abs(compassDegree - qiblaCoordinateState) < 2) {
      setIsAligned(true);
    } else {
      setIsAligned(false);
    }
  }, [compassDegree, qiblaCoordinateState]);

  const compassDirection = getDirection(compassDegree);
  const compassRotate = 360 - compassDegree;
  const kabaRotate = compassRotate + qiblaCoordinateState;

  return {
    qiblaCoordinate: qiblaCoordinateState,
    compassDirection,
    compassDegree,
    compassRotate,
    kabaRotate,
    error,
    isLoading,
    isAligned,
    reinitCompass: initCompass,
  };
};
