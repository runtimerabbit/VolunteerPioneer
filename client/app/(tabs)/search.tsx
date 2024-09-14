import { useState,  useEffect } from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { Header } from '@rneui/base';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Event } from './components/Event';

export default function TabTwoScreen() {
  const [userInput, setUserInput] = useState("")
  const [data, setData] = useState<[] | null>(null)
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('key');
            const eventData = await axios.get(`${apiUrl}/events`, {
                headers: {
                    "x-access-token": token
                }
            })
            setData(eventData.data.data)
        })();
    }, [data !== null])


  return (
    <>
    <Header centerComponent={{ text: 'Volunteer Pioneer', style: { color: '#fff', fontWeight: 'bold', height: 35, fontSize: 25 } }} backgroundColor='#93c47d'>
    </Header>
    <ThemedView style={styles.container}>
      <SearchBar
      placeholder='Food banks near me'
      onChangeText={(userInput) => {setUserInput(userInput)}}
      value={userInput}
      round={true}
      >
      </SearchBar>
      <FlatList
        data={data}
        renderItem={
        ({ item }: { item: Record<string, string> }) => <Event
        id={item?.id}
        title={item?.title}
        description={item?.description}
        date={item?.date}
        location={item?.location}/>
                    }
                    keyExtractor={item => item.id}
                />
    </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1
  }
});
