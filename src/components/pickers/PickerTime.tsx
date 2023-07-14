import { label, light } from '@/assets/themes';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Picker } from '@/components/pickers';

const ITEM_HEIGHT = 32;

interface PickerTimeProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  isVisible: boolean;
  closeModal: () => void;
}

const PickerTime = ({ onChange, closeModal }: PickerTimeProps) => {
  const [currentAmpm, setCurrentAmpm] = useState(0);
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);

  const ampm = ['', '오전', '오후', '', '', ''];
  const hours = [
    '',
    ' 1',
    ' 2',
    ' 3',
    ' 4',
    ' 5',
    ' 6',
    ' 7',
    ' 8',
    ' 9',
    '10',
    '11',
    '12',
    '',
    '',
    '',
  ];
  const minutes = ['', '00', '30', '', '', ''];

  const confirmHandler = () => {
    const result =
      ampm[currentAmpm + 1] +
      ' ' +
      hours[currentHours + 1].trim() +
      '시' +
      (minutes[currentMinutes + 1] === '30' ? ' ' + minutes[currentMinutes + 1] + '분' : '');
    onChange(result);
    closeModal();
  };

  return (
    <StModalContainer>
      <StModal>
        <StConfirmButton>
          <StConfirmText onPress={confirmHandler} suppressHighlighting={true}>
            확인
          </StConfirmText>
        </StConfirmButton>
        <StTimePickerContainer>
          <StIndicatorHolder />
          <StFlatListContainer>
            <Picker
              items={ampm}
              onIndexChange={(value) => setCurrentAmpm(value)}
              itemHeight={ITEM_HEIGHT}
            />
            <Picker
              items={hours}
              onIndexChange={(value) => setCurrentHours(value)}
              itemHeight={ITEM_HEIGHT}
            />
            <Picker
              items={minutes}
              onIndexChange={(value) => setCurrentMinutes(value)}
              itemHeight={ITEM_HEIGHT}
            />
          </StFlatListContainer>
        </StTimePickerContainer>
      </StModal>
    </StModalContainer>
  );
};

export default PickerTime;

const StModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const StModal = styled.View`
  background-color: ${light.background};
  padding: 47.97px 18px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  position: relative;
`;

const StConfirmButton = styled.Pressable`
  position: absolute;
  top: 19px;
  right: 20px;
`;

const StConfirmText = styled.Text`
  ${label.Medium};
`;

const StTimePickerContainer = styled.View`
  width: 100%;
  height: ${ITEM_HEIGHT * 5}px;
`;

const StIndicatorHolder = styled.View`
  width: 100%;
  height: ${ITEM_HEIGHT}px;
  position: absolute;
  top: ${ITEM_HEIGHT * 2}px;
  background-color: ${light.backgroundSub};
  border-radius: 8px;
`;

const StFlatListContainer = styled.View`
  flex-direction: row;
`;
