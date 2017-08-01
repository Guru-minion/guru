import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  List,
  Spinner,
  ListItem,
  Item,
  Body,
  Text,
  Icon,
  Button,
} from 'native-base';
import BookInfo from '../../Components/Book/Info';
import ReviewItem from '../../Components/Book/ReviewItem';
import MyReview from '../../Components/Book/MyReview';
import RelatedBook from '../../Components/Book/RelatedBook';
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
        return (
          <Item style={{ borderBottomColor: 'transparent'}}>
            <Body>
              <Icon name="sad" />
              <Text style={styles.noReview}>No review yet.</Text>
              <Button transparent style={{ alignSelf: 'center'}}>
                <Text>Tap to write a review</Text>
                <Icon name="chatbubbles" />
              </Button>
            </Body>
          </Item>
        );
      }else {
        return (
          <List style={{ marginTop: 16}}>
            <ListItem itemHeader first style={styles.item}>
              <Text style={{ fontWeight: 'bold'}}>Other reviews</Text>
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
         return (
           <Item style={{ borderBottomColor: 'transparent'}}>
             <Body>
             <Icon name="sad" />
             <Text style={styles.noReview}>You haven't reviewed yet.</Text>
             <Button transparent style={{ alignSelf: 'center'}}>
               <Text>Tap to write a review</Text>
               <Icon name="chatbubbles" />
             </Button>
             </Body>
           </Item>
         );
      }
    }
  };

  render() {
    const {loading, book } = this.props;
    if (loading || !book) {
      return (<Spinner color='blue'/>);
    }

    return (
      <Container>
        <Content style={styles.container}>
          <BookInfo
            {...book}
          />

          {
            this.renderYourReview()
          }

          <RelatedBook
            related={book.relateds}
          />

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
    marginBottom: 40,
  },
  noReview: {
    color: AppColors.colorSecondaryText,
  },
  item: {
    borderBottomColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: AppColors.divider,
    paddingHorizontal: 16,
  }
};
