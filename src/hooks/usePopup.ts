import { format } from 'date-fns';
import { popupApis } from '@apis/popup';
import ContentPopup from '@global-components/common/ContentPopup/ContentPopup';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import useAsyncEffect from '@hooks/useAsyncEffect';

/**
 * 팝업을 가져와서 표시하는 hook
 * @param isFocused 화면이 포커스되었는지 여부
 */
const usePopup = (isFocused: boolean) => {
  const {
    getCurrentValue: getPopupViewed,
  } = useAsyncStorage<StorageKeys.PopupViewed>(StorageKeys.PopupViewed);

  useAsyncEffect(async () => {
    if (!isFocused) return;

    try {
      const popupData = await popupApis.getPopup();
      
      if (popupData) {
        // 저장된 팝업 목록 확인
        const viewedData = await getPopupViewed();
        const viewedTitles = viewedData?.viewedTitles || {};
        const lastViewedDate = viewedTitles[popupData.title];
        
        // 오늘 날짜 확인
        const today = format(new Date(), 'yyyy-MM-dd');
        
        // 오늘 이미 본 팝업이면 표시하지 않음
        if (lastViewedDate === today) {
          return;
        }

        ContentPopup.show({
          label: popupData.label,
          title: popupData.title,
          description: popupData.description,
          imageUrl: popupData.imageUrl,
          buttons: popupData.buttons,
        });
      }
    } catch (error) {
      console.error('Failed to fetch popup:', error);
    }
  }, [isFocused]);
};

export default usePopup;
