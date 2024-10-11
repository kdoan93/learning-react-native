import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Keyboard } from "react-native";

const UserInput = () => {
    const [user, setUser] = useState('')
    const [userId, setUserId] = useState('')
    const [userLeague, setUserLeague] = useState([])
    const [userInput, setUserInput] = useState('')

    type League = {
        name: string
    }

    async function fetchUserData(user: string) {
        try {
            /***  Fetches user data ***/
            const userResponse = await fetch(`https://api.sleeper.app/v1/user/${user}`)
            const userData = await userResponse.json()
            setUser(userData.display_name)
            setUserId(userData.user_id)

            /*** Fetches all leagues user is in ***/
            const userLeagueResponse = await fetch(`https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2024`)
            const userLeagueData = await userLeagueResponse.json()
            console.log('User League userLeagueData: ', userLeagueData[0].name)
            userLeagueData.map((league: string) => userLeague.push(league.name))
            console.log("userLeague: ", userLeague)

        } catch (error) {
            console.error("Error fetching user data: ", error)
        }
    }

    const handleSubmit = () => {
        fetchUserData(userInput)
        // fetchUserLeagues(userId)
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
                User ID: {userId} {"\n"}
                User Leagues:
                {userLeague.map(name =>
                    <Text>
                        {name}
                    </Text>
                )}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: 1,
        width: '90%',
        flex: 1,
        justifyContent: 'center',
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
