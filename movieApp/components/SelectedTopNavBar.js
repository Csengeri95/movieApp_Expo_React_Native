import { StyleSheet, View, Text } from "react-native"
import { constants } from '../constants/Constants'
import ArrowLeft from "../icons/ArrowLeft"
import ShareComponent from "../icons/ShareComponent"

export default function SelectedTopNavBar({ route, navigate, onShare }) {
    const { item } = route.params



    const margin = item.title.length < constants.headerTitleMaxLength ? -10 : 0

    return (
        <View style={[styles.container, { height: constants.headerHeight }]} >

            <ArrowLeft color={'#2196F3'} size={32} onPress={navigate} />

            <View style={{ marginLeft: margin }}  >
                <Text style={[styles.title]} >
                    {item.title.length > constants.headerTitleMaxLength ? item.title.slice(0, constants.headerTitleMaxLength) + '...' : item.title}
                </Text>
            </View>

            <ShareComponent color={'#2196F3'} size={32} onPress={onShare} />

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: constants.width,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
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