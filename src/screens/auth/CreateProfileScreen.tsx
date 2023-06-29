import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { globalColor, heading, light } from '@/assets/themes';
import { InputProfile } from '@/components/inputs';
import { ButtonMain } from '@/components/buttons';
import { View } from 'react-native';
import { randomRGB } from '@/utils/randomRGB';

interface StProfileProps {
  profileColor: string;
}

const NICKNAME_MIN_LENGTH = 2;

const CreateProfileScreen = () => {
  const [isNicknameActive, setIsNicknameActive] = useState(false);
  const [isDescriptionActive, setIsDescriptionActive] = useState(false);

  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  const profileColor = useRef(randomRGB()).current;

  return (
    <StContainer>
      <StProfile profileColor={profileColor}>
        <StProfileText>{nickname.slice(0, 1)}</StProfileText>
      </StProfile>
      <View>
        <InputProfile
          placeholder="닉네임은 최소 두글자 이상이어야 합니다."
          isActive={isNicknameActive}
          onFocus={() => setIsNicknameActive(true)}
          onBlur={() => setIsNicknameActive(false)}
          label="닉네임"
          maxLength={15}
          value={nickname}
          onChangeText={(value: string) => setNickname(value)}
        />
        <InputProfile
          placeholder="자기소개를 입력해보세요."
          isActive={isDescriptionActive}
          onFocus={() => setIsDescriptionActive(true)}
          onBlur={() => setIsDescriptionActive(false)}
          label="자기소개"
          maxLength={100}
          value={description}
          onChangeText={(value: string) => setDescription(value)}
        />
      </View>
      <ButtonMain
        buttonState={nickname.length >= NICKNAME_MIN_LENGTH ? 'ActivePrimary' : 'InActivePrimary'}
        width={312}
      >
        확인
      </ButtonMain>
    </StContainer>
  );
};

export default CreateProfileScreen;

const StContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 36px;
  gap: 28px;
  background-color: ${light.background};
`;

const StProfile = styled.View.attrs<{ borderRadius: number }>({
  borderRadius: 100,
})<StProfileProps>`
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.profileColor ? props.profileColor : light.backgroundSub)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StProfileText = styled.Text`
  color: ${globalColor.white};
  ${heading.XXXL}
`;
