import { StyleSheet, Image, View, Platform } from 'react-native';
import { Header } from '@rneui/base';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useState } from 'react';


export default function TabTwoScreen() {
  const [user, setUser] = useState<{username: string, profilePicture: string} | null>(null)
  return (
    <View style={styles.container}>
    <Header centerComponent={{ text: 'Volunteer Pioneer', style: { color: '#fff', fontWeight: 'bold', height: 35, fontSize: 25 } }} backgroundColor='#93c47d'>
    </Header>
    <Image source={{
    uri: user?.profilePicture ?? 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'
  }} 
  style={styles.profilePicture}
  ></Image>
  <ThemedText style={styles.nameText}>{user?.username ?? "Your name here"}</ThemedText>
    </View>
  );
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 125,
    height: 125,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    top: 30
  },
  nameText: {
    top: 40,
    fontWeight: "bold",
    fontFamily: Platform.select({
      android: 'MPLUSRounded1c_700Bold',
      ios: 'MPLUSRounded1c-Bold',
    }),
  }
});
