import { StyleSheet, Text, TouchableOpacity, View, Modal, Image, Button, ActivityIndicator, ToastAndroid, CommonActions, Dimensions } from 'react-native'
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

    const [habitIsDone, sethabitIsDone] = React.useState(true);

    const [modalVisible85, setModalVisible85] = useState(false);
    const [modalVisible70, setModalVisible70] = useState(false);
    const [modalVisible50, setModalVisible50] = useState(false);
    const [modalVisible35, setModalVisible35] = useState(false);
    const [modalVisible0, setModalVisible0] = useState(false);

    const [habitProgress, setHabitProgress] = useState({});

    // Veriyi çekme ve progress değerini başlatma

    useEffect(() => {
        const loadProgress = async () => {
            const storedProgress = await AsyncStorage.getItem('@habit_progress');
            const parsedProgress = storedProgress ? JSON.parse(storedProgress) : {};

            const initialProgress = {};
            data.forEach((habit) => {
                initialProgress[habit._id] = parsedProgress[habit._id] || new Array(habit.habitDay).fill(0);
            });

            setHabitProgress(initialProgress);
        };

        loadProgress();
    }, [data]);

    const habitIsDoneFunc = async (id) => {
        const progressData = habitProgress[id] || [];
        const countPurple = progressData.filter(val => val === 1).length;
        const countGray = progressData.filter(val => val === 2).length;
        const countSum = countPurple + countGray;
        const habitData = {
            habitIsDone,
        };
        await axios
            .put(`https://habitup-backend.onrender.com/habit/${id}`, habitData)
            .then(res => {
                const soundSuccess = new Sound(require('../../../assets/sounds/success.mp3'), async (error) => {
                    if (error) {
                        console.log('Ses yüklenirken hata oluştu:', error);
                        return;
                    }
                    await soundSuccess.play(() => {
                        soundSuccess.release();
                    });
                });
            })
            .catch(e => console.error("Hata:", e));

        if (countPurple / countSum >= 0.85) {
            setModalVisible85(true);
        }
        else if (countPurple / countSum >= 0.7 && countPurple / countSum < 0.85) {
            setModalVisible70(true);
        }
        else if (countPurple / countSum >= 0.5 && countPurple / countSum < 0.7) {
            setModalVisible50(true);
        }
        else if (countPurple / countSum >= 0.35 && countPurple / countSum < 0.5) {
            setModalVisible35(true);
        }
        else if (countPurple / countSum >= 0 && countPurple / countSum < 0.35) {
            setModalVisible0(true);
        }
    }

    const closeModal85 = async () => {
        setModalVisible85(false);
        await navigation.replace('HomePage');
    };
    const closeModal70 = async () => {
        setModalVisible70(false);
        await navigation.replace('HomePage');
    };
    const closeModal50 = async () => {
        setModalVisible50(false);
        await navigation.replace('HomePage');
    };
    const closeModal35 = async () => {
        setModalVisible35(false);
        await navigation.replace('HomePage');
    };
    const closeModal0 = async () => {
        setModalVisible0(false);
        await navigation.replace('HomePage');
    };

    const handleProgress = async (habit_id, value) => {
        setHabitProgress(prev => {
            const updatedProgress = { ...prev };
            const habitData = updatedProgress[habit_id] || [];
            const nextIndex = habitData.findIndex(val => val === 0);

            if (nextIndex !== -1) {
                habitData[nextIndex] = value; // 1 = Mor, 2 = Gri
                updatedProgress[habit_id] = habitData;
                AsyncStorage.setItem('@habit_progress', JSON.stringify(updatedProgress));
            }

            // Eğer tüm ilerlemeler tamamlanmışsa, habitIsDoneFunc çağır
            if (!habitData.includes(0)) {
                habitIsDoneFunc(habit_id);
            }

            return { ...updatedProgress };
        });

        // Ses Efekti
        if (value === 1) {
            const soundS = new Sound(require('../../../assets/sounds/click.mp3'), (error) => {
                if (error) {
                    console.log('Ses yüklenirken hata oluştu:', error);
                    return;
                }
                soundS.play(() => {
                    soundS.release();
                });
            });
        } else if (value === 2) {
            const soundF = new Sound(require('../../../assets/sounds/fail.mp3'), (error) => {
                if (error) {
                    console.log('Ses yüklenirken hata oluştu:', error);
                    return;
                }
                soundF.play(() => {
                    soundF.release();
                });
            });
        }
    };

    const goToEditPage = (id, title, desc, day) => {
        navigation.navigate('HabitEditPage', { id, title, desc, day });
    };


    return (
        <View>
            {data.map((item) => {
                const dayCount = item.habitDay;
                const progressData = habitProgress[item._id] || [];
                const currentProgress = progress[item._id] || 0; // Her alışkanlık için ayrı ilerleme durumu
                return (
                    <View style={styles.container} key={item._id}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ alignSelf: 'center', height: 32, marginRight: 4, justifyContent: 'center' }} onPress={() => goToEditPage(item._id, item.habitTitle, item.habitDesc, item.habitDay)}>
                                <Image style={{ height: 22, width: 22, tintColor: colors.purple, alignSelf: 'center', marginRight: 8 }}
                                    source={require('../../../assets/icons/edit.png')} />
                            </TouchableOpacity>
                            {item.habitDesc ? <View style={styles.innerCont}>
                                <Text style={styles.title}>{item.habitTitle}</Text>
                                <Text style={styles.desc}>{item.habitDesc}</Text>
                            </View> : <View style={styles.innerCont}>
                                <Text style={styles.title}>{item.habitTitle}</Text>
                            </View>
                            }
                            <View>
                                {Array.isArray(habitProgress[item._id]) && (
                                    <Text style={styles.day}>
                                        {habitProgress[item._id].filter(val => val !== 0).length} / {habitProgress[item._id].length}
                                    </Text>
                                )}
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, marginLeft: -2 }}>
                            {habitProgress[item._id]?.map?.((status, index) => (
                                <View
                                    key={index}
                                    style={[styles.squares,
                                    {
                                        backgroundColor: status === 1 ? colors.purple : status === 2 ? colors.gray : colors.white,
                                    }
                                    ]}
                                />
                            )) || []}

                        </View>
                        
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleProgress(item._id, 2)}>
                                <View style={[styles.button, { width: 40, marginRight: 16, backgroundColor: colors.gray }]}>
                                    <Image style={{ height: 24, width: 24, tintColor: colors.white }}
                                        source={require('../../../assets/icons/cross.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleProgress(item._id, 1)}>
                                <View style={[styles.button, { width: Dimensions.get("window").width - 128 }]}>
                                    <Image style={{ height: 28, width: 28, tintColor: colors.white }}
                                        source={require('../../../assets/images/up.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                );
            })}
            <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible85}
                            onRequestClose={() => closeModal85()}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Harika! Zirvedesin! 🏆</Text>
                                    <Text style={styles.modalText}>Sen artık sadece bir hedef koyan değil, onu alışkanlığa dönüştüren birisin. Bu senin azminin ve disiplininin bir kanıtı. Kendinle gurur duymalısın!</Text>
                                    <Text style={styles.modalText}>Peki şimdi sırada ne var?</Text>
                                    <TouchableOpacity onPress={() => closeModal85()}>
                                        <View style={styles.addButton}>
                                            <Text style={styles.addButtonText}>
                                                Devam Et!
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                       <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible70}
                            onRequestClose={() => closeModal70()}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Harika Gidiyorsun! Devam Et! 🌟</Text>
                                    <Text style={styles.modalText}>Çoğu insan bu seviyeye bile ulaşamazken sen harika bir istikrar gösterdin! Küçük sapmalar olabilir ama önemli olan devam etmek.</Text>
                                    <Text style={styles.modalText}>Yolun açık, sen bu işi başarabilirsin!</Text>
                                    <TouchableOpacity onPress={() => closeModal70()}>
                                        <View style={styles.addButton}>
                                            <Text style={styles.addButtonText}>
                                                Devam Et!
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible50}
                            onRequestClose={() => closeModal50()}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>İyi Bir Başlangıç, Daha İyisi Mümkün! 🎯</Text>
                                    <Text style={styles.modalText}>Başarılı olmak için önemli bir adım attın! İlerleme kaydediyorsun ama daha istikrarlı olabilirsin. Küçük adımlarla büyük değişimler yaratabilirsin!</Text>
                                    <Text style={styles.modalText}>Vazgeçme, daha iyisini yapabilirsin!</Text>
                                    <TouchableOpacity onPress={() => closeModal50()}>
                                        <View style={styles.addButton}>
                                            <Text style={styles.addButtonText}>
                                                Devam Et!
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible35}
                            onRequestClose={() => closeModal35()}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Daha Fazlasını Yapabilirsin! ⏳</Text>
                                    <Text style={styles.modalText}>Güzel bir başlangıç yaptın ama biraz daha çaba gerekli. Başarının sırrı istikrardır! Küçük bir adımla başla ve her gün üzerine koy.</Text>
                                    <Text style={styles.modalText}>Kendine inan, çünkü bunu yapabilecek güce sahipsin!</Text>
                                    <TouchableOpacity onPress={() => closeModal35()}>
                                        <View style={styles.addButton}>
                                            <Text style={styles.addButtonText}>
                                                Devam Et!
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible0}
                            onRequestClose={() => closeModal0()}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Başlamak Bitirmenin Yarısıdır! 🌱</Text>
                                    <Text style={styles.modalText}>Henüz düzenli bir ilerleme sağlayamadın ama endişelenme! Önemli olan hareket etmek. Unutma, devam eden bir süreç her zaman mükemmel olmayan bir başlangıçtan daha iyidir!</Text>
                                    <Text style={styles.modalText}>Bugün bir adım atmaya ne dersin?</Text>
                                    <TouchableOpacity onPress={() => closeModal0()}>
                                        <View style={styles.addButton}>
                                            <Text style={styles.addButtonText}>
                                                Devam Et!
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
        </View>
        
    );
}
