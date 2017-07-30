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
import { AppColors } from '@style/index';
import { NavigationActions } from 'react-navigation';
import Starbar from '../../Components/Common/Starbar';
import { reviewLoadingVisibility } from '../../Redux/UIs/Action';

export default class Review extends Component {

  constructor(props){
    super(props);
    this.state = {
      review: '',
    };
  }

  componentDidMount = () => {
    const { user, navigation, initialReview, loadCurrentReview } = this.props;
    const params = navigation.state.params;
    if(params.reviewId){
      loadCurrentReview(params.reviewId);
    }else {
      initialReview({
        id: null,
        userId: user.id,
        bookId: params.bookId,
        review: '',
        rating: 0,
      })
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { review : { userId, bookId }, navigation, loading } = nextProps;
    if(!userId && !bookId && loading){
      navigation.dispatch(reviewLoadingVisibility(false));
      navigation.dispatch(NavigationActions.back());
    }
  };

  _onChangeText = (text) => {
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
      <Content style={{backgroundColor: '#FFF',}}>
        <CardItem padder style={{height: 72, flexDirection: 'row',}}>
          <Left style={{flexDirection: 'row'}}>
            <Thumbnail
              defaultSource={require('../../Assets/Images/avatar_holder.png')}
              source={{uri: user.avatar}} />
            <Body>
            <Text>{user.name ? user.name : 'Anonymous'}</Text>
            <Text note>{user.email}</Text>
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
          <Text style={{color: AppColors.colorPrimary}}>{params.title}</Text>
        </CardItem>

        <CardItem>
            <Textarea
              value={review.review}
              style={{ flex: 1, paddingLeft: 0,}}
              autoFocus={false}
              onChangeText={this._onChangeText}
              returnKeyType="done"
              placeholder="Enter your review"
            />
        </CardItem>

      </Content>
    );
  }
}

