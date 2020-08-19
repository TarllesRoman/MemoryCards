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
        width: 64,
        height: 64,
        marginTop: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#212121',
        marginTop: 16,
        marginBottom: 24,
    },

    button: {
        flexDirection: 'row',
        backgroundColor: '#F2EBE5', //'#F2EBE5',
        borderRadius: 8,
        elevation: 2,
        padding: 16,
        width: 300,
        marginBottom: 24,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonText: {
        marginLeft: 10,
        color: '#000',
        fontSize: 24,
        fontFamily: 'sans-serif-medium'
    },


    back_button: {
        flexDirection: 'row',
        backgroundColor: '#212121',
        borderRadius: 8,
        padding: 16,
        elevation: 2,
        width: 100,
        marginBottom: 24,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    back_icon: {
        color: '#F2EBE5',
    },
    back_buttonText: {
        color: '#F2EBE5',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    },
});