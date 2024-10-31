import { useState } from "react"
import { View, Text } from "react-native"

type LeagueInfoProps = {
    leagueId: string;
}

export default function LeagueInfo({ leagueId }: LeagueInfoProps) {
    const [leagueUsers, setLeagueUsers] = useState<string[]>([])

    type User = {
        owner_id: string
    }

    async function fetchLeagueUsers() {
        try {
            /***    Fetches all users in a league   ***/
            const leagueUsersResponse = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`)
            const leagueUsersData: User[] = await leagueUsersResponse.json()
            let usersInLeague = leagueUsersData.map((user) => user.owner_id)
            setLeagueUsers(usersInLeague)
            // console.log("leagueUser: ", usersInLeague)

            console.log("leagueUsers: ", leagueUsers)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Text>League Info component</Text>
            {leagueUsers.map(user => (
                <li>
                    <Text>{user}</Text>
                </li>
            ))}
        </div>
    )
}
