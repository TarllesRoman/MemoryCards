import { StyleSheet } from 'react-native';
import { STATUSBAR } from '../../../resources/dimensions';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: STATUSBAR.height,
        backgroundColor: '#CFD8DC',
    },

    header: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 80
    },
    title: {
        fontSize: 30,
        marginBottom: 5,
        marginTop: 20,
        color: '#13131a',
        fontWeight: 'bold'
    },
    headerText: {
        fontSize: 15,
        color: '#737380'
    },
    headerTextBold: {
        fontWeight: 'bold'
    },
    level: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 4
    },
    playerList: {
        flex: 5,
    },
    player: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },
    playerInfos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    playerProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },
    button: {
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
    icon: {
        color: '#F2EBE5',
    },
    buttonText: {
        color: '#F2EBE5',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    },
});