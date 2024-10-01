import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {      
    const checkInternetConnectivity = async () => {
      try {
        const state = await NetInfo.fetch();
        if(!state.isConnected){
          Alert.alert('No Internet Connection', 'Please check your internet connection and try again', [
            { text: 'Ok' },
          ]);
        } 
        return;
      } catch (error) {
        Alert.alert('Error', 'An error occurred while checking internet connectivity', [
          { text: 'Ok' },
        ]);
        return false;
      }
    };
    checkInternetConnectivity();
    return;
  }, []);


  const handleLogin = () => {
    console.log('Login');
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill all fields', [{text: 'Ok'}]);
      return;
    }
    else{
      navigation.replace('Main');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-2">
      <KeyboardAvoidingView>
        <View className="items-center justify-center mt-24">
          <Text className="text-[#003580] text-xl font-bold">Sign In</Text>
          <Text className="text-black mt-3 text-lg font-medium">
            Sign In to your Account
          </Text>
        </View>
        <View className="mt-12 mx-5">
          <View className="">
            <Text className="text-[#003580] text-lg font-semibold">Email</Text>
            <TextInput
              className="w-full py-0 px-1 text-black border-gray-400 border-b text-base font-semibold"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View className="mt-5">
            <Text className="text-[#003580] text-lg font-semibold">
              Password
            </Text>
            <TextInput
              className="w-full py-0 px-1 text-black border-gray-400 border-b text-base font-semibold"
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          className="mt-5 mx-5 bg-[#003580] py-3 items-center justify-center rounded-lg"
          onPress={() => handleLogin()}>
          <Text className="text-white text-lg font-semibold">Login In</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
