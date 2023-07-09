import {
    StyleSheet, Text, View, SectionList, Image, FlatList, Animated,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { constants } from '../constants/Constants'
import ArrowRight from '../icons/ArrowRight'
import { useNavigation } from '@react-navigation/native';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);


const ListItem = ({ item, onPress }) => {
    return (

        <TouchableOpacity style={styles.item} onPress={onPress} >
            <Image
                source={{
                    uri: item.uri,
                }}
                style={styles.itemPhoto}
                resizeMode='cover'
            />
            <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
    );
};


export default function Flat({ data }) {

    const navigation = useNavigation();


    const handlePress = (item) => {
        navigation.navigate('SelectedItem', { item: item })
    }




    return (
        <AnimatedSectionList

            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 10, marginVertical: 35 }}
            stickySectionHeadersEnabled={false}
            sections={data}

            renderSectionHeader={({ section }) => (
                <>
                    <View style={styles.sectionHeader} >
                        <Text style={styles.sectionHeaderText} >{section.heading}  </Text>
                        <ArrowRight />
                    </View>
                    <FlatList
                        horizontal
                        data={section.data}
                        renderItem={({ item }) =>

                        (
                            <ListItem item={item} onPress={() => handlePress(item)} />

                        )
                        }
                        showsHorizontalScrollIndicator={false}
                    />
                </>
            )
            }
            renderItem={({ }) => {
                return null;
            }}

        />

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    sectionHeader: {
        marginVertical: 15,
        textShadowOffset: { width: 0, height: 1 },
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },

    sectionHeaderText: {
        fontWeight: 800,
        fontSize: 24,
        color: '#000',
    },

    item: {
        marginRight: 10,
    },
    itemPhoto: {
        width: constants.customImageWidth,
        height: constants.customImageHeight,
        borderRadius: 10,
    },
    itemText: {
        color: '#000',
        marginTop: 5,
        fontSize: 12,
        fontWeight: 600,
        flexWrap: 'wrap',
        maxWidth: constants.maxTitleWidth,
    },

})