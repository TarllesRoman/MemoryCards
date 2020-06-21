import {StyleSheet} from 'react-native';
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
        alignItems: 'center'
    },
    playerProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },


});