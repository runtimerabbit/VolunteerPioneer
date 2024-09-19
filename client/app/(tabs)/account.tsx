import { StyleSheet, Image, View, Platform, useColorScheme, Dimensions, Pressable, Text } from 'react-native';
import { Header } from '@rneui/base';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { useFonts, MPLUSRounded1c_800ExtraBold } from "@expo-google-fonts/m-plus-rounded-1c"
import * as SplashScreen from "expo-splash-screen"
import { FontAwesome5 } from '@expo/vector-icons/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function TabTwoScreen() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [user, setUser] = useState<{ username: string, profilePicture: string, role: string } | null>(null)
  const apiUrl = process.env.EXPO_PUBLIC_API_URL
  let _retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null){
          let {data} = await axios.get(`${apiUrl}/users/`, {
            headers: {
                "x-access-token": value
            }
          });
          
          setUser(data.data)
        }
        else {
          router.replace("/startup")
        }
    }   catch (error) {
        router.replace("/startup")
    }
  }
  _retrieveData()

  const logout = async () => {
    const auth = await axios.post(`${apiUrl}/auth/logout`)
  }

  SplashScreen.preventAutoHideAsync()
  const isDarkTheme = useColorScheme() === "dark"
  const [loaded, error] = useFonts({
    MPLUSRounded1c_800ExtraBold
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <>
      <Header centerComponent={{ text: 'Volunteer Pioneer', style: { color: '#fff', fontWeight: 'bold', height: 35, fontSize: 25 } }} backgroundColor='#93c47d'>
      </Header>
      <ThemedView style={styles.container}>
        <Image source={{
          uri: user?.profilePicture ?? 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'
        }}
          style={styles.profilePicture}
        ></Image>
        <View style={styles.row}>
          <ThemedText style={styles.nameText}>{user?.username ?? "John Smith"}</ThemedText>
        </View>
        <View style={styles.row1}>
          <ThemedText style={styles.accountTypeText}>{user?.role ?? "No Account Type"}</ThemedText>
        </View>
        <View style={styles.view}>
          <Pressable style={styles.button} onPress={() => logout()}>
            <Text style={styles.buttonText}>Log Out</Text>
          </Pressable>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    justifyContent: 'flex-start',
    paddingVertical: 25,
    alignItems: 'center',
    flex: 1
  },
  profilePicture: {
    width: 125,
    height: 125,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 6,
    borderColor: "#93c47d",
    marginBottom: 20
  },
  nameText: {
    fontSize: 22,
    fontFamily: "MPLUSRounded1c_800ExtraBold",
  },
  accountTypeText: {
    fontFamily: "MPLUSRounded1c_800ExtraBold",
    fontSize: 18
  },
  editButton: {
    justifyContent: "center",
    alignSelf: "center"
  },
  row: {
    flexDirection: "row",
    width: "100%",
    padding: 2,
    justifyContent: "space-around",
    paddingHorizontal: windowWidth / 3.4,
  },
  row1: {
    flexDirection: "row",
    width: "100%",
    padding: 2,
    justifyContent: "space-around",
    paddingHorizontal: windowWidth / 4
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
    marginTop: 220
  }
});
