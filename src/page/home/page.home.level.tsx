import React, { useEffect, useState } from 'react';
import { Button, Font, L, SvgIcon } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { DEFAULT_MARGIN } from '@constants';
import { TouchableWithoutFeedback } from 'react-native';
import { interval, take } from 'rxjs';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

export const PageHomeLevel: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigationService();

  useEffect(() => {
    const subscription = interval(3000)
      .pipe(take(1))
      .subscribe(() => {
        setStep((prev) => prev + 1);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // TODO 랜덤 캐릭터 부여

  return (
    <FrameLayout statusBarColor={step === 1 ? 'HOME_BG' : 'BLACK'}>
      {step === 1 ? (
        <L.Col mt={60} ph={DEFAULT_MARGIN}>
          <Font type="TITLE1_BOLD" color="WHITE">
            야호!
          </Font>
          <Font type="TITLE1_BOLD" color="WHITE">
            럭키즈가 한단계 성장해요
          </Font>
          <L.Row
            w={SCREEN_WIDTH - 2 * CHARACTER_MARGIN}
            h={SCREEN_WIDTH - 2 * CHARACTER_MARGIN}
            bg={'LUCK_GREEN'}
          />
        </L.Col>
      ) : (
        <L.Col justify="center" ph={DEFAULT_MARGIN} h="100%" items="center">
          <L.Row
            w={SCREEN_WIDTH - 2 * CHARACTER_MARGIN}
            h={SCREEN_WIDTH - 2 * CHARACTER_MARGIN}
            bg={'LUCK_GREEN'}
          />
          <Font type="TITLE2_BOLD" color="WHITE" mt={30}>
            짠, 아직 새싹
          </Font>
          <Font type="BODY_REGULAR" color="GREY0" mt={16} textAlign="center">
            {
              '아직 새싹 단계예요. 습관을 수행하여\n행운을 가져다 줄 클로버를 키워보세요!'
            }
          </Font>
          <L.Row g={8} mt={80}>
            {/* 이미지 저장 */}
            <TouchableWithoutFeedback>
              <L.Col
                bg="BLACK"
                style={{
                  opacity: 0.5,
                }}
                flex-1
                ph={46}
                pv={15}
                items="center"
                rounded={15}
                g={10}
              >
                <SvgIcon name="icon_download_green" size={20} />
                <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                  이미지 저장
                </Font>
              </L.Col>
            </TouchableWithoutFeedback>
            {/* 프로필 공유  */}
            <TouchableWithoutFeedback>
              <L.Col
                bg="BLACK"
                style={{
                  opacity: 0.5,
                }}
                flex-1
                ph={46}
                pv={15}
                items="center"
                rounded={15}
                g={10}
              >
                <SvgIcon name="icon_share_green" size={20} />
                <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                  프로필 공유
                </Font>
              </L.Col>
            </TouchableWithoutFeedback>
          </L.Row>
        </L.Col>
      )}
    </FrameLayout>
  );
};

const CHARACTER_MARGIN = 75;
