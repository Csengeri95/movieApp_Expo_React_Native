import { FlatList, View, Text, Image, StyleSheet } from "react-native";
import { constants } from "../constants/Constants";



export default function CustomFlatlist({ route }) {


    const { item } = route.params
    const actors = item.actors

    const ListItem = ({ item }) => {
        return (
            <View style={styles.item} >
                <Image
                    source={{ uri: item.image }}
                    style={styles.itemPhoto}
                    resizeMode='cover'
                />
                <Text style={styles.itemName} >{item.name}</Text>
                <Text style={styles.itemCharacter} >
                    {item.role.length > constants.maxRoleLength ? item.role.slice(0, constants.maxRoleLength) + "..." : item.role}
                </Text>
                {item.episodes ? <Text style={styles.itemCharacter}>({item.episodes} epizód)</Text> : null}

            </View>
        )
    }

    return (
        <>
            <Text style={styles.header}>Szereplők</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={actors}
                renderItem={({ item }) => (
                    <ListItem item={item} />
                )}

            />
        </>
    )
}


const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        marginHorizontal: 10,
    },

    itemPhoto: {
        width: constants.actorImageWidth,
        height: 80,
        borderRadius: 50,
    },

    itemName: {
        color: '#000',
        marginTop: 5,
        fontSize: 12,
        fontWeight: 600,
        flexWrap: 'wrap',
        maxWidth: constants.maxNameWidth,
        textAlign: 'center'

    },

    itemCharacter: {
        fontSize: 11,
        fontWeight: 300,
        flexWrap: 'wrap',
        maxWidth: constants.maxNameWidth,
        textAlign: 'center'

    },
    header: {
        fontSize: 24,
        fontWeight: 800,
        marginBottom: 10,
        textShadowOffset: { width: 0, height: 1 },
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowRadius: 2,
        marginBottom: 7,
        paddingLeft: 10
    },





})