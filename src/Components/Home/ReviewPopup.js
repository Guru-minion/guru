import React from 'react';
import {Image} from 'react-native';
import {
  Body,
  Button,
  Header,
  Left,
  Icon,
  Right,
  Title,
  View,
  H3,
  Text,
  Content,
  Textarea,
} from 'native-base';
import PopupDialog, {DialogTitle, DialogButton} from 'react-native-popup-dialog';
import StarRating from 'react-native-star-rating';

const IMAGE_URL = 'https://www.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/e/veembangnoinho.jpg';

const ReviewPopup = (props) => {
  const {show, onDismissed} = props;

  return (
    <PopupDialog
      width="80%"
      dialogStyle={{
        backgroundColor: '#FFFF00',
        padding: 0,
      }}
      show={show}
      onDismissed={onDismissed}
      dialogTitle={<DialogTitle title="Dialog Title"/>}
      actions={[
        <DialogButton
          align="center"
          text="Submit"
          onPress={() => {

          }}
          key="button-1"
        />,
      ]}
    >
      <Content>
        <Body>
        <Text>Rate it</Text>
        <StarRating
          starSize={18}
          disabled={false}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          maxStars={5}
          rating={0}
          selectedStar={(rating) => {
          }}
          starColor={'red'}
        />
        </Body>

        <Textarea
          rowSpan={4}
          placeholder="Enter review"
        />
        <Body>
        <Button>
          <Text>Submit</Text>
        </Button>
        </Body>
      </Content>
    </PopupDialog>
  );
};

const styles = {
  container: {
    marginHorizontal: 32,
  },

};

export default ReviewPopup;
