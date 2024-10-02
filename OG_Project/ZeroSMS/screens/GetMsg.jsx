import React, { useState, useEffect } from 'react';
import { View, PermissionsAndroid, ActivityIndicator } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import SpamScreen from './SpamScreen';

const GetMsg = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const filter = { box: '' }; // Filter for SMS inbox
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed to list SMS messages:', fail);
        setLoading(false); // Set loading to false on failure
      },
      (count, smsList) => {
        const parsedMessages = JSON.parse(smsList);

        // Apply classification for each message
        const classifiedMessages = parsedMessages.map((message) => {
          const isTransaction = classifyMessage(message.body);
          return { ...message, isTransaction }; // Add 'isTransaction' field
        });

        setMessages(classifiedMessages); // Set the classified messages
        setLoading(false); // Set loading to false when messages are retrieved
      }
    );
  };

  // Function to classify whether a message is a transaction
  const classifyMessage = (messageBody) => {
    // Regex or keyword matching to identify transactions
    const transactionKeywords = /bank|money|transaction|credited|debited|balance|withdraw|deposit/i;
    // Return true if the message contains any transaction-related keywords
    return transactionKeywords.test(messageBody);
  };

  return (
    <View className="w-full h-full">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <SpamScreen messages={messages.length > 0 ? messages : []} />
      )}
    </View>
  );
};

export default GetMsg;
