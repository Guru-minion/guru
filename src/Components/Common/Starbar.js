import React from 'react';
import {
  Body,
  Button,
  Header,
  Left,
  Icon,
  Right,
  Title,
} from 'native-base';
import StarRating from 'react-native-star-rating';

const Starbar = (props) => {
  const { size, rating, onRate } = props;
  return (
    <StarRating
      starSize={size}
      disabled={false}
      emptyStar={'ios-star-outline'}
      fullStar={'ios-star'}
      halfStar={'ios-star-half'}
      iconSet={'Ionicons'}
      maxStars={5}
      rating={rating}
      selectedStar={onRate}
      starColor={'#FFC60B'}
    />
  );
};

export default Starbar;
