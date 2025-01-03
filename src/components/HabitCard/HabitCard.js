import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from "./HabitCard.style";
import { default as axios } from 'axios';
import colors from '../../colors';

export default function HabitCard() {
    const [data, setData] = useState([]);
    const [progress, setProgress] = useState({}); // Her alışkanlık için ayrı ilerleme durumu

    // Veriyi çekme ve progress değerini başlatma
    useEffect(() => {
        axios.get('http://10.0.2.2:3000/habit')
            .then(response => {
                const reversedData = response.data.reverse();
                setData(reversedData);
                const initialProgress = {};
                response.data.forEach(item => {
                    initialProgress[item._id] = 0; // Başlangıçta her alışkanlık için 0 ilerleme
                });
                setProgress(initialProgress);
            })
            .catch(error => {
                if (error.response) {
                    console.error('Response Error:', error.response.data);
                } else {
                    console.error('Error:', error.message);
                }
            });
    }, []);

    // Buton tıklama fonksiyonu
    const handleButtonPress = (habit_id) => {
        console.log(habit_id)
        setProgress((prevProgress) => {
            const updatedProgress = { ...prevProgress };
            const habit = data.find(item => item._id === habit_id);
            const maxProgress = habit.habitDay;
            if (updatedProgress[habit_id] < maxProgress) {
                updatedProgress[habit_id] += 1; // İlerleme 1 artırılır
            }
            return updatedProgress;
        });
    };

    return (
        <View>
            {data.map((item) => {
                const dayCount = item.habitDay;
                const currentProgress = progress[item._id] || 0; // Her alışkanlık için ayrı ilerleme durumu

                return (
                    <View style={styles.container} key={item._id}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.innerCont}>
                                <Text style={styles.title}>{item.habitTitle}</Text>
                                <Text style={styles.desc}>{item.habitDesc}</Text>
                            </View>
                            <View>
                                <Text style={styles.day}>{currentProgress}/{dayCount}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }}>
                            {Array.from({ length: dayCount }, (_, j) => (
                                <View
                                    key={`square-${item._id}-${j}`} // Her kareye benzersiz key eklendi
                                    style={[
                                        styles.squares,
                                        { backgroundColor: j < currentProgress ? colors.purple : colors.white }
                                    ]}
                                />
                            ))}
                        </View>
                        <TouchableOpacity onPress={() => handleButtonPress(item._id)}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Bugünü Tamamla!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}


 /* for (let i = 0; i < data.length; i++) {
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
                <Text style={styles.title}>
                            Progress: {currentProgress}/{dayCount}
                        </Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { w_idth: `${(currentProgress / dayCount) * 100}%` }]} />
                        </View>
                        <TouchableOpacity onPress={() => increaseProgress(item._id, dayCount)}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Bugünü Tamamla!
                                </Text>
                            </View>
                        </TouchableOpacity>
            </View>
        );
    } */
