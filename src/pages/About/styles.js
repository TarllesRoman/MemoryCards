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
    scroll_view: {
        backgroundColor: 'white',
        marginBottom: 24,
        marginHorizontal: 10,
        borderRadius: 8,
        padding: 5,
    },

    contact_button: {
        flexDirection: 'row',
        marginBottom: 24,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    contact_icon: {
        color: '#212121',
        marginHorizontal: 6,
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