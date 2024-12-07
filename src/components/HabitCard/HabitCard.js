import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from "./HabitCard.style";
import { default as axios } from 'axios';

export default function HabitCard() {
    const [data, setData] = useState([]);
    const renderedItems = [];

    useEffect(() => {
        axios.get('http://10.0.2.2:3000/habit')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.error('Response Error:', error.response.data);
                    console.error('Status Code:', error.response.status);
                } else {
                    console.error('Error:', error.message);
                }
            });
    }, []);

    for (let i = 0; i < data.length; i++) {
        renderedItems.push(
            <View style={styles.container} key={i}>
                <View style={ styles.innerCont}>
                    <Text style={styles.title}>
                        {data[i].habitTitle}
                    </Text>
                    <Text style={styles.desc}>
                        {data[i].habitDesc}
                    </Text>
                </View>
                <View style={{marginRight: 0}}>
                <Text style={styles.day}>
                        {data[i].habitDay}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View>
            {renderedItems}
        </View>
    )
}