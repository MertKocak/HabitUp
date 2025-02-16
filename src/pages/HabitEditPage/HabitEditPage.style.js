import { Image, StyleSheet, Dimensions } from "react-native";
import colors from "../../colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    body: {
        padding: 16,
        paddingTop: 0,
        backgroundColor: colors.black1,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    },
    title: {
        fontSize: 14,
        color: colors.purple,
        fontFamily: "Manrope-Bold",
        alignSelf: "center",
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Medium",
        alignSelf: "flex-start",
        marginBottom: 0,
        marginTop: 16,
    },
    input: {
        marginTop: 8,
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
    saveButton: {
        marginTop: 16,
        backgroundColor: colors.purple,
        height: 48,
        width: windowWidth / 2 - 26,
        justifyContent: "center",
        borderRadius: 8,
        marginLeft: 10,
    },
    saveButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Bold",
        marginBottom: 2,
    },
    cancelButton: {
        marginTop: 16,
        backgroundColor: colors.black2,
        height: 48,
        marginRight: 10,
        width: windowWidth / 2 - 26,
        justifyContent: "center",
        borderRadius: 8,
        borderWidth: 0.6,
        borderColor: colors.gray

    },
    cancelButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Bold",
        marginBottom: 2,
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
    addButtonFull: {
        marginTop: 16,
        backgroundColor: colors.purple,
        height: 48,
        width: windowWidth - 72,
        justifyContent: "center",
        borderRadius: 8,
    },
    addButtonHalf: {
        marginTop: 16,
        backgroundColor: colors.purple,
        height: 48,
        width: (windowWidth - 88) / 2,
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