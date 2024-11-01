import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { InteractionManager, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { format } from 'date-fns';
import { useRecoilState } from 'recoil';
import { APP_LAUNCH_DATE } from '@constants';
import { useHomeCalendar } from '@queries';
import Month from './home.calendar.month';
import { activatedDatesState } from '@recoil/recoil.calendar';

interface MonthData {
  month: number;
  year: number;
}

const HomeCalendar: React.FC = () => {
  const flashListRef = useRef<FlashList<MonthData>>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activatedDates, setActivatedDates] =
    useRecoilState(activatedDatesState);
  const [isReady, setIsReady] = useState(false);

  const today = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);

  const { startMonth, endMonth } = useMemo(() => {
    const start = new Date(APP_LAUNCH_DATE);
    start.setMonth(start.getMonth() + 1);
    const end = new Date(today);
    end.setMonth(end.getMonth() + 10);
    return { startMonth: start, endMonth: end };
  }, [today]);

  const getMonthsInRange = useCallback(
    (start: Date, end: Date): MonthData[] => {
      const current = new Date(start.getFullYear(), start.getMonth(), 1);
      const months: MonthData[] = [];

      while (current <= end) {
        months.push({ month: current.getMonth(), year: current.getFullYear() });
        current.setMonth(current.getMonth() + 1);
      }

      return months;
    },
    [],
  );

  const months = useMemo(
    () => getMonthsInRange(startMonth, endMonth),
    [getMonthsInRange, startMonth, endMonth],
  );

  const currentMonthIndex = useMemo(() => {
    const now = new Date();
    return months.findIndex(
      (item) =>
        item.month === now.getMonth() && item.year === now.getFullYear(),
    );
  }, [months]);

  const { data: homeCalendarInfo } = useHomeCalendar({
    missionDate: format(currentDate, 'yyyy-MM-dd'),
  });

  useEffect(() => {
    if (!homeCalendarInfo) return;
    const newDates = homeCalendarInfo.calendar
      .filter((c) => c.hasSucceed)
      .map((c) => c.missionDate);
    setActivatedDates((prevDates) => [...prevDates, ...newDates]);
  }, [homeCalendarInfo, setActivatedDates]);

  useEffect(() => {
    const prepare = async () => {
      await InteractionManager.runAfterInteractions();
      setIsReady(true);
    };

    prepare();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: MonthData }) => (
      <View style={{ height: 300 }}>
        <Month month={item.month} year={item.year} />
      </View>
    ),
    [],
  );

  if (!isReady) {
    return null;
  }

  return (
    <FlashList
      ref={flashListRef}
      data={months}
      renderItem={renderItem}
      estimatedItemSize={300}
      overrideItemLayout={(layout, item) => {
        layout.size = 300;
      }}
      keyExtractor={(item) => `${item.year}-${item.month}`}
      initialScrollIndex={currentMonthIndex !== -1 ? currentMonthIndex : 0}
    />
  );
};

export default HomeCalendar;
