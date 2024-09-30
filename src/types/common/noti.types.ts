export type NotificationItem = {
  id: number;
  alertDescription: string;
  alertHistoryStatus: 'UNCHECKED' | 'CHECKED';
  alertDestinationType: 'MISSION' | 'FRIEND' | 'WEBVIEW' | 'FRIEND_CODE';
  alertDestinationInfo: null | number | string;
  createdDate: string;
};
