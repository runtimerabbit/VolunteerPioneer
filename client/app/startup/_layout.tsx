import { Stack } from "expo-router";

export default function Layout(){
    return (
        <Stack initialRouteName="home">
            <Stack.Screen name="index" options={{
                title: "Home",
                headerShown: false
            }}></Stack.Screen>  
            <Stack.Screen name="login" options={{
                headerShown: true,
                title: "Login"
            }}></Stack.Screen>
            <Stack.Screen name="signup" options={{
                headerShown: true,
                title: "Signup"
            }}>
            </Stack.Screen>
        </Stack>
    )
}