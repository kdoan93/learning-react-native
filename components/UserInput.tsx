import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Keyboard, Image } from "react-native";

const UserInput = () => {
    const [user, setUser] = useState('')
    const [userId, setUserId] = useState('')
    const [avatar, setAvatar] = useState('')
    const [userLeague, setUserLeague] = useState<string[]>([])
    const [leagueUsers, setLeagueUsers] = useState<string[]>([])
    const [userInput, setUserInput] = useState('')

    type League = {
        name: string
    }

    type User = {
        owner_id: string
    }

    async function fetchUserData(user: string) {
        try {
            /***  Fetches user data ***/
            const userResponse = await fetch(`https://api.sleeper.app/v1/user/${user}`)
            const userData = await userResponse.json()
            setUser(userData.display_name)
            setUserId(userData.user_id)

            // console.log("userData: ", userData)


            /*** Fetches all leagues user is in ***/
            const userLeagueResponse = await fetch(`https://api.sleeper.app/v1/user/${userData.user_id}/leagues/nfl/2024`)
            const userLeagueData: League[] = await userLeagueResponse.json()

            console.log("userLeagueData: ", userLeagueData)

            let leagues = userLeagueData.map((league) => league.name)
            setUserLeague(leagues)


            /***    Fetches all users in a league   ***/
            const leagueUsersResponse = await fetch('https://api.sleeper.app/v1/league/1125536417976860672/rosters')
            const leagueUsersData: User[] = await leagueUsersResponse.json()
            let usersInLeague = leagueUsersData.map((user) => user.owner_id)
            setLeagueUsers(usersInLeague)
            console.log("leagueUser: ", usersInLeague)
            
            // for (let i = 0; i < userLeagueData.length; i++) {

            // }

            console.log("leagueUsersData: ", leagueUsersData)

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
                </View> : <></>
            }
            <Text style={styles.text}>
                User: {user} {"\n"}
                User ID: {userId} {"\n"}
                User Leagues:{"\n"}
                {userLeague.map((name, index) => (
                    <Text key={index}> {index + 1}.  {name}{"\n"} </Text>
                    // {leagueUserData}
                ))}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'red',
        // borderWidth: 1,
        // height: 'auto',
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
        justifyContent: 'center',
        alignItems: 'center',
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
