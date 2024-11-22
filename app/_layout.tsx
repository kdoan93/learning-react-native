import { ThemedView } from "@/components/ThemedView";
import UserInput from "@/components/UserInput";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
    const sleeperLogo = 'https://sleepercdn.com/landing/web2021/img/sleeper-app-logo-2.png'


    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: sleeperLogo }}
            />
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
    image: {
        width: 100,
        height: 100,
    }
})
