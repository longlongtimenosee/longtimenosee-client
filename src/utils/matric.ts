import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const figmaBaseWidth = 360;
const figmaBaseHeight = (height / width) * figmaBaseWidth;

/**
 * Scale a value based on the horizontal dimension.-수평(뷰포트)에 기반하여 값을 조정합니다.
 * width, margin-left, margin-right, margin-horizontal, padding-left, padding-right, padding-horizontal, likewise..
 * @param {number} size - The value to be scaled.
 * @returns {number} - The scaled value.
 */
const horizontalScale = (size: number) => (width / figmaBaseWidth) * size;

/**
 * Scale a value based on the vertical dimension.-수직(높이)에 기반하여 값을 조정합니다.
 * height, margin-top, margin-bottom, margin-vertical, line-height, padding-top, padding-bottom, padding-vertical, likewise..
 * @param {number} size - The value to be scaled.
 * @returns {number} - The scaled value.
 */
const verticalScale = (size: number) => (height / figmaBaseHeight) * size;

/**
 * font-size, border-radius, likewise..
 * @param {number} size - The value to be scaled.
 * @param {number} [factor=0] - The factor to adjust the scaling. Default is 0.5.
 * @returns {number} - The scaled value.
 */
const moderateScale = (size: number, factor = 0) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
