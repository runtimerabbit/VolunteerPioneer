import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Header } from '@rneui/base';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';

export default function TabTwoScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date())
  const [location, setLocation] = useState("");
  const [token, setToken] = useState("")
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL
  const router = useRouter()

  let _retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null){
          setToken(value)
        }
        else {
          router.replace("/startup")
        }
    }   catch (error) {
        router.replace("/startup")
    }
  } 

  _retrieveData()

  

  const createEvent = (async () => {
    if (title !== "" && description !== "" && date !== undefined && location !== ""){
      const event = await axios.post(`${apiUrl}/events`, {title, description, date, location}, {
        headers: {
          "x-access-token": token
        }
      })
      if (event.status == 500 || event.status == 401){
        setError("Could not create the event")
      }
      else {
        router.replace("/(tabs)/myEvents")
      }
    }
    else if (title == "" || title == undefined) {
      setError("You have not entered a title")
    }
    else if (description == "" || description == undefined) {
      setError1("You have not entered a description")
    }
    else if (date == null || date == undefined) {
      setError2("You have not entered a date")
    }
    else if (location == "" || location == undefined) {
      setError3("You have not entered a location")
    }
  }
  )
    

return (
    <>
    <Header centerComponent={{ text: 'Volunteer Pioneer', style: { color: '#fff', fontWeight: 'bold', height: 35, fontSize: 25 } }} backgroundColor='#93c47d'>
        </Header>
        <ThemedView style={styles.container}>
            <ThemedText style={styles.titleText}>Create Event</ThemedText>
            <ThemedText style={styles.text}>Title</ThemedText>
            <TextInput
                value={title}
                onChangeText={(text) => {setTitle(text)}}
                style={styles.textInput}
            ></TextInput>
            <ThemedText style={styles.text}>Description</ThemedText>
            <TextInput
            value={description}
            onChangeText={(text) => {setDescription(text)}}
            style={styles.textInput}
            ></TextInput>
            <ThemedText style={styles.text}>Date</ThemedText>
            <DateTimePicker value={date} 
            mode='datetime'
            display='spinner' 
            style={styles.datePicker}
            ></DateTimePicker>
            <ThemedText style={styles.text}>Location</ThemedText>
            <TextInput
            value={location}
            onChangeText={(text) => {setLocation(text)}}
            style={styles.textInput}
            autoComplete='street-address'
            ></TextInput>
            <View style={styles.view}>
              <Pressable style={styles.button} onPress={() => {createEvent()}}>
                <ThemedText style={styles.buttonText}>Create Event</ThemedText>
              </Pressable>
            </View>
            <View>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <ThemedText style={styles.errorText}>{error1}</ThemedText>
            <ThemedText style={styles.errorText}>{error2}</ThemedText>
            <ThemedText style={styles.errorText}>{error3}</ThemedText>
            </View>
        </ThemedView>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  textInput: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 12,
        color: "#FFFFFF",
        borderColor: "#FFFFFF",
        width: 300,
        alignSelf: "center"
  },
  titleText: {
    alignSelf: "center",
    marginVertical: 45,
    fontSize: 26,
    fontWeight: "bold"
  },
  text: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    alignSelf: "center"
  },
  datePicker: {
    alignItems: "center",
    width: 250,
    height: 100,
  },
  button: {
    justifyContent: 'center',
    marginTop: 0,
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
  view: {
    alignItems: "center",
    
  },
  errorText: {
    color: "#F96859"
  }
});
