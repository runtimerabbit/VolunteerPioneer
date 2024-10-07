import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios";

const Index = () => {
    const router = useRouter()
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    let _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('key');
            let {data} = await axios.get(`${apiUrl}/users/`, {
                headers: {
                    "x-access-token": value
                }
            });
            console.info(data);
            
            if (value !== null) {
                router.replace("/(tabs)/")
            }
            else {
                console.warn("token invalid")
                router.replace("/startup")
            }
        } catch (error) {
            console.warn(error, "Error in the request")
            router.replace("/startup")
        }
    }
    
    _retrieveData()

}

export default Index