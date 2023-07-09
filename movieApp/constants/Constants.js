import { Dimensions, Platform } from "react-native";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const imageHeightNumber = height < 680 ? 1.15 : 1.30
const barHeight = height < 680 ? 70 : 100
const videoHeight = Dimensions.get('window').width * 0.7
const imageHeight = Dimensions.get('window').width * imageHeightNumber
const headerHeight = Platform.OS === "ios" ? 84 : 90
const customImageWidth = width > 380 ? 180 : 160
const customImageHeight = width > 380 ? 100 : 90
const actorImageWidth = 80
const homeTitleWidth = Platform.OS === "ios" ? 20 : 35
const actorNameWidth = 200
const maxTitleWidth = width - customImageWidth - homeTitleWidth
const maxNameWidth = width - actorImageWidth - actorNameWidth
const headerTitleMaxLength = 15
const maxRoleLength = 40
const youtubeLink = 'api/database/videoId'
const informationMarginBottom = height > 750 ? height * 0.06 : 30
const plotLocalMaxLength = 240
const selectedImageHeight = height * 0.30
const modalizeCalendarHeight = height * 0.50
const selectedCategoryWidth = width * 0.55



export const constants = {
    width,
    videoHeight,
    headerHeight,
    customImageWidth,
    homeTitleWidth,
    maxTitleWidth,
    headerTitleMaxLength,
    imageHeight,
    actorImageWidth,
    maxNameWidth,
    height,
    youtubeLink,
    barHeight,
    customImageHeight,
    informationMarginBottom,
    plotLocalMaxLength,
    selectedImageHeight,
    selectedCategoryWidth,
    modalizeCalendarHeight,
    maxRoleLength
};
