import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Faux écran vide pour AddTab
const EmptyScreen = () => null;

const MainTabs = () => {
  const bottomSheetModalRef = useRef(null);

  const openBottomSheet = () => {
    
    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            backgroundColor: 'transparent',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
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
              e.preventDefault(); // Empêche la navigation
              openBottomSheet(); // Ouvre la bottom sheet
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
                  marginBottom: 10,
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

      {/* Bottom Sheet */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['50%']}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 18 }}>Hello from Bottom Sheet!</Text>
          {/* Tu peux ajouter ici n'importe quel contenu */}
        </View>
      </BottomSheetModal>
    </>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          Futura: require('./assets/fonts/Futura.ttf'),
          Inter: require('./assets/fonts/Inter-Regular.ttf'),
          'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
          'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheetModalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheetModalProvider>
  </GestureHandlerRootView>

  );
}
