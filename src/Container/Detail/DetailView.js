import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  List,
  Spinner,
  ListItem,
  Text,
} from 'native-base';
import BookInfo from '../../Components/Book/Info';
import ReviewItem from '../../Components/Book/ReviewItem';
import MyReview from '../../Components/Book/MyReview';
//style
import { AppColors } from '@style/index';

export default class DetailView extends Component {

  state = {};

  componentDidMount = () => {
    const {loadBookById, loading, navigation} = this.props;
    if (!loading) {
      const id = navigation.state.params.id;
      loadBookById(id);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { book } = nextProps;
    if(!this.props.book && book){
      //book loaded, load reviews

    }
  };

  _goToProfile = (user) => {
    const { navigation } = this.props;
    if(this.props.user.id === user.id){
      navigation.navigate('Profile')
    }else {
      navigation.navigate('UserProfile', {}, {
        type: "Navigate",
        routeName: 'UserProfileNavigator',
        params: {
          userId: user.id,
          name: user.name,
          email: user.email,
        },
      });
    }

  };

  renderReview = () => {
    const {loading, reviews, user} = this.props;

    if(!loading){
      if(reviews.length === 0){
        //todo render no review
        return (
          <View>
            <Text>No review</Text>
          </View>
        )
      }else {
        return (
          <List style={{ marginTop: 16}}>
            <ListItem itemHeader first>
              <Text>Reviews</Text>
            </ListItem>
            {
              reviews.map(review => {
                if(review.userId !== user.id){
                  return (<ReviewItem key={review.id}
                                      goToProfile={this._goToProfile}
                                      {...review} />)
                }else {
                  return null;
                }
              })
            }
          </List>
        )
      }
    }else {
      return null;
    }
  };

  renderYourReview = () => {
    const {loading, reviews, user} = this.props;
    if(!loading && reviews.length > 0){
      const myReview = reviews.filter((review) => review.userId === user.id);
      if(myReview && myReview.length > 0){
        return (
          <MyReview
            goToProfile={this._goToProfile}
            review={myReview[0]}
          />
        );
      }else {
        //todo render ban chua review, hay~ review cho sach
         return null;
      }
    }
  };

  render() {
    const {loading, book } = this.props;
    if (loading || !book) {
      return (<Spinner color='blue'/>);
    }

    return (
      <Container style={styles.container}>
        <Content>
          <BookInfo
            {...book}
          />

          {
            this.renderYourReview()
          }

          {
            this.renderReview()
          }
        </Content>
      </Container>
    );

  }
}

const styles = {
  container: {
    backgroundColor: '#FFF',
  },
};
