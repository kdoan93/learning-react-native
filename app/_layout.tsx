import { ThemedView } from "@/components/ThemedView";
import UserInput from "@/components/UserInput";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {



    return (
        <View style={styles.container}>
            <Text>Your Sleeper fantasy data</Text>

            <UserInput/>

            <StatusBar style="auto" />
            <ThemedView />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
})
