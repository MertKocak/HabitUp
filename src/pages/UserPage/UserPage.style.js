import { Image, StyleSheet, Dimensions } from "react-native";
import colors from "../../colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    body: {
        backgroundColor: colors.black1,
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        color: colors.white,
        fontSize: 14,
        fontFamily: "Manrope-Bold",
        
    },
    innerCont: {
        flexDirection: 'column',
        maxWidth: windowWidth - 88,
        flex: 1,
        marginBottom: 2,
        justifyContent: "center",
    },
    container: {
        backgroundColor: colors.black2,
        marginTop: 12,
        width: windowWidth - 40,
        borderRadius: 8,
        padding: 16,
        marginRight: 6,
        marginLeft: 12,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: colors.gray,
        borderWidth: 0.5,
        flexDirection: "column"
    },
    desc: {
        color: colors.white,
        fontSize: 12,
        fontFamily: "Manrope-ExtraLight",
        marginTop: 2,
        paddingRight: 20,
    },
    day: {
        color: colors.white,
        fontSize: 14,
        fontFamily: "Manrope-Medium",
        marginLeft: 8,
        textAlignVertical: "center",
        flex: 1
    },
    squares: {
        width: 16,
        height: 16,
        borderRadius: 2,
        backgroundColor: colors.white,
        margin: 2,
    },
    button: {
        backgroundColor: colors.purple,
        marginTop: 16,
        marginBottom: 4,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
    },
    buttonText: {
        color: colors.white,
        textAlign: "center",
        fontFamily: "Manrope-Bold",
        fontSize: 12,
        marginLeft: 6,
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
        marginTop:16,
        backgroundColor: colors.purple,
        height: 48,
        width: windowWidth - 72,
        justifyContent: "center",
        borderRadius: 8,
    },
    addButtonHalf: {
        marginTop:16,
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