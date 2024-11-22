import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

type UserInfoProps = {
    userId: string;
};

type User = {
    username: string;
};

export default function FetchUserData({ userId }: UserInfoProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const userResponse = await fetch(`https://api.sleeper.app/v1/user/${userId}`);
                const userResponseData: User = await userResponse.json();
                console.log("FetchUser: ", userResponseData);
                setUser(userResponseData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, [userId]);

    return (
        <View>
            {user ? <Text>{user.username}</Text> : <Text>Loading...</Text>}
        </View>
    );
}
