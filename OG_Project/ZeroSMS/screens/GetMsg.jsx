import React, { useState, useEffect } from 'react';
import { View, PermissionsAndroid, Alert, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import SpamScreen from './SpamScreen';

const GetMsg = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    readSMSPermission();
  }, []);

  const readSMSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('SMS read permission granted');
        readSMS();
      } else {
        console.log('SMS read permission denied');
      }
    } catch (error) {
      console.error('Error requesting SMS read permission:', error);
    }
  };

  const readSMS = () => {
    const filter = { box: '' };
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed to list SMS messages:', fail);
      },
      (count, smsList) => {
        const parsedMessages = JSON.parse(smsList);
        setMessages(parsedMessages);
      }
    );
  };

  return (
    <View className="w-full h-full">
        <SpamScreen filteredMsg={messages} />
    </View>
  );
};

export default GetMsg;
