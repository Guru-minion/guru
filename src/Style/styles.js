import colors from './colors';
import fonts from './fonts';
import sizes from './sizes';

const app = {
  container: {
    flex: 1,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  verticalCenterContainer: {
    flex: 1,
    alignItems: 'center',
  },
  horizontalCenterContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    primary: {
      color: colors.colorPrimaryText,
      fontSize: fonts.normal,
    },
    secondary: {
      color: colors.colorSecondaryText,
      fontSize: fonts.small,
    }
  }
};


export default {
  ...app,
};