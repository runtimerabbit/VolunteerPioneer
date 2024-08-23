import { Stack } from "expo-router";

export default function Layout(){
    return (
        <Stack initialRouteName="home">
            <Stack.Screen name="index" options={{
                title: "Home",
                headerShown: false
            }}></Stack.Screen>
        </Stack>
    )
}