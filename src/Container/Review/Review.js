import React, {Component} from 'react';
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Title,
  Body,
  Right,
  Text,
  Thumbnail,
  CardItem,
  Textarea,
  Toast,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import Starbar from '../../Components/Common/Starbar';
import { reviewLoadingVisibility } from '../../Redux/UIs/Action';
import firebase from '../../Lib/firebase';

export default class Review extends Component {

  constructor(props){
    super(props);
    this.state = {
      review: '',
    };
  }

  componentDidMount = () => {
    const { user, navigation, initialReview } = this.props;
    const bookId = navigation.state.params.id;
    initialReview({
      userId: user.id,
      bookId,
    })
  };

  componentWillReceiveProps = (nextProps) => {
    const { review : { userId, bookId }, navigation, loading } = nextProps;
    if(!userId && !bookId && loading){
      navigation.dispatch(reviewLoadingVisibility(false));
      navigation.dispatch(NavigationActions.back());
    }
  };

  _onChangeText = (text) => {
    //this.setState({review: text});
    const { onReviewChange } = this.props;
    onReviewChange(text);
  };

  _onRate = (rating) => {
    const { onRatingChange } = this.props;
    onRatingChange(rating);
  };

  render() {
    const { user, navigation, review } = this.props;
    const params = navigation.state.params;

    return (
      <Content>
        <CardItem padder style={{height: 72, flexDirection: 'row',}}>
          <Left style={{flexDirection: 'row'}}>
            <Thumbnail source={{uri: 'https://pbs.twimg.com/profile_images/606153962501185536/paUxFpAn_bigger.jpg'}} />
            <Body>
            <Text>{user.name ? user.name : 'Anonymous'}</Text>
            <Text note>{`@${user.email}`}</Text>
            </Body>
          </Left>
        </CardItem>

        <CardItem>
          <Left/>
          <Body>
          <Text>Rate it !</Text>
          <Starbar size={32}
                   onRate={this._onRate}
                   rating={review.rating} />
          </Body>
          <Right/>
        </CardItem>

        <CardItem style={{flexDirection: 'row'}}>
          <Text>Review to </Text>
          <Text style={{color: '#138BF2'}}>{params.title}</Text>
        </CardItem>

        <CardItem>
            <Textarea
              value={review.review}
              style={{ flex: 1, paddingLeft: 0,}}
              autoFocus
              onChangeText={this._onChangeText}
              placeholder="Enter your review"
            />
        </CardItem>

      </Content>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 56,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
};
