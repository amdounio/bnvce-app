// Make sure to import useContext
import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import BottomSheet from './src/components/BottomSheet';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AdvisorScreen from './src/screens/AdvisorScreen';
import ContractsScreen from './src/screens/ContractsScreen';
import MenuScreen from './src/screens/MenuScreen';

import HomeIcon from './src/assets/img/menu/home.svg';
import ConseillerIcon from './src/assets/img/menu/conseiller.svg';
import ListIcon from './src/assets/img/menu/list.svg';
import MoreIcon from './src/assets/img/menu/more.svg';
import Plus from './src/assets/img/menu/ph_plus-bold.svg';
import CustomTabBar from './src/components/CustomTabBar';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const EmptyScreen = () => null;

// Remove these lines
// const isOpen = useSharedValue(false);
// const toggleSheet = () => { isOpen.value = !isOpen.value; };

// In the MainTabs component, add this:
const MainTabs = () => {
  // Use the context instead of local state
  const { toggleSheet } = useContext(BottomSheetContext);
  
  return (
    <>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            backgroundColor: 'transparent',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            // No zIndex here
          },
          tabBarIconStyle: {
            paddingTop: 0,
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <HomeIcon width={24} height={24} fill={focused ? '#5A8DC6' : '#8D8F9B'} />
            ),
          }}
        />
        <Tab.Screen
          name="AdvisorTab"
          component={AdvisorScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <ConseillerIcon width={24} height={24} fill={focused ? '#5A8DC6' : '#8D8F9B'} />
            ),
          }}
        />

        <Tab.Screen
          name="AddTab"
          component={EmptyScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              console.log('AddTab clicked');
              toggleSheet(); // This uses the context function
            },
          }}
          options={{
            tabBarIcon: () => (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#5A8DC6',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -40,
                  marginBottom: 10
                }}
              >
                <Plus width={24} height={24} fill="white" />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="ContractsTab"
          component={ContractsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <ListIcon width={24} height={24} fill={focused ? '#5A8DC6' : '#8D8F9B'} />
            ),
          }}
        />
        <Tab.Screen
          name="MenuTab"
          component={MenuScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MoreIcon width={24} height={24} fill={focused ? '#5A8DC6' : '#8D8F9B'} />
            ),
          }}
        />
      </Tab.Navigator>
      {/* Remove the BottomSheet component here */}
      {/* <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}> */}
      {/*   <View style={{ flex: 1, padding: 20 }}> */}
      {/*     <Text style={{ fontSize: 18 }}>Hello from Bottom Sheet!</Text> */}
      {/*   </View> */}
      {/* </BottomSheet> */}
    </>
  );
};

import { BottomSheetProvider } from './src/context/BottomSheetContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Main" component={MainTabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
import { BottomSheetContext } from './src/context/BottomSheetContext';
