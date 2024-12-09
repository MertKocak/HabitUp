import { Image, StyleSheet, Dimensions } from "react-native";
import colors from "../../colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({

    container: {
        backgroundColor: colors.black2,
        margin: 8,
        width: windowWidth - 32,
        borderRadius: 8,
        padding: 16,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: colors.gray,
        borderWidth: 0.5,
        flexDirection: "column"
    },
    innerCont: {
        flexDirection: 'column',
        maxWidth: windowWidth - 88,
        flex: 1,
    },
    title: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "700",
    },
    desc: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "200",
        marginTop: 2,
        paddingRight: 20,

    },
    day: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 8,
        maxWidth: 16,
    },
    squares: {
        width: 20,
        height: 20,
        borderRadius: 2,
        backgroundColor: colors.white,
        margin: 4,

    },
    button: {
        backgroundColor: colors.purple,
        marginTop: 16,
        marginBottom: 6,
        height: 44,
        justifyContent: "center",
        borderRadius: 8,
    },
    buttonText: {
        color: colors.white,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16,
    }
})