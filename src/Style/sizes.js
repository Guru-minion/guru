import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

const screen = {
  height: screenHeight,
  width: screenWidth,

  widthHalf: screenWidth * 0.5,
  widthThird: screenWidth * 0.333,
  widthTwoThirds: screenWidth * 0.666,
  widthQuarter: screenWidth * 0.25,
  widthThreeQuarters: screenWidth * 0.75,
};

const app = {
  spacingExtra: 80,
  spacingHuge: 64,
  spacingLarge: 32,
  spacingNormal: 16,
  spacingSmall: 8,
  spacingTiny: 4,
};

const eventList = {
  thumbnailHeight: 160,
  paddingHorizontal: 16,
};

const eventDetail = {
  bannerHeight: 200,
  eventItemHeight: 108,
  mapFooter: 80,
};

export default {
  ...screen,
  ...app,
  eventList,
  eventDetail,
}