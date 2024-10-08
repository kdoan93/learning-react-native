import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Keyboard } from "react-native";

const UserInput = () => {
    const [user, setUser] = useState('')
    const [userId, setUserId] = useState('')
    const [userInput, setUserInput] = useState('')

    async function fetchUser(user: string) {
        try {
            const response = await fetch(`https://api.sleeper.app/v1/user/${user}`)
            const data = await response.json()
            setUser(data.display_name)
            setUserId(data.user_id)

            console.log(data)

        } catch (error) {
            console.error("Error fetching user data: ", error)
        }
    }

    const handleSubmit = () => {
        fetchUser(userInput)
        Keyboard.dismiss()
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your username here"
                value={userInput}
                onChangeText={newUser => setUserInput(newUser)}
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
            />
            <Text style={styles.text}>
                User: {user} {"\n"}
                User ID: {userId}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'left'
    }
})

export default UserInput;
