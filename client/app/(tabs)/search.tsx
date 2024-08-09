import { useState } from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { Header } from '@rneui/base';

export default function TabTwoScreen() {
  const [userInput, setUserInput] = useState("")

  return (
    <>
    <Header centerComponent={{ text: 'Volunteer Pioneer', style: { color: '#fff', fontWeight: 'bold', height: 35, fontSize: 25 } }} backgroundColor='#93c47d'>
    </Header>
    <SearchBar
    placeholder='Food banks near me'
    onChangeText={(userInput) => {setUserInput(userInput)}}
    value={userInput}
    round={true}
    >
    </SearchBar>
    </>
  )
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
});
