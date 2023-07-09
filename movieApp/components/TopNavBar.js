import { View, StyleSheet, Text } from 'react-native'
import { constants } from '../constants/Constants'

export default function TopNavBar({ title }) {


    return (
        <View style={[styles.container, { height: constants.headerHeight }]}>

            <Text style={styles.title}>
                {title}
            </Text>

            <View />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: constants.width,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 0.20,
        backgroundColor: '#FFF'

    },

    title: {
        fontWeight: 700,
        fontSize: 20,
    },
})