import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useState } from "react"
import { Pressable, StyleSheet, TextInput, Text, View } from "react-native"
import axios from "axios"
import { router } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [error1, setError1] = useState("");
    async function processLogin(){
        const apiUrl = process.env.EXPO_PUBLIC_API_URL
        console.info(apiUrl) 
        console.info(email, password)
        if (!email){
            setError("You haven't entered an email")
        }
        if (!password){
            setError1("You haven't entered a password")
            
        }
        const auth = await axios.post(apiUrl+'/auth/login', {email, password})
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
        await _storeData()
        router.navigate("/(tabs)/")
    }
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
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <ThemedText style={styles.errorText}>{error1}</ThemedText>
            <View style={styles.view}>
                <Pressable style={styles.button} onPress={() => processLogin()}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </ThemedView>
        )
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
    view: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: -40
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
    },
    errorText: {
        color: "#F96859"
    }
})