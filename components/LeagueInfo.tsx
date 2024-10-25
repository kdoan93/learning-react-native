import { useState } from "react"
import { View } from "react-native"

export default function LeagueInfo(leagueId: string) {
    const [leagueUsers, setLeagueUsers] = useState<string[]>([])

    type User = {
        owner_id: string
    }

    async function fetchLeagueUsers(leagueId: string) {
        try {
            /***    Fetches all users in a league   ***/
            const leagueUsersResponse = await fetch('https://api.sleeper.app/v1/league/1125536417976860672/rosters')
            const leagueUsersData: User[] = await leagueUsersResponse.json()
            let usersInLeague = leagueUsersData.map((user) => user.owner_id)
            setLeagueUsers(usersInLeague)
            console.log("leagueUser: ", usersInLeague)

            console.log("leagueUsersData: ", leagueUsersData)

            // for (let i = 0; i < userLeagueData.length; i++) {

            // }

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <View>League Info component</View>
    )
}
