
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';

export default function HomePage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchBook() {
        try {
            const res = await fetch('https://example.com/api/books');
        } catch (error) {}
    }


    return(
        <View>
            <Text>Home Page</Text>
        </View>
    )

}