import { useState, useEffect } from 'react'
import TopNavBar from "../components/TopNavBar"
import { View, StyleSheet, FlatList, Image, Text, TextInput, KeyboardAvoidingView, Platform, Keyboard, Animated, Button, } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FocusAwareStatusBar } from "../constants/StatusBarComponent";
import { constants } from "../constants/Constants";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchData } from '../constants/ApiCallings';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NoResult from '../components/NoResult';

export default function Search() {

    const navigation = useNavigation()
    const [searchText, setSearchText] = useState('')
    const [filtered, setFiltered] = useState([])
    const [data, setData] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [isFocused, setIsFocused] = useState(false)
    const [inputWidth] = useState(new Animated.Value(350))


    inputWidth.addListener(() => { return })


    const inputContainerStyle = {
        width: inputWidth,
        marginRight: isFocused ? 10 : 0
    };


    const ListItem = ({ item, onPress }) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={onPress}
            >
                <Image
                    style={styles.image}
                    source={{ uri: item.uri }}
                />
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const SuggestionItem = ({ suggestion, onPress, searchText }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress} style={styles.suggestionsContent} >
                <EvilIcons name="search" size={16} color="black" style={styles.icon} />
                <Text style={styles.suggestionText} >
                    {formatSuggestionText(suggestion, searchText)}
                </Text>
            </TouchableWithoutFeedback>
        )
    }


    const handleFocus = () => {
        setIsFocused(true)
        Animated.timing(inputWidth, {
            toValue: constants.width * 0.70,
            duration: 400,
            useNativeDriver: false
        }).start()
    }

    const handleBlur = () => {
        setIsFocused(false)
        Animated.timing(inputWidth, {
            toValue: constants.width * 0.85,
            duration: 400,
            useNativeDriver: false,
        }).start()
    }

    useEffect(() => {
        const getData = async () => {

            const response = await fetchData()

            if (response) {
                setData(response)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        if (searchText == '') {
            setSuggestions([])
            setFiltered([])
            return
        }


        const searchResults = data
            .flatMap(a => a.data.filter(item =>
                item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                item.actors.some(actor => actor.name.toLowerCase().includes(searchText.toLowerCase())) ||
                item.releaseDate.includes(searchText)
            ))
            .map(item => ({
                ...item
            }));



        setFiltered(searchResults)

        const suggestedResults = data
            .flatMap(a => a.data.filter(item =>
                item.title.toLowerCase().startsWith(searchText.toLowerCase())
            ))
            .concat(
                data.flatMap(a => a.data.filter(item =>
                    item.actors.some(actor => actor.name.toLowerCase().includes(searchText.toLowerCase()))
                ))
            )
            .reduce((results, item) => {
                const matchedActors = item.actors
                    .filter(actor => actor.name.toLowerCase().includes(searchText.toLowerCase()))
                    .map(actor => actor.name);
                return results.concat([item.title, ...matchedActors]);
            }, [])
            .flat();

        const uniqueSuggestions = [...new Set(suggestedResults)];


        setSuggestions(uniqueSuggestions)

    }, [searchText])


    const handleChange = async (text) => {
        setSearchText(text)
    }

    const handleSuggestionPress = (suggestion) => {
        setSearchText(suggestion);
        setSuggestions([]);
    };


    const formatSuggestionText = (suggestion, searchText) => {
        const lowerCaseSuggestion = suggestion.toLowerCase()
        const lowerCaseSearchText = searchText.toLowerCase()
        const startIndex = lowerCaseSuggestion.indexOf(lowerCaseSearchText)

        if (startIndex !== -1) {
            const endIndex = startIndex + lowerCaseSearchText.length

            return (
                <>
                    <Text>{suggestion.substring(0, startIndex)}</Text>
                    <Text style={styles.boldText} >
                        {suggestion.substring(startIndex, endIndex)}
                    </Text>
                    <Text>{suggestion.substring(endIndex)}</Text>
                </>
            )
        }

        return suggestion
    }


    const handleCancel = () => {
        Keyboard.dismiss()
        setSearchText('')
        setSuggestions([])
        setFiltered([])
    }


    const handlePress = (item) => {
        Keyboard.dismiss()
        navigation.navigate('SelectedItem', { item: item, targetRoute: 'Search' })

    }

    return (
        <>
            <FocusAwareStatusBar style="dark" />
            <View style={styles.container} >
                <View style={styles.header}>
                    <TopNavBar title={'Keresés'} />
                </View>

                <View style={styles.inputContent} >
                    <Animated.View style={[styles.inputContainer, inputContainerStyle]} >
                        <EvilIcons name="search" size={26} color="black" style={styles.icon} />

                        <TextInput
                            style={styles.input}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            fontSize={16}
                            returnKeyType='default'
                            placeholder={'Film, színész, év...'}
                            autoCapitalize='none'
                            value={searchText}
                            onChangeText={handleChange}
                        />


                    </Animated.View>

                    {isFocused && <Button title='Mégsem' style={{ alignSelf: 'center' }} onPress={handleCancel} />}

                </View>


                {suggestions.length > 0 && isFocused && (
                    <View style={styles.suggestionsContainer}>
                        {suggestions.slice(0, 6).map((suggestion, index) => (

                            <SuggestionItem
                                key={index}
                                suggestion={suggestion}
                                searchText={searchText}
                                onPress={() => handleSuggestionPress(suggestion)}
                            />
                        ))}
                    </View>
                )}



                <View style={styles.flatlistContainer}>

                    {searchText !== '' && suggestions.length == 0 && filtered.length == 0 ?


                        <NoResult searchText={searchText} />

                        :

                        <FlatList
                            data={filtered}
                            style={{ width: constants.width }}
                            keyExtractor={(_, index) => index}
                            numColumns={2}
                            initialNumToRender={filtered.length}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <ListItem item={item} onPress={() => handlePress(item)} />
                            )
                            }
                        />


                    }

                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },

    suggestionsContainer: {
        width: constants.width,
        paddingLeft: 15,
        marginTop: 3,
    },

    suggestionsContent: {
        marginBottom: 5,
        flexDirection: 'row'
    },

    suggestionText: {
        fontSize: 15,
        fontWeight: 200,
    },
    boldText: {
        fontWeight: 700,
    },

    inputContent: {
        flexDirection: 'row',
        marginTop: constants.headerHeight + 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    inputContainer: {
        height: 40,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(192,192,192,0.4)',
        flexDirection: 'row',
    },


    input: {
        flex: 1,
    },
    icon: {
        alignSelf: 'center',
    },

    item: {
        flexDirection: 'column',
        marginBottom: 10,
    },

    image: {
        height: constants.customImageHeight,
        width: constants.customImageWidth,
        marginLeft: 10,
        borderRadius: 10,

    },

    title: {
        flexWrap: 'wrap',
        maxWidth: 180,
        textAlign: 'auto',
        paddingLeft: 10
    },

    flatlistContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: constants.headerHeight - 60,
    },



})