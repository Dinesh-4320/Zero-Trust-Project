import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon2 name="home-sharp" size={30} color="#003580" />
              ) : (
                <Icon2 name="home-outline" size={30} />
              ),
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Bookings',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon2 name="notifications" size={30} color="#003580" />
              ) : (
                <Icon2 name="notifications-outline" size={30} />
              ),
          }}
        />
        <Tab.Screen
          name="ChatBot"
          component={HomeScreen}
          options={{
            tabBarLabel: 'ChatBot',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon2 name="chatbubbles" size={30} color="#003580" />
              ) : (
                <Icon2 name="chatbubbles-outline" size={30} />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon1 name="account" size={30} color="#003580" />
              ) : (
                <Icon1 name="account-outline" size={30} />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
