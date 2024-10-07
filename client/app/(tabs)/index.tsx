import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { styled } from 'nativewind';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import * as Location from 'expo-location'
import { getNavigationConfig } from 'expo-router/build/getLinkingConfig';

const StyledView = styled(View);
const StyledText = styled(Text);

let hardcodedTextColor = "text-[#f00000]";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [data, setData] = useState<any>(null);

  const getData = (async () => {
    const token = await AsyncStorage.getItem('key');
    const apiUrl = process.env.EXPO_PUBLIC_API_URL
    
    const { data: { data: userData }} = await axios.get(`${apiUrl}/users/`, {
      headers: {
        "x-access-token": token
      }});

    const eventData = await axios.get(`${apiUrl}/events/`, {
      headers: {
        "x-access-token": token
      }
    })
    let parsedData = eventData.data.data;
    let user_id = userData.id;
    parsedData = parsedData.filter((event: any) => event.creator !== user_id)

    setData(parsedData)
  })  

  getData()

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
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
      <MapView region={{
        latitude: location?.coords.latitude as number,
        longitude: location?.coords.longitude as number,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }} 
      // followsUserLocation={true}
      showsUserLocation={true}
      style={styles.map}>
        {/* 
          Markers goes here:
            Map through your locations, create a <Marker> for each location. 
            Marker takes in a key, coordinate, and pincolor. Coordinate should come from the location (somehow idk man)
            Mapping through locations can look like:
              Get all of your events, for example, let's say all the events are stored in a "events" state.
              events.map((event) => (
                <Marker
                  key = {event.id}
                  coordinate = {event.location (figure out how to parse in a coordinate value from the location)}
                  pinColor={whatever color}
                  />
                ))
              )
         */}
        {data?.map((event: any, index: number) => (
          <Marker
          coordinate={{
            latitude: event.lat,
            longitude: event.long
          }}
          key={index}
          title={event.title}
          description={event.description}
          >
          </Marker>
        ))}
      </MapView>
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
