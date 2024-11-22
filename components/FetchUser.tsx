import { useState } from 'react'
import { Text, View } from 'react-native'

type UserInfoProps = {
    userId: string
}

export default function FetchUser({ userId }: UserInfoProps) {
    const [user, setUser] = useState<User[]>([])

    type User = {
        username: string,
    }

    async function fetchUser() {
        try {
            const userResponse = await fetch(`https://api.sleeper.app/v1/user/${userId}`)
            const userResponseData: User[] = await userResponse.json()
            console.log("FetchUser: ", userResponseData)
            setUser(userResponseData)
        } catch (error) {
            console.error(error)
        }
    }
    fetchUser()

    return (
        <View>
            <Text>{user.username}</Text>
        </View>
    )
}
