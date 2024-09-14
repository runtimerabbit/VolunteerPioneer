import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useState } from "react"
import { Pressable, StyleSheet, TextInput, Text, View } from "react-native"
import axios from "axios"
import { router } from "expo-router"
import DropDownPicker from 'react-native-dropdown-picker';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [accountType, setAccountType] = useState("");
    const [error, setError] = useState("");
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [error3, setError3] = useState("");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'Volunteerer', value: 'volunteerer'},
        {label: 'Volunteer Owner', value: 'volunteerOwner'}
    ]);


    async function processSignup(){
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        if (!email){
            setError("You haven't entered an email")
        }
        if (!password){
            setError1("You haven't entered a password")
        }
        if (!username) {
            setError2("You haven't entered a username")
        }
        if (!accountType) {
            setError3("You haven't entered your account type")
        }
        const auth = await axios.post(`${apiUrl}/auth/signup`, {email, username, accountType, password})
        if (auth.status === 500){
            setError("Not able to login")
            return
        }
        router.navigate("/startup/login")
    }
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.titleText}>Signup</ThemedText>
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
            <ThemedText style={styles.text}>Username</ThemedText>
            <TextInput
            value={username}
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            inputMode={"text"}
            autoCapitalize="none"
            ></TextInput>
            <ThemedText style={styles.text}>Account Type</ThemedText>
            <DropDownPicker
            open={open}
            value={accountType}
            items={items}
            setOpen={setOpen}
            setValue={setAccountType}
            setItems={setItems}
            textStyle={styles.text}
            placeholderStyle={styles.text}
            // style={styles.dropdown}
            ></DropDownPicker>
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
            <ThemedText style={styles.errorText}>{error2}</ThemedText>
            <View style={styles.view}>
                <Pressable style={styles.button} onPress={() => processSignup()}>
                    <Text style={styles.buttonText}>Register</Text>
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
    },
    dropdown: {
        width: 300,
        height: 50,
        alignContent: "center",
        justifyContent: "center"
    }
})
