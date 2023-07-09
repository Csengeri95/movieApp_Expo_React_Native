import { Video, ResizeMode } from 'expo-av';
import { StyleSheet } from 'react-native';
import { constants } from "../constants/Constants"
import PosterImage from '../assets/logo_800.png';
import { MOVIE_LINK } from '@env'

export default function VideoComponent({ video, handlePlaybackStatusUpdate }) {

    return (
        <Video
            ref={video}
            style={styles.video}
            source={{
                uri: MOVIE_LINK,
            }}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            usePoster
            posterSource={PosterImage}
            posterStyle={styles.poster}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
    )
}

const styles = StyleSheet.create({

    video: {
        width: constants.width,
        height: constants.videoHeight,
    },
    poster: {
        width: constants.width,
        height: constants.videoHeight,
        resizeMode: 'cover'
    },
})