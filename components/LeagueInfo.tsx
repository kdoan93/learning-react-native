import { useState } from "react"
import { View, Text, Button } from "react-native"

type LeagueInfoProps = {
    leagueId: string;
}

export default function LeagueInfo({ leagueId }: LeagueInfoProps) {
    const [leagueUsers, setLeagueUsers] = useState<User[]>([])

    type User = {
        owner_id: string,
        name: string,
        userInfo: {
            display_name: string
        }
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
                    let ownerName = await fetchUser(user.owner_id)
                    user.userInfo = ownerName
                    return { ...user }
                })
            )

            setLeagueUsers(addUsernametoUsers)
            console.log("leagueUsersData: ", leagueUsersData)

        } catch (error) {
            console.error(error)
        }
    }

    /***    function to retrieve each user info     ***/
    async function fetchUser(userId: string) {
        try {
            const userResponse = await fetch(`https://api.sleeper.app/v1/user/${userId}`)
            const userResponseData = await userResponse.json()

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
            {leagueUsers.map(user => (
                <li>
                    <Text>
                        {user.userInfo.display_name}
                    </Text>
                </li>
            ))}
        </div>
    )
}
