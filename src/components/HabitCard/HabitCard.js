import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from "./HabitCard.style";
import { default as axios } from 'axios';
import colors from '../../colors';
import HabitEditPage from '../../pages/HabitEditPage';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HabitCard({ navigation, data }) {
   /*  const [data, setData] = useState([]); */
    const [progress, setProgress] = useState({}); // Her alışkanlık için ayrı ilerleme durumu

    // Veriyi çekme ve progress değerini başlatma

    useEffect(() => {
        // Veriyi çek ve kaydedilmiş ilerlemeyi yükle
        const fetchDataAndProgress = async () => {
            try {
                const storedProgress = await loadProgressFromStorage();
                const initialProgress = {};

                data.forEach(item => {
                    initialProgress[item._id] = storedProgress[item._id] || 0;
                });

                setProgress(initialProgress);
            } catch (error) {
                console.error('Veri çekme hatası:', error);
            }
        };

        fetchDataAndProgress();
    });

    // Progress durumunu kaydetmek için yardımcı fonksiyon
    const saveProgressToStorage = async (progress) => {
        try {
            await AsyncStorage.setItem('@habit_progress', JSON.stringify(progress));
        } catch (error) {
            console.error('İlerleme kaydedilemedi:', error);
        }
    };

    // Progress durumunu yüklemek için yardımcı fonksiyon
    const loadProgressFromStorage = async () => {
        try {
            const progressData = await AsyncStorage.getItem('@habit_progress');
            return progressData ? JSON.parse(progressData) : {};
        } catch (error) {
            console.error('İlerleme yüklenemedi:', error);
            return {};
        }
    };

    const handleButtonPress = (habit_id) => {
        setProgress((prevProgress) => {
            const updatedProgress = { ...prevProgress };
            const habit = data.find(item => item._id === habit_id);
            const maxProgress = habit.habitDay;
            if (updatedProgress[habit_id] < maxProgress) {
                const sound = new Sound(require('../../../assets/sounds/click.mp3'), (error) => {
                    if (error) {
                        console.log('Ses yüklenirken hata oluştu:', error);
                        return;
                    }
                    sound.play(() => {
                        sound.release();
                    });
                });
                updatedProgress[habit_id] += 1;
                saveProgressToStorage(updatedProgress); // Değişiklikleri kaydet
            }
            return updatedProgress;
        });
    };

    const goToEditPage = (id, title, desc, day) => {
        navigation.navigate('HabitEditPage', { id, title, desc, day });
    };

    return (
        <View>
            {
                data.length === null ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Haydi başla</Text>
                    </View>
                ) : data.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#B836FC" />
                    </View>
                ) : (

                    data.map((item) => {
                        const dayCount = item.habitDay;
                        const currentProgress = progress[item._id] || 0; // Her alışkanlık için ayrı ilerleme durumu

                        return (
                            <View style={styles.container} key={item._id}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ alignSelf: 'center', height: 32, marginRight: 4, justifyContent: 'center' }} onPress={() => goToEditPage(item._id, item.habitTitle, item.habitDesc, item.habitDay)}>
                                        <Image style={{ height: 22, width: 22, tintColor: colors.purple, alignSelf: 'center', marginRight: 8 }}
                                            source={require('../../../assets/icons/edit.png')} />
                                    </TouchableOpacity>
                                    <View style={styles.innerCont}>
                                        <Text style={styles.title}>{item.habitTitle}</Text>
                                        <Text style={styles.desc}>{item.habitDesc}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.day}>{dayCount < currentProgress ? dayCount : currentProgress}/{dayCount}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, marginLeft: -2 }}>
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
                                        <Image style={{ height: 28, width: 28, tintColor: colors.white }}
                                            source={require('../../../assets/images/up.png')} />

                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }))}
        </View>
    );
}
