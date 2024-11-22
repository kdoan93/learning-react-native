import { useState } from "react"
import { View, Text, Button, StyleSheet, Image, ScrollView } from "react-native"
import FetchUserData from "./FetchUser";

type LeagueInfoProps = {
    leagueId: string;
}

export default function LeagueInfo({ leagueId }: LeagueInfoProps) {
    const [leagueUsers, setLeagueUsers] = useState<User[]>([])
    const [avatar, setAvatar] = useState('')

    type User = {
        owner_id: string,
        name: string,
        userInfo: {
            display_name: string,
            avatar: string,
        }
        avatar: string,
        roster_id: number
    }

    /***    Function to retrieve all league users   ***/
    async function fetchLeagueUsers() {
        try {
            /***    Fetches all users in a league   ***/
            const leagueUsersResponse = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`)
            const leagueUsersData: User[] = await leagueUsersResponse.json()

            /***    Fetch user info and add to user object  ***/
            const addUsernametoUsers = await Promise.all(
                leagueUsersData.map(async (user) => {
                    // console.log("USER: ", user)
                    let ownerName = await fetchUser(user.owner_id)
                    user.userInfo = ownerName
                    const avatarResponse = await fetch(`https://sleepercdn.com/avatars/thumbs/${user.userInfo.avatar}`)
                    user.avatar = avatarResponse.url
                    return { ...user }
                })
            )

            setLeagueUsers(addUsernametoUsers)
            // console.log("leagueUsersData: ", leagueUsersData)

        } catch (error) {
            console.error(error)
        }
    }

    // console.log("LeagueInfo leagueUser: ", leagueUsers)

    /***    function to retrieve each user info     ***/
    async function fetchUser(userId: string) {
        try {
            const userResponse = await fetch(`https://api.sleeper.app/v1/user/${userId}`)
            const userResponseData = await userResponse.json()

            /***    Fetches user avatar     ***/
            const avatarResponse = await fetch(`https://sleepercdn.com/avatars/thumbs/${userResponseData.avatar}`)
            // console.log(avatarResponse.url)
            setAvatar(avatarResponse.url)

            return userResponseData
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Button
                onPress={fetchLeagueUsers}
                title='Show all users in this league'
            />
            {/* <ScrollView> */}
                {leagueUsers.map(user => (
                    <li key={user.roster_id} style={styles.leagueUsers}>
                        <Image
                            style={styles.image}
                            source={{ uri: user.avatar }}
                        />
                        <Text>
                            {user.userInfo.display_name}
                        </Text>
                        <FetchUserData userId={user.owner_id} />
                    </li>
                ))}
            {/* </ScrollView> */}
        </div>
    )
}

const styles = StyleSheet.create({
    leagueUsers: {
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 10,
    }
})
