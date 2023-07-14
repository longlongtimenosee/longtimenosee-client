import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { label, light, globalColor } from '@/assets/themes';
import { horizontalScale, verticalScale } from '@/utils/matric';

interface ButtonMainProps {
  buttonState?: 'InActivePrimary' | 'ActivePrimary' | 'Line' | 'BW';
  backgroundColor?: string;
  borderRadius?: number;
  border?: number;
  onPress?: (() => void) | (() => Promise<void>);
  disabled?: boolean;
  children?: ReactNode;
  textColor?: string;
}

interface ButtonTextProps {
  textColor?: string;
}

const ButtonMain = ({
  buttonState,
  backgroundColor,
  borderRadius = 4,
  border = 0,
  onPress,
  children = '텍스트',
  textColor,
  disabled = false,
  ...rest
}: ButtonMainProps) => {
  switch (buttonState) {
    case 'InActivePrimary':
      backgroundColor = globalColor.blue[200];
      textColor = light.background;
      disabled = true;
      break;
    case 'ActivePrimary':
      backgroundColor = globalColor.primary;
      textColor = light.background;
      break;
    case 'Line':
      backgroundColor = light.background;
      textColor = light.contents.contentThird;
      border = 1;
      break;
    case 'BW':
      backgroundColor = light.contents.contentMain;
      textColor = light.background;
      break;
    default:
      backgroundColor = globalColor.primary;
      textColor = light.background;
      break;
  }

  return (
    <StButton
      buttonState={buttonState}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      border={border}
      onPress={onPress}
      disabled={disabled}
      textColor={textColor}
      {...rest}
    >
      <StButtonText textColor={textColor}>{children}</StButtonText>
    </StButton>
  );
};

const StButton = styled.Pressable<ButtonMainProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${horizontalScale(152)}px;
  height: ${verticalScale(40)}px;
  border-radius: 4px;
  border: ${(props) => props.border}px solid ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
`;

const StButtonText = styled.Text<ButtonTextProps>`
  color: ${(props) => props.textColor};
  ${label.Small};
`;

export default ButtonMain;
