import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { globalColor, heading, light } from '@/assets/themes';
import { InputLine } from '@/components/inputs';
import { ButtonMain } from '@/components/buttons';
import { View, Alert } from 'react-native';
import { randomProfileColor } from '@/utils/randomProfileColor';
import { CustomError, ScreenProps } from '@/types';
import { updateProfile } from '@/apis/user';
import { userInfo } from '@/states/userState';
import { useSetRecoilState } from 'recoil';
interface StProfileProps {
  profileColor: string;
}

const NICKNAME_MIN_LENGTH = 2;

const CreateProfileScreen = ({ navigation }: ScreenProps<'CreateProfileScreen'>) => {
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  const setUserInfo = useSetRecoilState(userInfo);

  const profileColor = useRef(randomProfileColor()).current;

  const updateProfileHandler = async () => {
    try {
      const response = await updateProfile({
        nickname,
        description: description === '' ? '자기소개를 입력해보세요.' : description,
        profile_color: profileColor,
        is_profile: true,
      });

      setUserInfo((prev) => ({
        ...prev,
        nickname: response.data.data.nickname,
        description: response.data.data.description,
        profile_color: response.data.data.profile_color,
        is_profile: response.data.data.is_profile,
      }));

      navigation.navigate('MainScreen');
      Alert.alert('회원가입 완료', '회원가입을 축하드립니다!\n약속이나 그룹을 생성해보세요!', [
        { text: '확인' },
      ]);
    } catch (error) {
      const message = (error as CustomError).response?.data?.error?.message ?? error;
      Alert.alert('에러', `${message}`, [{ text: '확인' }]);
    }
  };

  return (
    <StContainer>
      <StProfile profileColor={profileColor}>
        <StProfileText>{nickname.slice(0, 1)}</StProfileText>
      </StProfile>
      <View>
        <InputLine
          placeholder="닉네임은 최소 두글자 이상이어야 합니다."
          label="닉네임"
          maxLength={15}
          value={nickname}
          onChangeText={(value: string) => setNickname(value)}
        />
        <InputLine
          placeholder="자기소개를 입력해보세요."
          label="자기소개"
          maxLength={100}
          value={description}
          onChangeText={(value: string) => setDescription(value)}
        />
      </View>
      <ButtonMain
        buttonState={nickname.length >= NICKNAME_MIN_LENGTH ? 'ActivePrimary' : 'InActivePrimary'}
        width={312}
        onPress={updateProfileHandler}
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
