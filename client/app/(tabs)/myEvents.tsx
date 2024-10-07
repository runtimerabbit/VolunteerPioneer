import { useState, useEffect } from 'react';
import { StyleSheet, Pressable, FlatList, View } from 'react-native';
import { Header } from '@rneui/base';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import axios from "axios";
import { Event } from "./components/Event"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, } from 'expo-router';

export default function TabTwoScreen() {
    const [data, setData] = useState<[] | null>(null)
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const router = useRouter()
    const [isFetching, setIsFetching] = useState(false)
    function onRefresh(){
        setIsFetching(true), () => {getData()}
        setIsFetching(false)
      }

    const getData = (async () => {
        const token = await AsyncStorage.getItem('key');
        const eventData = await axios.get(`${apiUrl}/events/events/`, {
            headers: {
                "x-access-token": token
            }
        })
        console.info(eventData.data.data)
        
        setData(eventData.data.data)
    })
    
    getData()

    return (
       <>
            <Header centerComponent={{ text: 'Volunteer Pioneer', style: { color: '#fff', fontWeight: 'bold', height: 35, fontSize: 25 } }} backgroundColor='#93c47d'>
            </Header>
            <ThemedView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={
                        ({ item }: { item: Record<string, string> }) => <Event
                            id={item?.id}
                            title={item?.title}
                            description={item?.description}
                            date={item?.date}
                            location={item?.location}
                            optedIn={"false"}
                            pressable={"false"}
                        />
                    }
                    refreshing={isFetching}
                    onRefresh={() => {onRefresh()}}
                    keyExtractor={item => item.id}
                />
                <View style={styles.view}>
                    <Pressable style={styles.button} onPress={() => {router.replace("/(tabs)/createEvent")}}>
                        <ThemedText style={styles.buttonText}>Create Event</ThemedText>
                    </Pressable>
                </View>
            </ThemedView>
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
    view: {
        alignItems: "center",
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
});
