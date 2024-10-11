import UserInput from "@/components/UserInput";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {



    return (
        <View style={styles.container}>
            <Text>Sleeper fantasy data</Text>
            <Text>{
            `Input your username here to receive your
                Sleeper fantasy team data`
            }</Text>

            <UserInput/>

            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
