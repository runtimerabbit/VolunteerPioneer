import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { styled } from 'nativewind';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@rneui/themed';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen() {
  return (
    <>
    <Header centerComponent={{ text: 'Volunteer Pioneer', style: { color: '#fff', fontWeight: 'bold', height: 30 } }} backgroundColor='#93c47d'>
    </Header>
    <StyledView className='flex justify-center'>
      <StyledText className=''></StyledText>
    </StyledView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
