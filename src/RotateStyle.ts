/**
 * Generates a style object that applies a rotation transform.
 * This is typically used to rotate components in the UI, such as images or views, based on a given angle.
 *
 * @param {number} angle - The angle in degrees to rotate the component.
 * @returns {StyleProp<ViewStyle>} A style object with the transform property set to the specified rotation.
 */
export const rotateStyle = (angle: number): any => {
  return {
    transform: [
      {
        rotate: `${angle}deg`,
      },
    ],
  };
};
