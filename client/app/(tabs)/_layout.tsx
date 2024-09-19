import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [roleAvailble, setRoleAvailable] = useState<any>("");
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  let _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      let { data } = await axios.get(`${apiUrl}/users/`, {
        headers: {
          "x-access-token": value
        }
      });
      if (data.data.role === "Volunteer Owner") {
        setRoleAvailable("myEvents")
      }
      else {
        setRoleAvailable(null)
      }
      setDataRetrieved(true);

    } catch (error) {

    }
  }
  useEffect(() => {
    (async () => {
      await _retrieveData();
    })();
  }, [dataRetrieved === false])

  return (
    <GestureHandlerRootView>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'search-sharp' : 'search-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} size={32} color={color}></MaterialCommunityIcons>
            ),
          }}
        />
        <Tabs.Screen
          name="createEvent"
          options={{
            href: null
          }}
        >
        </Tabs.Screen>
        <Tabs.Screen
          name='myEvents'
          options={{
            title: "My Events",
            href: roleAvailble,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'create' : 'create-outline'} size={32} color={color}></Ionicons>
            )
          }}
        >
        </Tabs.Screen>
      </Tabs>
    </GestureHandlerRootView>
  );
}
