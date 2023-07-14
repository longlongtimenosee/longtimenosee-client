import React, { useState } from 'react';
import { light } from '@/assets/themes';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { Pressable, FlatList, ListRenderItemInfo, Alert } from 'react-native';
import { PlaceModalDescription, PlaceItem } from '@/components/modals/place';
import { InputSearch } from '@/components/inputs';
import { IconClose } from '@/assets/icons';
import { searchPlace } from '@/apis/search';
import { CustomError } from '@/types';
import uuid from 'react-native-uuid';
import { horizontalScale, verticalScale } from '@/utils/matric';

interface PlaceModalProps {
  isVisible: boolean;
  closeModal: () => void;
  // eslint-disable-next-line no-unused-vars
  changePlaceHandler: (text: string) => void;
}
interface Place {
  id: string;
  address_name?: string;
  place_name: string;
}

interface PlaceResponse extends Place {
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
}

const PlaceModal = ({ isVisible, closeModal, changePlaceHandler }: PlaceModalProps) => {
  const [placeSearchKeyword, setPlaceSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<Place[]>([]);
  const [page, setPage] = useState(1);

  const searchPlaceHandler = async (keyword: string, page: number) => {
    try {
      const response = await searchPlace(keyword, page);

      const places = (response.data.documents as PlaceResponse[]).map((place) => {
        return {
          id: `${uuid.v4()}`,
          address_name: place.road_address_name,
          place_name: place.place_name,
        };
      });

      if (page === 1) {
        setSearchResult([{ id: 'direct', place_name: keyword }, ...places]);
      } else {
        setSearchResult((prev) => [...prev, ...places]);
      }

      setPage((prev) => prev + 1);
    } catch (error) {
      const message = (error as CustomError).response?.data?.error?.message ?? error;
      Alert.alert('에러', `${message}`, [{ text: '확인' }]);
    }
  };

  const confirmPlaceHandler = (placeName: string) => {
    changePlaceHandler(placeName);
    setSearchResult([]);
    setPlaceSearchKeyword('');
    closeModal();
  };

  const pressSearchButtonHandler = () => {
    setSearchResult([]);
    setPage(1);
    void searchPlaceHandler(placeSearchKeyword, page);
  };

  const renderSearchResultItem = ({ item }: ListRenderItemInfo<Place>) => {
    return (
      <PlaceItem
        key={item.id}
        address_name={item.address_name}
        place_name={item.place_name}
        selectPlaceHandler={confirmPlaceHandler}
      />
    );
  };

  return (
    <Modal isVisible={isVisible} backdropColor={light.dim} style={{ margin: 0 }}>
      <StModalContainer>
        <StPlaceModalContainer>
          <StCloseInputContainer>
            <StClose>
              <Pressable onPress={closeModal}>
                <IconClose />
              </Pressable>
            </StClose>
            <InputSearch
              value={placeSearchKeyword}
              onChangeText={(text: string) => setPlaceSearchKeyword(text)}
              onPress={pressSearchButtonHandler}
            />
          </StCloseInputContainer>
          {searchResult.length === 0 && <PlaceModalDescription />}
          <StSearchResultList
            data={searchResult}
            renderItem={renderSearchResultItem}
            showsVerticalScrollIndicator={false}
            onEndReached={() => void searchPlaceHandler(placeSearchKeyword, page)}
            onEndReachedThreshold={0.8}
          />
        </StPlaceModalContainer>
      </StModalContainer>
    </Modal>
  );
};

export default PlaceModal;

const StModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const StPlaceModalContainer = styled.View`
  height: ${verticalScale(550)}px;
  align-items: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${light.background};
`;

const StCloseInputContainer = styled.View`
  width: 100%;
  padding: ${verticalScale(8)}px ${horizontalScale(8)}px ${verticalScale(24)}px
    ${horizontalScale(8)}px;
  gap: ${verticalScale(24)}px;
  align-items: center;
`;

const StClose = styled.View`
  width: 100%;
  height: ${verticalScale(40)}px;
  justify-content: center;
  align-items: flex-end;
  padding-right: ${horizontalScale(13)}px;
`;

const StSearchResultList = styled(FlatList<Place>)`
  width: 100%;
`;
