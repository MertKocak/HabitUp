import { StyleSheet, TextInput, Alert, Text, View, Dimensions, Modal, ToastAndroid, TouchableOpacity, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import styles from "./HabitEditPage.style";
//import { TextInput } from 'react-native-paper';
import HomePage from '../HomePage';
import colors from '../../colors';
import { default as axios } from 'axios';
import { bg } from 'date-fns/locale';

export default function HabitEditPage({ navigation, route }) {
  const { id, title, desc, day, isDone } = route.params;

  const [habitTitle, sethabitTitle] = React.useState(title);
  const [habitDesc, sethabitDesc] = React.useState(desc);
  const [habitDay, sethabitDay] = React.useState(day);
  const [habitIsDone, sethabitIsDone] = React.useState(isDone);

  const [modalVisibleDay, setModalVisibleDay] = useState(false);
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [modalVisibleCancel, setModalVisibleCancel] = useState(false);

  function handleSubmit(id) {
    if (habitDay > 1095) {
      setModalVisibleDay(true)
    } else {
      const habitData = {
        habitTitle,
        habitDesc,
        habitDay,
        habitIsDone,
      };
      axios
        .put(`https://habitup-backend.onrender.com/habit/${id}`, habitData)
        .then(res => {
          ToastAndroid.show('Değişiklikler kaydedildi!', ToastAndroid.SHORT);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomePage' }],
            })
          ); // Ana sayfaya yönlendirme
        })
        .catch(e => console.error("Hata:", e));
    }
  }

  function handleDelete(id) {
    setModalVisibleDelete(true)

  }

  const deletefunction = () => {
    axios
      .delete(`https://habitup-backend.onrender.com/habit/${id}`)
      .then(res => {
        ToastAndroid.show('Alışkanlık silindi!', ToastAndroid.SHORT);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomePage' }],
          })
        ); // Ana sayfaya yönlendirme
      })
      .catch(e => console.error("Hata:", e));
  }

  const cancelSubmit = () => {
    setModalVisibleCancel(true)

  };

  const cancelfunction = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomePage' }],
      })
    ); // Ana sayfaya yönlendirme
  };

  return (
    <View style={styles.body}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleDay}
        onRequestClose={() => setModalVisibleDay(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alışkanlık Kaydedilemedi!</Text>
            <Text style={styles.modalText}>Alışkanlık süresi en fazla 1095 gün (3 yıl) olarak belirlenebilir.</Text>
            <TouchableOpacity onPress={() => setModalVisibleDay(false)}>
              <View style={styles.addButtonFull}>
                <Text style={styles.addButtonText}>
                  Tekrar Dene
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleDelete}
        onRequestClose={() => setModalVisibleDelete(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alışkanlık silinsin mi?</Text>
            <Text style={styles.modalText}>Bu işlem geri alınamaz.</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setModalVisibleDelete(false)}>
                <View style={[styles.addButtonHalf, { marginRight: 16, backgroundColor: colors.black2, borderWidth: 0.6, borderColor: colors.gray }]}>
                  <Text style={styles.addButtonText}>
                    Vazgeç
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletefunction()}>
                <View style={styles.addButtonHalf}>
                  <Text style={styles.addButtonText}>
                    Sil
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleCancel}
        onRequestClose={() => setModalVisibleCancel(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Değişikliklerden vazgeçilsin mi?</Text>
            <Text style={styles.modalText}>Yaptığınız değişiklikler kaydedilmeyecek.</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setModalVisibleCancel(false)}>
                <View style={[styles.addButtonHalf, { marginRight: 16, backgroundColor: colors.black2, borderWidth: 0.6, borderColor: colors.gray }]}>
                  <Text style={styles.addButtonText}>
                    Düzenlemeye dön
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cancelfunction()}>
                <View style={styles.addButtonHalf}>
                  <Text style={styles.addButtonText}>
                    Vazgeç
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ backgroundColor: colors.black2, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 24, width: Dimensions.get('window').width }}>
        <TouchableOpacity onPress=
          {() => navigation.goBack()}>
          <View style={{ height: 52, width: 52, justifyContent: 'center', alignItems: 'flex-right' }}>
            <Image style={{ height: 30, width: 30, tintColor: colors.purple }}
              source={require('../../../assets/icons/arrow.png')} />
          </View>
        </TouchableOpacity>
        <Image style={{ height: 40, width: 96, marginTop: 8 }}
          source={require('../../../assets/images/logo.png')} />
        <TouchableOpacity onPress=
          {() => handleDelete(id)}>
          <View style={{ height: 52, paddingHorizontal: 8, width: 52, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image style={{ height: 20, width: 20, tintColor: colors.purple }}
              source={require('../../../assets/icons/trash.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>
        Alışkanlık Düzenle
      </Text>
      <View style={{ height: 2, width: Dimensions.get('window').width - 32, marginTop: 10, marginBottom: -6, backgroundColor: colors.black2 }}></View>
      <Text style={styles.subtitle}>Alışkanlık Adı</Text>

      {isDone === true ?
        <Text style={[styles.subtitle, { backgroundColor: colors.gray, width: Dimensions.get("window").width - 32, padding: 16, paddingBottom: 12, paddingTop: 12, borderRadius: 6, marginTop: 8 }]}>
          {habitTitle}
        </Text> : <TextInput
          style={styles.input}
          placeholder="Alışkanlık İsmi"
          placeholderTextColor={colors.gray}
          cursorColor={colors.black2}
          value={habitTitle}
          onChangeText={habitTitle => sethabitTitle(habitTitle)}
        />}
      <Text style={styles.subtitle}>Alışkanlık Açıklaması</Text>

      {isDone === true ?
        <Text style={[styles.subtitle, { backgroundColor: colors.gray, width: Dimensions.get("window").width - 32, padding: 16, paddingBottom: 12, paddingTop: 12, borderRadius: 6, marginTop: 8 }]}>
          {habitDesc}
        </Text> :
        <TextInput
          style={styles.input}
          placeholder="Alışkanlık Açıklaması"
          placeholderTextColor={colors.gray}
          cursorColor={colors.black2}
          value={habitDesc}
          onChangeText={habitDesc => sethabitDesc(habitDesc)}
        />}
      <Text style={styles.subtitle}>Alışkanlık Süresi (Gün)</Text>


      {isDone === true ?
        <Text style={[styles.subtitle, { backgroundColor: colors.gray, width: Dimensions.get("window").width - 32, padding: 16, paddingBottom: 12, paddingTop: 12, borderRadius: 6, marginTop: 8 }]}>
          {habitDay}
        </Text> : <TextInput
          style={styles.input}
          placeholder="Alışkanlık Süresi (Gün)"
          placeholderTextColor={colors.gray}
          cursorColor={colors.black2}
          value={habitDay.toString()}
          onChangeText={habitDay => sethabitDay(habitDay)}
          keyboardType='numeric'
        />}


      {isDone === true ?
        null :
        <View style={{ flexDirection: "row", marginTop: 4 }}>
          <TouchableOpacity onPress={() => cancelSubmit()}>
            <View style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>
                Vazgeç
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit(id)}>
            <View style={styles.saveButton}>
              <Text style={styles.saveButtonText}>
                Kaydet
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

export default HabitEditPage;