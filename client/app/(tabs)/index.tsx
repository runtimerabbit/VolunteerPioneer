import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { styled } from 'nativewind';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@rneui/themed';

import * as Location from 'expo-location'

const StyledView = styled(View);
const StyledText = styled(Text);

let hardcodedTextColor = "text-[#f00000]";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
 
      let location = await Location.getCurrentPositionAsync({});
      // @ts-ignore
      setLocation(location);
    })();
  }, [location !== null]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <>
    <Header centerComponent={{ text: 'Volunteer Pioneer', style: { color: '#fff', fontWeight: 'bold', height: 35, fontSize: 25 } }} backgroundColor='#93c47d'>
    </Header>
    <StyledView style={styles.container} className='flex justify-center'>
      <MapView initialRegion={{
        latitude: location?.coords.latitude as number,
        longitude: location?.coords.longitude as number,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }} 
      // followsUserLocation={true}
      showsUserLocation={true}
      style={styles.map}></MapView>
    </StyledView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
});
