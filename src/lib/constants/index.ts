import { Dimensions, Platform } from 'react-native';

export const WINDOWS_WIDTH = Dimensions.get('window').width;
export const WINDOWS_HEIGHT = Dimensions.get('window').height;

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const FORMAT = {
   date: 'DD/MM/YYYY',
   dateTime: 'HH:mm DD/MM/YYYY',
   time: 'HH:mm',
   timeWithSeconds: 'HH:mm:ss',
   dateTimeWithSeconds: 'HH:mm:ss DD/MM/YYYY',
};

export const DEFAULT_PAGINATION = {
   skip: 0,
   limit: 30,
};
