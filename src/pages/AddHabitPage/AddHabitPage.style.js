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
        fontWeight: "bold"
    },
    input: {
        marginTop: 16,
        height: 54,
        paddingBottom: 2,
        backgroundColor: colors.white,
        borderRadius: 6,
        width: windowWidth - 32,
        marginLeft: 16,
        marginRight: 16,
        fontSize: 14,
    },
    addButton: {
        marginTop:16,
        backgroundColor: colors.purple,
        height: 48,
        width: windowWidth - 32,
        justifyContent: "center",
        borderRadius: 8,
    },
    addButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 16,
        color: colors.white,
        fontWeight: "bold"


    }

})