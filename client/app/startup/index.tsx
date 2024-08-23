import { StyleSheet, View, Pressable, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Link, useRouter } from "expo-router"
import { Dimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";


export default function StartupScreen() {
    const router = useRouter();
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.titleText}>VolunteerPioneer</ThemedText>
            <View style={styles.view}>
                <Link href={'/startup/login'} asChild> 
                    <Pressable style={styles.button}>
                        <Text style={styles.text}>Login</Text>
                    </Pressable>
                </Link>
            </View>
            <View style={styles.view}>
               <Link href={"/startup/signup"} asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.text}>Signup</Text>
                    </Pressable>
                </Link>
            </View>
        </ThemedView>
    )
}

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const styles = StyleSheet.create({
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
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    container: {
        flex: 1
    },
    view: {
        alignItems: "center",
        marginTop: 50,
        marginBottom: -50
    },
    titleText: {
        alignSelf: "center",
        marginVertical: 90,
        fontSize: 26,
        fontWeight: "bold"
    }
})