import { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Share, Alert, Button, Platform } from "react-native"
import { constants } from "../constants/Constants";
import { imageTranslateYTransform, imageScaleTransform } from '../constants/Transform'
import { StatusBar } from 'expo-status-bar';
import SelectedTopNavBar from "../components/SelectedTopNavBar";
import Article from '../components/Article';
import { useNavigation } from '@react-navigation/native';
import CustomFlatlist from '../components/CustomFlatlist';
import CustomButton from '../components/CustomButton';
import { FontAwesome } from '@expo/vector-icons';
import CustomMovieInformation from '../components/CustomMovieInformation';
import { Modalize } from 'react-native-modalize'
import YoutubePlayer from 'react-native-youtube-iframe'
import ShareComponent from '../icons/ShareComponent'
import ArrowLeft from '../icons/ArrowLeft';
import * as Linking from 'expo-linking';
import { fetchVideoId } from '../constants/ApiCallings';
import CalendarModalize from '../components/CalendarModalize';



export default function SelectedItem({ route }) {
    const { item } = route.params
    const navigation = useNavigation()

    const scrollY = useRef(new Animated.Value(0)).current
    const [fadeAnim] = useState(new Animated.Value(1))
    const [fadeNav] = useState(new Animated.Value(0))
    const [statusBarTheme, setStatusBarTheme] = useState('light')
    const [data, setData] = useState([])
    const modalizeTrailerRef = useRef(null)
    const modalizeCalendarRef = useRef(null)
    const [youtubeVideoId, setYoutubeVideoId] = useState(null)
    const [isEventScheduled, setIsEventScheduled] = useState(false);


    const currentDate = new Date()
    const releaseDate = new Date(item.releaseDate)


    scrollY.addListener(() => { return })
    fadeAnim.addListener(() => { return })
    fadeNav.addListener(() => { return })


    const onOpen = async () => {
        modalizeTrailerRef.current?.open()

        const response = await fetchVideoId(item.id)
        setYoutubeVideoId(response)
    }

    const openCalendarModalize = async () => {
        modalizeCalendarRef.current?.open()
    }


    const navigate = () => {


        if (route.params.targetRoute === 'Search') {
            navigation.navigate('Search')
        } else {
            navigation.navigate('Home')
        }
    };


    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: Platform.OS === 'android' ? false : true,
            listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                const opacity = 1 - offsetY / 370;
                const fadeNavStartOffset = 180;
                const opacityNav = offsetY >= fadeNavStartOffset ? (offsetY - fadeNavStartOffset) / 100 : 0;
                const theme = offsetY >= fadeNavStartOffset ? 'dark' : 'light';
                fadeAnim.setValue(opacity)
                fadeNav.setValue(opacityNav)
                setStatusBarTheme(theme)

            }
        },


    );



    useEffect(() => {
        if (releaseDate > currentDate) {
            setIsEventScheduled(true);
        }
    }, []);

    const onShare = async () => {
        try {
            const url = await Linking.getInitialURL()
            const result = await Share.share({

                message: `Tv | ${item.title} megosztása`,
                title: `${item.title}`,
                url: `${url}/${item.uri}`,

            },
                {
                    subject: `${item.title}`
                }

            );
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert('Hiba történt megosztás közben!', error);
        }
    };


    return (
        <>
            <StatusBar style={statusBarTheme} animated />

            <View style={styles.container} >

                <Animated.View style={[styles.header, { opacity: fadeNav, zIndex: 1 }]} >
                    <SelectedTopNavBar route={route} navigate={navigate} onShare={onShare} />
                </Animated.View>



                <Animated.ScrollView
                    scrollEventThrottle={16}
                    onScroll={handleScroll}
                    showsVerticalScrollIndicator={false}

                >

                    <Animated.View
                        style={[styles.imageContainer, {

                            opacity: fadeAnim,
                            transform: [
                                { translateY: scrollY.interpolate(imageTranslateYTransform) },
                                { scale: scrollY.interpolate(imageScaleTransform) }
                            ]
                        }]} >

                        <Animated.Image
                            source={{ uri: item.selectedUri ? item.selectedUri : item.uri }}
                            style={[styles.image, { opacity: fadeAnim }]}
                        />



                        <View style={styles.headerNavBar} >
                            <CustomButton title={'Lejátszás'} icon={FontAwesome} iconName={'play'} />
                            <CustomButton title={'Előzetes megtekintése'} marginTop={16} onPress={onOpen} />
                        </View>


                        <ArrowLeft color={'#FFFFFF'} size={26} onPress={navigate} style={styles.arrowLeft} />

                        <ShareComponent color={'#FFFFFF'} size={26} onPress={onShare} style={styles.share} />

                    </Animated.View>



                    <View style={styles.category}>
                        <Text style={styles.categoryText} >{item.category}</Text>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Article route={route} data={data} />
                    </View>

                    <View style={{ marginTop: 10 }}  >
                        <CustomFlatlist data={data} route={route} />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <CustomMovieInformation route={route} data={data} isEventScheduled={isEventScheduled} />
                    </View>


                    {isEventScheduled && (
                        <View style={styles.button} >
                            <Button title='Esemény felvétele a naptárba' onPress={openCalendarModalize} />
                        </View>
                    )}




                </Animated.ScrollView>

                <Modalize
                    ref={modalizeTrailerRef}
                    snapPoint={constants.selectedImageHeight}
                    modalStyle={{ backgroundColor: '#000000' }}
                    avoidKeyboardLikeIOS={true}
                >

                    <YoutubePlayer
                        height={constants.selectedImageHeight}
                         //videoId={youtubeVideoId}
                        videoId={youtubeVideoId}

                    />




                </Modalize>

                <CalendarModalize modalizeCalendarRef={modalizeCalendarRef} item={item} />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 5000
    },
    image: {
        width: constants.width,
        height: constants.imageHeight,
        resizeMode: 'stretch'
    },

    imageContainer: {
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',

    },

    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },

    category: {
        marginTop: 15,
        marginLeft: 10,
        padding: 10,
        backgroundColor: 'rgba(153,122,141,0.8)',
        width: constants.selectedCategoryWidth,
        borderRadius: 10,
        alignItems: 'flex-start'
    },

    categoryText: {
        fontSize: 13,
        fontWeight: 600,
    },

    headerNavBar: {
        position: 'absolute',
        bottom: 70,
    },

    activityIndicator: {
        marginTop: 25,

    },

    share: {
        position: 'absolute',
        top: 85,
        right: 50,
        borderRadius: 16,
        backgroundColor: "rgba(192,192,192,0.55)",
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },

    arrowLeft: {
        position: 'absolute',
        top: 80,
        left: 30,
        borderRadius: 16,
        backgroundColor: "rgba(192,192,192,0.55)",
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        marginBottom: constants.informationMarginBottom,
        alignSelf: 'center',
        width: Platform.OS === 'android' ? constants.width * 0.8 : null
    },
})