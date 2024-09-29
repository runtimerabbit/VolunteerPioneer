import { Pressable, StyleSheet, Text } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { useState } from "react"
import { router } from "expo-router"


const Event = ({id, title, description, date, location, optedIn, pressable}: Record<string, string>) => {

  const [optedInData, setOptedInData] = useState(optedIn === "true")
  const [error, setError] = useState("")
  const [optInVisible, setOptInVisible] = useState(false)
  const apiUrl = process.env.EXPO_PUBLIC_API_URL


  const optIn = async () => {
    const value = await AsyncStorage.getItem('key');
    const data = await axios.post(`${apiUrl}/events/optIn`, 
      {
         eventId: id
       },
      {
        headers: {
          "x-access-token": value
        }
      }
    )
  if (data.status === 401){
    router.navigate("/startup/")
  }
  else if (data.status === 500){
    setError("We regret to inform you our server is not working. We are totally working on this issue, and will be fixed in around 10 years. Cheers!")
  }
  else {
    setOptedInData(true)
  }
  }
  const optOut = async () => {
    const value = await AsyncStorage.getItem('key');
    const data = await axios.delete(`${apiUrl}/events/optOut/${id}`, 
      {
        headers: {
          "x-access-token": value
        }
      }
    )
  if (data.status === 401){
    router.navigate("/startup/")
  }
  else if (data.status === 500){
    setError("We regret to inform you our server is not working. We are totally working on this issue, and will be fixed in around 10 years. Cheers!")
  }
  else {
    setOptedInData(false)
  }
  }

  function showOptIn(optedIn: boolean) {
    if(optedIn){
      return (
        <Pressable style={styles.button} onPress={() => {optOut()}}>
          <Text style={styles.buttonText}>Opt Out</Text>
        </Pressable>
      )
    } 
    return (
      <Pressable style={styles.button} onPress={() => optIn()}>
        <Text style={styles.buttonText}>Opt In</Text>
      </Pressable>
    ) 
  }
  
    return (   
      <>
        <Pressable style={styles.eventDisplayer} onPress={() => {
          pressable === "true" ? setOptInVisible(!optInVisible) : {}
        }}>
            <ThemedText style={styles.text}>{title}</ThemedText>
            <ThemedText style={styles.text}>{description}</ThemedText>
            <ThemedText style={styles.text}>{date}</ThemedText>
            <ThemedText style={styles.text}>{location}</ThemedText>
        </Pressable>
        {
          optInVisible && showOptIn(optedInData)
        }
       {error && <Text style={styles.errorText}>{error}</Text>}
      </>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    eventDisplayer: {
      width: 370,
      height: 100,
      backgroundColor: "#36393D",
      borderRadius: 25,
      alignContent: "space-around",
      marginTop: 20
    },
    text: {
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      alignSelf: "center"
    },
    button: {
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10,
      paddingVertical: 12,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#93c47d',
      width: "45%",
      alignItems: 'center',
      flex: 1,
      alignSelf: 'center'
  },
  buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      alignItems: "center"
  },
  errorText: {
    color: "chucknorris"
  }
  });

export {Event}