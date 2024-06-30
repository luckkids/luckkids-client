export type NotificationItem = {
  id: number;
  alertDescription: string;
  alertHistoryStatus: 'UNCHECKED' | 'CHECKED';
  createdDate: string;
};
