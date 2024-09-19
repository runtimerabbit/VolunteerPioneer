import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { Header } from '@rneui/base';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Animated } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Event } from './components/Event';
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { RectButton } from 'react-native-gesture-handler';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
  
} from 'react-native-reanimated';
import { interpolate, Extrapolation } from 'react-native-reanimated';

const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width

const LeftAction = ({ dragX, swipeableRef, isOpen }: any) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          dragX.value,
          [0, 50, 100, 101],
          [-20, 0, 0, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }))
  return (
    <RectButton
      style={{
        // flex: 1;
        // backgroundColor: '#228B22',
        backgroundColor: isOpen ? '#228B22' : 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 2.5
        
        }}
      onPress={() => swipeableRef.current!.close()}>
      <Animated.Text>
        Opt In
      </Animated.Text>
    </RectButton>
  );
};

const renderLeftActions = (
  _progress: any,
  translation: SharedValue<number>,
  swipeableRef: React.RefObject<SwipeableMethods>,
  isOpen: boolean
) => <LeftAction dragX={translation} swipeableRef={swipeableRef} isOpen={isOpen} />;

function AppleStyleSwipeableRow({ children }: any) {
  const swipeableRow = useRef<SwipeableMethods>(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Swipeable
      ref={swipeableRow}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      onSwipeableOpen={() => setIsOpen(true)}
      onSwipeableClose={() => setIsOpen(false)}
      renderLeftActions={(_, progress) =>
        renderLeftActions(_, progress, swipeableRow, isOpen)
      }>
        {children}
      </Swipeable>
  )
}

export default function TabTwoScreen() {
  const [userInput, setUserInput] = useState("")
  const [data, setData] = useState<[] | null>(null)
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(false)

  function onRefresh() {
    setIsFetching(true), () => { getData() }
    setIsFetching(false)
  }

  const getData = (async () => {
    const token = await AsyncStorage.getItem('key');
    const eventData = await axios.get(`${apiUrl}/events/`, {
      headers: {
        "x-access-token": token
      }
    })
    setData(eventData.data.data)
  })

  getData()

  return (
    <>
      <Header centerComponent={{ text: 'Volunteer Pioneer', style: { color: '#fff', fontWeight: 'bold', height: 35, fontSize: 25 } }} backgroundColor='#93c47d'>
      </Header>
      <ThemedView style={styles.container}>
        <SearchBar
          placeholder='Food banks near me'
          onChangeText={(userInput) => { setUserInput(userInput) }}
          value={userInput}
          round={true}
        >
        </SearchBar>
        <FlatList
          data={data}
          renderItem={
            ({ item }: { item: Record<string, string> }) => 
            <AppleStyleSwipeableRow>
              <Event
              id={item?.id}
              title={item?.title}
              description={item?.description}
              date={item?.date}
              location={item?.location} />
            </AppleStyleSwipeableRow>
          }
          keyExtractor={item => item.id}
        />
      </ThemedView>
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
  container: {
    flex: 1
  }
});
