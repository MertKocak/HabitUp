import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Modal, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import colors from '../colors';
import { CommonActions } from '@react-navigation/native';

const ForgotPasswordScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
  const [serverError, setServerError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const onSubmit = async (data: { email: string }) => {
    setServerError(""); // Önceki hata mesajını temizle
    try {
      const response = await axios.post('https://habitup-backend.onrender.com/forgot-password', {
        email: data.email,
      });

      if (response.data.success) {
        setModalVisible(true)
      } else {
        setServerError("Bu e-posta adresi sistemde bulunamadı.");
      }
    } catch (error) {
      setServerError("Bir şeyler yanlış gitti.");
    }
  };

  const mailSuccess = () => {
    setModalVisible(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => mailSuccess()}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>E-posta Gönderimi Başarılı!</Text>
            <Text style={styles.modalText}>Şifre sıfırlama e-postası gönderildi. Lütfen gelen kutunu kontrol et.</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => mailSuccess()}>
                <View style={[styles.addButtonFull]}>
                  <Text style={styles.addButtonText}>
                    Tamam
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Şifreni mi unuttun?</Text>
      <Text style={styles.subtitle}>Kayıtlı e-posta adresini gir, sana sıfırlama linki gönderelim.</Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: "E-posta adresi zorunludur.",
          pattern: { value: /^\S+@\S+\.\S+$/, message: "Lütfen geçerli bir e-posta adresi girin." }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="E-posta adresi"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={"#505050"}
            onChangeText={(text) => {
              onChange(text);
              setServerError(""); // Kullanıcı yazarken sunucu hatasını temizle
              clearErrors("email"); // Form hatasını temizle
            }}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      {serverError ? <Text style={styles.error}>{serverError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Sıfırlama Linki Gönder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', paddingTop: 200, padding: 20, backgroundColor: colors.black1 },
  title: { fontSize: 16, fontFamily: "Manrope-Bold", color: colors.purple, marginBottom: 10 },
  subtitle: { fontSize: 14, color: colors.white, marginBottom: 20 },
  input: { borderWidth: 0.6, borderColor: colors.gray, color: colors.white, padding: 10, borderRadius: 6, marginBottom: 10 },
  button: { backgroundColor: colors.purple, padding: 12, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontSize: 14, fontFamily: "Manrope-SemiBold" },
  error: { color: colors.purple, fontSize: 14, marginBottom: 5 },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Saydam arka plan
  },
  modalContent: {
    width: Dimensions.get("window").width - 32,
    padding: 20,
    backgroundColor: colors.black1,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 0.8,
    borderColor: colors.purple
  },
  modalText: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.white,
    fontFamily: "Manrope-Medium",
    textAlign: "center"
  },
  modalTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.purple,
    fontFamily: "Manrope-Bold",
    textAlign: "center"
  },
  addButtonFull: {
    marginTop: 16,
    backgroundColor: colors.purple,
    height: 44,
    width: Dimensions.get("window").width - 72,
    justifyContent: "center",
    borderRadius: 8,
  },
  addButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    color: colors.white,
    fontFamily: "Manrope-Bold",
    marginBottom: 2,
  },
});

export default ForgotPasswordScreen;
