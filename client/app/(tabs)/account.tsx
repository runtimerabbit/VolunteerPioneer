import { StyleSheet, Image, View, Platform, useColorScheme, Dimensions, Pressable } from 'react-native';
import { Header } from '@rneui/base';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { useFonts, MPLUSRounded1c_800ExtraBold } from "@expo-google-fonts/m-plus-rounded-1c"
import * as SplashScreen from "expo-splash-screen"
import { FontAwesome5 } from '@expo/vector-icons/';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function TabTwoScreen() {
  SplashScreen.preventAutoHideAsync()
  const isDarkTheme = useColorScheme() === "dark"
  const [user, setUser] = useState<{ username: string, profilePicture: string, role: string } | null>(null)
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
          <Pressable style={styles.editButton} onPress={() => console.info("You pressed edit name")}>
            <FontAwesome5 name="edit" color={isDarkTheme ? "#FFFFFF" : "#000000"} style={{}} size={14}></FontAwesome5>
          </Pressable>
        </View>
        <View style={styles.row1}>
          <ThemedText style={styles.accountTypeText}>Account Type: {user?.role ?? "None"}</ThemedText>
          <Pressable style={styles.editButton} onPress={() => console.info("You pressed edit account type")}>
            <FontAwesome5 name="edit" color={isDarkTheme ? "#FFFFFF" : "#000000"} style={{}} size={14}></FontAwesome5>
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
    // top: -205,
    borderColor: "#93c47d",
    marginBottom: 20
  },
  nameText: {
    // top: -190,
    fontSize: 22,
    fontFamily: "MPLUSRounded1c_800ExtraBold",
    // right: 4
  },
  accountTypeText: {
    fontFamily: "MPLUSRounded1c_800ExtraBold",
    // top: -220,
    // right: 4
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
  }
});
