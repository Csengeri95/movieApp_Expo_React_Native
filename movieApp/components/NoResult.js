import { View, Text, StyleSheet } from "react-native"
import { Entypo } from '@expo/vector-icons';


export default function NoResult({ searchText }) {

    return (
        <>
            <Entypo name="emoji-sad" size={120} color="black" />
            <Text style={styles.textFirst} >Nincs találat!</Text>
            <Text style={styles.textSecond} >A(z) "{searchText}" kifejezés sajnos nem eredményezett találatot! Kérem, próbálkozzon más kifejezéssel!  </Text>

        </>
    )
}

const styles = StyleSheet.create({
    textFirst: {
        fontWeight: 700,
        fontSize: 24,
    },

    textSecond: {
        fontWeight: 300,
        flexWrap: 'wrap',
        maxWidth: 350,
        textAlign: 'center'
    },
})