import { View, Text, StyleSheet } from "react-native"
import { constants } from "../constants/Constants"



export default function CustomMovieInformation({ route, isEventScheduled }) {

    const { item } = route.params

    const marginBottomStyle = isEventScheduled ? 0 : constants.informationMarginBottom;


    return (
        <View style={[styles.container, { marginBottom: marginBottomStyle }]} >

            <Text style={styles.sectionHeader}>Információ</Text>

            <View style={styles.content} >
                <View>

                    {item.type === 'Movie' ?
                        <>
                            <Text style={styles.title} >Rendező:</Text>
                            <Text style={styles.data} >{item.directors}</Text>
                        </>
                        :
                        <>
                            <Text style={styles.title} >Alkotók:</Text>
                            <Text style={styles.data} >{item.creators}</Text>
                        </>
                    }


                </View>

                <View>
                    {item.type === 'Movie' ? <>
                        <Text style={styles.title}>Író:</Text>
                        <Text style={styles.data}>{item.writers}</Text>
                    </>

                        :
                        <>
                            <Text style={styles.title}>Évadok száma:</Text>
                            <Text style={styles.data}>{item.seasons}</Text>

                            <Text style={styles.title}>Epizódok száma:</Text>
                            <Text style={styles.data}>{item.episodes}</Text>
                        </>
                    }


                </View>

                <View>
                    <Text style={styles.title}>Megjelenés:</Text>
                    <View style={styles.dataContainer}>
                        <Text style={styles.data}>{item.releaseDate}</Text>
                    </View>

                </View>

                <View>
                    <Text style={styles.title}>Játékidő:</Text>
                    <Text style={styles.data}>{item.runtimeMins} perc</Text>
                </View>
            </View>

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
        flexDirection: 'column'
    },

    title: {
        fontWeight: 700,
        fontSize: 12,
    },

    data: {
        fontWeight: 300,
        fontSize: 12,
    },

    dataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    calendarIcon: {
        marginLeft: 10,
    },
})