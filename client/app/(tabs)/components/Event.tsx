import { Pressable, StyleSheet } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"

const Event = ({id, title, description, date, location}: Record<string, string>) => {
    return (   
        <Pressable style={styles.eventDisplayer} onPress={() => {
            console.info(id)
        }}>
            <ThemedText style={styles.text}>{title}</ThemedText>
            <ThemedText style={styles.text}>{description}</ThemedText>
            <ThemedText style={styles.text}>{date}</ThemedText>
            <ThemedText style={styles.text}>{location}</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    eventDisplayer: {
      width: 370,
      height: 100,
      backgroundColor: "#36393D",
      borderRadius: 25,
      alignContent: "space-around",
      marginTop: 20
    },
    text: {
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      alignSelf: "center"
    }
  });

export {Event}