import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { light, paragraph } from '@/assets/themes';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ListRenderItemInfo,
} from 'react-native';

interface PickerProps {
  items: string[];
  // eslint-disable-next-line no-unused-vars
  onIndexChange: (index: number) => void;
  itemHeight: number;
}

const Picker = ({ items, onIndexChange, itemHeight }: PickerProps) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const momentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    onIndexChange(index);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<string>) => {
    const scaleInputRange = [
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
    ];
    const scale = scrollY.interpolate({
      inputRange: scaleInputRange,
      outputRange: [0.85, 1, 0.85],
    });

    const opacityInputRange = [
      (index - 3) * itemHeight,
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
      (index + 1) * itemHeight,
    ];
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [0.35, 0.35, 1, 0.35, 0.35],
    });

    return (
      <StAnimatedPickerContainer
        style={{ transform: [{ scale }], opacity }}
        itemHeight={itemHeight}
      >
        <StPickerItem>{item}</StPickerItem>
      </StAnimatedPickerContainer>
    );
  };

  return (
    <StFlatList
      data={items}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      snapToInterval={itemHeight}
      onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) =>
        momentumScrollEnd(event)
      }
      scrollEventThrottle={16}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      })}
      getItemLayout={(_: unknown, index: number) => ({
        length: itemHeight,
        offset: itemHeight * index,
        index,
      })}
      itemHeight={itemHeight}
    />
  );
};

export default Picker;

const StFlatList = styled(Animated.FlatList<string>)<Pick<PickerProps, 'itemHeight'>>`
  padding-top: ${(props) => props.itemHeight}px;
`;

const StPickerItem = styled.Text`
  color: ${light.contents.contentMain};
  ${paragraph.Large};
`;

const StAnimatedPickerContainer = styled(Animated.View)<Pick<PickerProps, 'itemHeight'>>`
  height: ${(props) => props.itemHeight}px;
  justify-content: center;
  align-items: center;
`;
