import { Image, StyleSheet, Dimensions } from "react-native";
import colors from "../../colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    body: {
        backgroundColor: colors.black1,
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        fontSize: 16,
    }
})