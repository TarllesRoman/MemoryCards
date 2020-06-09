import { StyleSheet } from 'react-native';

import { HEADER } from '../../../resources/dimensions';

export default StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#212121',
        elevation: 5,
        marginBottom: HEADER.marginBottom,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#CFD8DC',
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 3,
        borderColor: '#8BC34A',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
    },
    headerButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#8BC34A'
    },

}); 