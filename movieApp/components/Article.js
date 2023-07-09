import { useState } from 'react'
import { Text, View, StyleSheet, } from 'react-native'
import { constants } from '../constants/Constants'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default function Article({ route }) {

    const { item } = route.params

    const [open, setOpen] = useState(false)
    return (

        <View style={styles.container} >
            <Text style={styles.sectionHeader} >Történet</Text>

            <TouchableWithoutFeedback style={styles.content} onPress={() => setOpen(!open)}  >

                {!open && item.plotLocal.length > constants.plotLocalMaxLength && (
                    <>
                        <Text style={styles.plot}>
                            {item.plotLocal.slice(0, constants.plotLocalMaxLength) + '...'}
                        </Text>
                        <Text style={styles.expandText}>A részletekért kattintson ide!</Text>
                    </>
                )}

                {open && <Text style={styles.plot} >{item.plotLocal}</Text>}
            </TouchableWithoutFeedback>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 10,
    },

    sectionHeader: {
        fontWeight: 800,
        fontSize: 24,
        color: '#000',
        marginBottom: 7,
        textShadowOffset: { width: 0, height: 1 },
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowRadius: 2,
    },

    content: {
        backgroundColor: 'rgba(192,192,192,0.45)',
        borderRadius: 10,
        padding: 7,

    },
    plot: {
        fontSize: 15,
        fontWeight: 400,
    },
    expandText: {
        fontSize: 15,
        fontWeight: 700,
        color: '#000000',
        marginTop: 5,
        textDecorationLine: 'underline',
    },
})