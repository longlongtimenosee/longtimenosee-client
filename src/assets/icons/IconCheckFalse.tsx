import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { globalColor, light } from '@/assets/themes';

interface IconCheckProps {
  textColor: 'primary' | 'gray';
}

const IconCheckFalsePrimary = ({ textColor }: IconCheckProps) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M1.8173 18C1.29952 18 0.867187 17.8266 0.520312 17.4797C0.173438 17.1328 0 16.7005 0 16.1827V1.8173C0 1.29952 0.173438 0.867187 0.520312 0.520312C0.867187 0.173438 1.29952 0 1.8173 0H16.1827C16.7005 0 17.1328 0.173438 17.4797 0.520312C17.8266 0.867187 18 1.29952 18 1.8173V16.1827C18 16.7005 17.8266 17.1328 17.4797 17.4797C17.1328 17.8266 16.7005 18 16.1827 18H1.8173ZM1.8173 16.875H16.1827C16.3558 16.875 16.5144 16.8029 16.6587 16.6587C16.8029 16.5144 16.875 16.3558 16.875 16.1827V1.8173C16.875 1.64423 16.8029 1.48558 16.6587 1.34134C16.5144 1.19711 16.3558 1.125 16.1827 1.125H1.8173C1.64423 1.125 1.48558 1.19711 1.34134 1.34134C1.19711 1.48558 1.125 1.64423 1.125 1.8173V16.1827C1.125 16.3558 1.19711 16.5144 1.34134 16.6587C1.48558 16.8029 1.64423 16.875 1.8173 16.875Z"
        fill={textColor === 'primary' ? globalColor.primary : light.contents.contentThird}
      />
    </Svg>
  );
};

export default IconCheckFalsePrimary;
