import { constants } from './Constants';


export const videoTranslateYTransform = {
    inputRange: [-constants.videoHeight, 0, constants.videoHeight],
    outputRange: [-constants.videoHeight / 2, 0, constants.headerHeight * 0.75],
    extrapolate: 'clamp'
};

export const videoScaleTransform = {
    inputRange: [-constants.videoHeight, 5, constants.videoHeight, constants.videoHeight],
    outputRange: [3, 1, 1, 3]
};



export const imageTranslateYTransform = {
    inputRange: [-constants.imageHeight, 0, constants.imageHeight],
    outputRange: [-constants.imageHeight / 2, 0, constants.headerHeight * 0.75],
    extrapolate: 'clamp'
};

export const imageScaleTransform = {
    inputRange: [-constants.imageHeight, 5, constants.imageHeight, constants.imageHeight],
    outputRange: [3, 1, 1, 3]
};