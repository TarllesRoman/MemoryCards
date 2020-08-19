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
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#CFD8DC',
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderColor: '#8BC34A',
        borderStyle: 'solid',
        borderWidth: 1,
        paddingVertical: 10,
    },
    headerButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#8BC34A',
        marginHorizontal: 5
    },
    progress: {
        borderWidth: 0,
        borderRadius: 0,
        width: '100%',
        flexDirection: 'column',
        borderColor: '#8BC34A',
        marginBottom: HEADER.marginBottom,
    }
}); 