import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

    function buttonHandle() {

    }

    for (let i = 0; i < data.length; i++) {
        const dayCount = data[i].habitDay;
        const squares = [];
        for (let j = 0; j < dayCount; j++) {
            
            squares.push(
                <View
                    key={`square-${i}-${j}`}
                    style={styles.squares}
                />
            );
        }
        renderedItems.push(
            <View style={styles.container} key={i}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.innerCont}>
                        <Text style={styles.title}>{data[i].habitTitle}</Text>
                        <Text style={styles.desc}>{data[i].habitDesc}</Text>

                    </View>
                    <View style={{ marginRight: 0 }}>
                        <Text style={styles.day}>{data[i].habitDay}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, marginBottom: 6 }}>
                    {squares}
                </View>
                <TouchableOpacity onPress={() => buttonHandle()}>
                    <View style= {styles.button}>
                        <Text style={styles.buttonText}>
                            Bugünü Tamamla!
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View>
            {renderedItems}
        </View>
    )
}