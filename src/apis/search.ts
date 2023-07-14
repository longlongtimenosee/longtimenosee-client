import instance from '@/apis/index';
import { KAKAO_REST_API_KEY } from '@env';

export const searchPlace = (keyword: string, page: number) => {
  return instance.get(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&page=${page}&size=10`,
    {
      headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
    }
  );
};
