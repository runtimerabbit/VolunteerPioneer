import { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { Button, Header } from '@rneui/base';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { FlatList } from 'react-native';
import { Event } from './components/Event';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width



export default function TabTwoScreen() {
  const [userInput, setUserInput] = useState("")
  const [data, setData] = useState<any[] | null>(null)
  const [searched, setSearched] = useState<any>()
  const [refreshing, setRefreshing] = useState(false)
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const router = useRouter()

  const search = async (userInput: string) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL
    const { data } = await axios.get(`${apiUrl}/events/search/event`, {
      params: {
        name: userInput
      }
    })
    setSearched(data)
  }

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


    let participants = await axios.get(`${apiUrl}/events/participants`, {
      headers: {
        "x-access-token": token
      }
    })
    let participatingEvents = participants.data.data[0];
    participatingEvents = participatingEvents.map((event: any) => event = event.id)
    let updatedEvents: any[] = parsedData;
    for(let event of updatedEvents){
      if (participatingEvents.includes(event.id)){
        event.optedIn = "true"
      }
      else {
        event.optedIn = "false"
      }
    }

    

    // setData(updatedEvents)

  // setData(participants.data.data.map((event: any) => {
  //   if e
  // }))
  
    /*
      Do a GET on participants,
      Once you have those, iterate through either list of events, check if each event is in the participant list
      If it is, update the parsedData to include a "optedIn" value that is "true" or "false"
    */

    // parsedData = parsedData.map(async (event: any) => {
    //   await axios.get("event/participants");
    //   // if this event is in ThemedTab, opted in = True
    // })

    setData(updatedEvents)
  })  
  useEffect(() => {
    getData()
  }, [data !== null])
  
  return (
    <>
      <Header centerComponent={{ text: 'Volunteer Pioneer', style: { color: '#fff', fontWeight: 'bold', height: 35, fontSize: 25 } }} backgroundColor='#93c47d'>
      </Header>
      <ThemedView style={styles.container}>
        <SearchBar
          placeholder='Food banks near me'
          onChangeText={(userInput) => { setUserInput(userInput);
            search(userInput)
           }}
          value={userInput}
          round={true}
          >
        </SearchBar>
          <FlatList
            data={data}
            renderItem={
              ({ item }: { item: Record<string, string> }) =>
                <Event
                  id={item?.id}
                  title={item?.title}
                  description={item?.description}
                  date={item?.date}
                  location={item?.location} 
                  pressable={"true"}
                  optedIn={item?.optedIn}
                  />   
            }
            keyExtractor={item => item.id}
            refreshing={refreshing}
            onRefresh={() => getData()}
            style={{height: Dimensions.get("window").height * 0.7}}
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
  },
  button: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 38,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#93c47d',
},
buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    alignItems: "center"
},
empty: {

},

});
