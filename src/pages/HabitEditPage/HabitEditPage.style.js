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
    addButton: {
        marginTop:16,
        backgroundColor: colors.purple,
        height: 48,
        width: windowWidth / 2 - 24,
        justifyContent: "center",
        borderRadius: 8,
        marginLeft: 8,
    },
    addButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Bold",
        marginBottom: 2,
    },
    cancelButton: {
        marginTop:16,
        backgroundColor: colors.black2,
        height: 48,
        marginRight: 8,
        width: windowWidth / 2 - 24,
        justifyContent: "center",
        borderRadius: 8,
        
    },
    cancelButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Bold",
        marginBottom: 2,
    },

})