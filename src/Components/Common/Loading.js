import React from 'react';
import {
  Container,
  View,
  Spinner,
  Text,
} from 'native-base';
import { AppColors } from '@style/index';

const Loading = (props) => {
  const { quote, author } = props;

  return (
    <Container style={styles.container}>
      <Spinner color={AppColors.colorPrimary} />
      <View>
        <Text style={styles.quote}>{quote}</Text>
        <Text style={styles.author}>{`-${author}`}</Text>
      </View>
    </Container>
  );
};

Loading.defaultProps = {
  quote: 'No two persons ever read the same book.',
  author: 'Edmund Wilson',
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quote: {
    fontFamily: 'Roboto_medium',
    fontSize: 16,
    color: AppColors.colorPrimaryText,
    textAlign: 'center',
  },
  author: {
    fontSize: 14,
    color: AppColors.colorSecondaryText,
    alignSelf: 'flex-end',
  }
};

export default Loading;
