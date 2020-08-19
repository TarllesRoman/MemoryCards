import { StyleSheet } from 'react-native';
import { STATUSBAR } from '../../../resources/dimensions';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: STATUSBAR.height,
        backgroundColor: '#e7e4dd',
        alignItems: 'center',
    },
    logo: {
        borderRadius: 8,
        width: 128,
        height: 128,
        marginTop: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#212121',
        marginTop: 4,
        marginBottom: 32,
    },
    button: {
       backgroundColor: '#212121',
       borderRadius: 8,
       padding: 16,
       elevation: 2,
       width: 300,
       marginBottom: 24,
    },
    buttonText: {
        color: '#F2EBE5',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'sans-serif-medium'
    },
    buttonGroup: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 8
    },
    flag: {
        width: 50,
        height: 50,
        marginHorizontal: 5
    },
    flag_selected: {
        backgroundColor: '#212121',
        borderRadius: 8,
    }

});