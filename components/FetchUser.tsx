import { useState } from 'react'
import { Text } from 'react-native'

type UserInfoProps = {
    userId: string
}

export default function FetchUser({ userId }: UserInfoProps) {
    const [user, setUser] = useState('')

    async function fetchUser() {
        try {
            const userResponse = await fetch(`https://api.sleeper.app/v1/user/${userId}`)
            const userResponseData = await userResponse.json()
            setUser(userResponseData)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Text>{user}</Text>
    )
}
