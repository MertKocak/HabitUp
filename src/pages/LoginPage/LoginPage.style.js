import { Image, StyleSheet, Dimensions } from "react-native";
import colors from "../../colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    body: {
        padding: 16,
        paddingTop: 24,
        backgroundColor: colors.black1,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    },
    title: {
        fontSize: 16,
        color: colors.purple,
        marginTop: 20,
        fontFamily: "Manrope-Bold"
    },
    input: {
        marginTop: 16,
        height: 48,
        paddingLeft: 16,
        justifyContent: "center",
        backgroundColor: colors.white,
        borderRadius: 6,
        width: windowWidth - 32,
        marginLeft: 16,
        marginRight: 16,
        fontSize: 14,
        fontFamily: "Manrope-Medium",
        color: colors.black2,
        
    },
    loginButton: {
        marginTop: 16,
        backgroundColor: colors.purple,
        height: 48,
        width: windowWidth - 32,
        justifyContent: "center",
        borderRadius: 8,
    },
    loginButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Bold",
    },
    registerText: {
        fontSize: 12,
        color: colors.purple,
        marginLeft: 4,
        marginTop: 16,
        fontFamily: "Manrope-Medium",

    },
    text: {
        fontSize: 12,
        color: colors.white,
        marginRight: 4,
        marginTop: 16,
        fontFamily: "Manrope-Medium",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Saydam arka plan
      },
      modalContent: {
        width: windowWidth - 32,
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
        fontSize: 16,
        marginBottom: 10,
        color: colors.purple,
        fontFamily: "Manrope-Bold",
        textAlign: "center"
      },
      addButton: {
        marginTop:16,
        backgroundColor: colors.purple,
        height: 48,
        width: windowWidth - 72,
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

})