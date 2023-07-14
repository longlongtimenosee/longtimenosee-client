import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import PlanContainer from './PlanContainer';
import styled from 'styled-components/native';
import { InputLine } from '@/components/inputs';
import { IconClock } from '@/assets/icons';
import Modal from 'react-native-modal';
import { PickerTime } from '@/components/pickers';
import { horizontalScale, verticalScale } from '@/utils/matric';

const PlanTime = () => {
  const [timeAfter, setTimeAfter] = useState('');
  const [timeBefore, setTimeBefore] = useState('');
  const [isTimeAfterModal, setIsTimeAfterModal] = useState(false);
  const [isTimeBeforeModal, setIsTimeBeforeModal] = useState(false);

  const validateTimeHandler = (
    value: string,
    comparativeValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value === comparativeValue) {
      Alert.alert('알림', '응답 시작시간과 응답 마감시간이 같을 수 없습니다.', [
        {
          text: '확인',
        },
      ]);
      setValue('');
    } else {
      setValue(value);
    }
  };

  return (
    <PlanContainer navigationBarText="응답받을 시간 범위를 설정해 주세요." buttonText="확인">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <StPickerContainer>
          <Modal isVisible={isTimeAfterModal} backdropColor="transparent" style={{ margin: 0 }}>
            <PickerTime
              onChange={(value) => validateTimeHandler(value, timeBefore, setTimeAfter)}
              isVisible={isTimeAfterModal}
              closeModal={() => setIsTimeAfterModal(false)}
            />
          </Modal>
          <Modal isVisible={isTimeBeforeModal} backdropColor="transparent" style={{ margin: 0 }}>
            <PickerTime
              onChange={(value) => validateTimeHandler(value, timeAfter, setTimeBefore)}
              isVisible={isTimeBeforeModal}
              closeModal={() => setIsTimeBeforeModal(false)}
            />
          </Modal>
          <InputLine
            placeholder="시간을 입력해주세요."
            value={timeAfter}
            labelEnd="이후부터"
            editable={false}
            onPress={() => setIsTimeAfterModal(true)}
            selected={isTimeAfterModal}
          >
            <IconClock />
          </InputLine>
          <InputLine
            placeholder="시간을 입력해주세요."
            value={timeBefore}
            labelEnd="이전으로"
            editable={false}
            onPress={() => setIsTimeBeforeModal(true)}
            selected={isTimeBeforeModal}
          >
            <IconClock />
          </InputLine>
        </StPickerContainer>
      </TouchableWithoutFeedback>
    </PlanContainer>
  );
};

export default PlanTime;

const StPickerContainer = styled.View`
  flex: 1;
  padding: ${verticalScale(20)}px ${horizontalScale(20)}px 0 ${horizontalScale(20)}px;
  align-items: center;
  gap: ${verticalScale(38)}px;
`;
