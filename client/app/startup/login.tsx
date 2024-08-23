import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useState } from "react"
import { Pressable, StyleSheet, TextInput, Text } from "react-native"
import axios from "axios"
import { router } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    async function processLogin(){
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        if (!email){
            setError("You haven't entered an email")
            return
        }
        if (!password) {
            setError("You haven't entered an password")
            return
        }
        const auth = await axios.post(`${apiUrl}/auth/login`, {email, password})
        if (auth.status === 500){
            setError("Not able to login")
            return
        }
        const _storeData = async () => {
            try {
                await AsyncStorage.setItem(
                    'key', auth.data.data
                )
            } catch(e) {
                setError("Unable to store data")
            }
        }
        router.navigate("/(tabs)/")
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.titleText}>Login</ThemedText>
            <ThemedText style={styles.text}>Email</ThemedText>
            <TextInput 
            value={email}
            style={styles.input} 
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
            keyboardType="email-address"
            inputMode={"email"}
            autoCapitalize="none"
            autoComplete={"email"}
            >
            </TextInput>
            <ThemedText style={styles.text}>Password</ThemedText>
            <TextInput 
            value={password}
            style={styles.input} 
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            secureTextEntry={true}
            inputMode={"text"}
            autoCapitalize="none"
            >
            </TextInput>
            <ThemedText>{error}</ThemedText>
            <Pressable>
                <Text></Text>
            </Pressable>
        </ThemedView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleText: {
        alignSelf: "center",
        marginVertical: 45,
        fontSize: 26,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "#FFFFFF",
        borderColor: "#FFFFFF"
      },
    text: {
        paddingHorizontal: 10,
        fontWeight: "bold"
    }
})