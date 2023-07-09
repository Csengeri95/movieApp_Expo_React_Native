import { useRef, useState, useEffect } from "react"
import { View, StyleSheet, Animated, ActivityIndicator, Alert } from "react-native"
import Article from "../components/Article"
import TopNavBar from "../components/TopNavBar"
import VideoComponent from "../components/VideoComponent"
import { constants } from "../constants/Constants"
import HeaderNavbar from "../components/HeaderNavbar"
import { StatusBar } from 'expo-status-bar';
import CustomSectionList from "../components/CustomSectionList"
import { videoTranslateYTransform, videoScaleTransform } from '../constants/Transform'
import { fetchData } from "../constants/ApiCallings"

export default function Home() {
    const [statusBarTheme, setStatusBarTheme] = useState('light')

    const scrollY = useRef(new Animated.Value(0)).current
    const [fadeAnim] = useState(new Animated.Value(1))
    const [fadeNav] = useState(new Animated.Value(0))

    scrollY.addListener(() => { return })
    fadeAnim.addListener(() => { return })
    fadeNav.addListener(() => { return })

    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [showPoster, setShowPoster] = useState(false);
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const handlePlaybackStatusUpdate = (newStatus) => {
        setStatus(newStatus)

        if (newStatus.isPlaying) {
            setShowPoster(true)
        }
    }


    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: Platform.OS === 'android' ? false : true,
            listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                const opacity = 1 - offsetY / 170;
                const fadeNavStartOffset = 40;
                const opacityNav = offsetY >= fadeNavStartOffset ? (offsetY - fadeNavStartOffset) / 100 : 0;
                const theme = offsetY >= fadeNavStartOffset ? 'dark' : 'light';
                fadeAnim.setValue(opacity)
                fadeNav.setValue(opacityNav)
                setStatusBarTheme(theme)
            }
        },
    );




    useEffect(() => {

        const getData = async () => {
            const response = await fetchData();

            if (response) {
                setData(response)
                setLoading(false)
            }
        }

        getData()

    }, [])




    return (
        <>
            <StatusBar style={statusBarTheme} animated />
            <View style={styles.container}>

                <Animated.View style={[styles.header, { opacity: fadeNav, zIndex: 1 }]} >

                    <TopNavBar title={'Filmek'} />

                </Animated.View>

                <Animated.ScrollView
                    scrollEventThrottle={16}
                    onScroll={handleScroll}
                >

                    <Animated.View style={[styles.imageContainer, {
                        opacity: fadeAnim,
                        height: constants.videoHeight,
                        transform: [
                            {
                                translateY: scrollY.interpolate(videoTranslateYTransform)
                            },

                            {
                                scale: scrollY.interpolate(videoScaleTransform)
                            },


                        ]
                    }]}>
                        <VideoComponent
                            video={video}
                            handlePlaybackStatusUpdate={handlePlaybackStatusUpdate}
                        />

                        {showPoster &&
                            <View style={styles.headerNavBar}>
                                <HeaderNavbar />
                            </View>
                        }


                    </Animated.View>


                    {loading ?
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator />
                        </View>
                        :
                        <Animated.View>

                            <CustomSectionList data={data} />

                        </Animated.View>
                    }





                </Animated.ScrollView>


            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    imageContainer: {
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },

    text: {
        marginTop: 25,
    },

    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },

    headerNavBar: {
        position: 'absolute',
        bottom: 10,

    },

    activityIndicator: {
        marginTop: 25,
    },


})