import {StyleSheet} from 'react-native';
import { STATUSBAR_HEIGHT } from '../../constant';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: STATUSBAR_HEIGHT,
        backgroundColor: '#607d8b',
    },
});

export const modal_styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    view: {
        margin: 20,
        backgroundColor: "#212121",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    text: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#CFD8DC',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
    },
    button: {
       backgroundColor: "#607d8b",
       borderRadius: 10,
       padding: 15,
       elevation: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 5,
        color: "white",
        marginVertical: 10,
    }
});