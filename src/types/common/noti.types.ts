export type NotificationItem = {
  id: number;
  alertDescription: string;
  alertHistoryStatus: 'UNCHECKED' | 'CHECKED';
  alertDestinationType: 'MISSION' | 'FRIEND' | 'WEBVIEW';
  alertDestinationInfo: null | number | string;
  createdDate: string;
};
