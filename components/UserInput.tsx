import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Keyboard, Image } from "react-native";
import LeagueInfo from "./LeagueInfo";

const UserInput = () => {
    const [user, setUser] = useState('')
    const [userId, setUserId] = useState('')
    const [avatar, setAvatar] = useState('')
    const [userLeague, setUserLeague] = useState<League[]>([])
    const [leagueUsers, setLeagueUsers] = useState<string[]>([]) // may not need
    const [userInput, setUserInput] = useState('')

    const noAvatarImg = 'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.webp'

    type League = {
        name: string,
        index: number,
        league_id: string
    }

    async function fetchUserData(user: string) {
        try {
            /***  Fetches user data ***/
            const userResponse = await fetch(`https://api.sleeper.app/v1/user/${user}`)
            const userData = await userResponse.json()
            setUser(userData.display_name)
            setUserId(userData.user_id)

            /*** Fetches all leagues user is in ***/
            const userLeagueResponse = await fetch(`https://api.sleeper.app/v1/user/${userData.user_id}/leagues/nfl/2024`)
            const userLeagueData: League[] = await userLeagueResponse.json()


            // let leagues = userLeagueData.map((league) => league.name)
            setUserLeague(userLeagueData)
            // console.log("userLeague: ", userLeague)

            /***    Fetch user Avatar   ***/
            const avatarResponse = await fetch(`https://sleepercdn.com/avatars/thumbs/${userData.avatar}`)
            setAvatar(avatarResponse.url)

        } catch (error) {
            console.error("Error fetching user data: ", error)
        }
    }

    const handleSubmit = () => {
        fetchUserData(userInput)
        Keyboard.dismiss()
    }

    // console.log("UserInput userLeague: ", userLeague)

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
            { avatar ?
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: avatar }}
                    />
                        <Text>
                            User: {user} {"\n"}
                            User ID: {userId} {"\n"}
                        </Text>
                </View> : <View>
                    <Image
                        style={styles.image}
                        source={{ uri: noAvatarImg }}
                    />
                    User: {user} {"\n"}
                    User ID: {userId} {"\n"}
                </View>
            }
            <Text style={styles.text}>
                {user}'s Leagues:{"\n"}
                {userLeague.map((league) => (
                    <ul key={league.league_id}>
                        <Text key={league.index}> {league.name}{"\n"} </Text>
                        <LeagueInfo leagueId={league.league_id} />
                    </ul>
                ))}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 40,
        alignSelf: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    imageContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        alignContent: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 18,
        textAlign: 'left'
    }
})

export default UserInput;
