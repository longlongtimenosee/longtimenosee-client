import React from 'react';
import { Keyboard, Platform, Pressable } from 'react-native';
import { light, paragraph } from '@/assets/themes';
import styled from 'styled-components/native';
import { IconSearchSmall } from '@/assets/icons';
import { horizontalScale, verticalScale } from '@/utils/matric';

interface InputSearchProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void;
  onPress: () => void;
}
const InputSearch = ({ value, onChangeText, onPress }: InputSearchProps) => {
  const onPressSearchButtonHandler = () => {
    onPress();
    Keyboard.dismiss();
  };

  return (
    <StInputContainer>
      <StInput
        placeholder="장소를 검색해보세요."
        value={value}
        onChangeText={onChangeText}
        maxLength={20}
      />
      <Pressable onPress={onPressSearchButtonHandler}>
        <IconSearchSmall />
      </Pressable>
    </StInputContainer>
  );
};

export default InputSearch;

const StInputContainer = styled.View`
  flex-direction: row;
  width: ${horizontalScale(312)}px;
  height: ${verticalScale(40)}px;
  border-radius: 4px;
  padding: ${verticalScale(9)}px ${horizontalScale(11)}px ${verticalScale(9)}px
    ${horizontalScale(12)}px;
  background-color: ${light.backgroundSub};
  align-items: center;
`;

const StInput = styled.TextInput.attrs({ placeholderTextColor: light.contents.contentThird })`
  height: ${verticalScale(22)}px;
  color: ${light.contents.contentMain};
  ${paragraph.Small};
  padding: 0;
  line-height: ${Platform.OS === 'ios' ? 0 : paragraph.Small.lineHeight};
  flex-grow: 1;
  margin-right: ${horizontalScale(11)}px;
`;
