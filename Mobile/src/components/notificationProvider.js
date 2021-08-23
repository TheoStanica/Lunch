import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {registerDevice} from '../redux/thunks/deviceThunks';
import PushNotification from 'react-native-push-notification';

const NotificationProvider = ({children}) => {
  const {accessToken} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe = null;
    if (Platform.OS === 'android') {
      PushNotification.createChannel({
        channelId: 'main',
        channelName: 'Main channel for notifications',
      });
      unsubscribe = messaging().onMessage(message => {
        PushNotification.localNotification({
          channelId: 'main',
          title: message.notification.title,
          message: message.notification.body,
          data: message.data,
        });
      });

      if (accessToken)
        PushNotification.configure({
          onRegister: function (token) {
            dispatch(registerDevice({fcmToken: token.token}));
          },
        });
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [accessToken]);

  return <>{children}</>;
};

export default NotificationProvider;
