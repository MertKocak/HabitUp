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
        flexDirection: "row"
    },
    innerCont: {
       // backgroundColor: "blue", 
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
      //  backgroundColor: "red",
        marginLeft: 8,
    },
})