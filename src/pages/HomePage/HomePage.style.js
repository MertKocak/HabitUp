import { Image, StyleSheet, Dimensions } from "react-native";
import colors from "../../colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    body: {
        backgroundColor: colors.black1,
        flex: 1,
        padding: 16,
        paddingTop: 0,
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Saydam arka plan
      },
      modalContent: {
        width: windowWidth - 32,
        padding: 20,
        paddingLeft: 24,
        paddingRight: 24,
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