import React, {Component} from 'react';
import {Image, Dimensions} from 'react-native';
import {
  Body,
  Container,
  Button,
  Header,
  Left,
  Icon,
  Right,
  Title,
  H3,
  Text,
  Card,
  CardItem,
  View,
  Thumbnail,
  Item,
} from 'native-base';
import Starbar from '../../../Components/Common/Starbar';
import ButtonGroup from '../../../Components/Home/ButtonGroup';
const {width, height} = Dimensions.get('window');
//style
import { AppColors } from '@style/index';

const IMAGE_URL = 'https://www.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/e/veembangnoinho.jpg';

export default class BookView extends Component {

  constructor(props) {
    super(props);
    this.index = 0;
    this.state = {
      books: [],
      showPopup: false,
    }
  }

  componentDidMount = () => {
  };

  componentWillReceiveProps = (nextProps) => {

  };

  _writeReview = (id, title) => {
    this.props.navigation.navigate('NewReview', {}, {
      type: "Navigate",
      routeName: 'NewReviewNavigator',
      params: {
        id,
        title,
      },
    });
  };

  _addToWishlist = (id, liked) => {
    const { addToWishlist, userId } = this.props;
    if(liked){
      alert('implement unlike feature');
    }else {
      addToWishlist({
        bookId: id,
        userId,
      })
    }
  };

  _onItemClick = (item) => {
    this.props.navigation.navigate('Book', {}, {
      type: "Navigate",
      routeName: 'BookNavigator',
      params: item,
    });
  };

  _getBiggerImage = () => `${this.props.imageLinks.thumbnail}&zoom=7`;

  render() {
    console.log('[BookView.js] render', this.props);
    if(!this.props.id){
      return null;
    }
    const {id, userId, title, authors, averageRating = 0, reviews = [], wishlist = [] } = this.props;

    const reviewed = () => {
      for(let i = 0; i < reviews.length; i++){
        if(reviews[i].userId === userId){
          return true;
        }
      }
      return false;
    };

    const addedToWishlish = () => {
      for(let i = 0; i < wishlist.length; i++){
        if(wishlist[i].userId === userId){
          return true;
        }
      }
      return false;
    };


    return (
      <Container>
        <Card style={styles.card}>
          <CardItem
            onPress={() => this._onItemClick({id, title})}
            button
            cardBody>
            <Image
              source={{uri: this._getBiggerImage()}}
              style={styles.photo}
            />
          </CardItem>
          <View style={styles.meta}>
            <View style={{flex: 3}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.author}>{`by ${authors[0]}`}</Text>
              <Item style={styles.ratingWrapper}>
                <Starbar size={20} rating={averageRating}/>
                <Text>{` ${averageRating}k`}</Text>
              </Item>
            </View>
            <View style={{flex: 2}}>
              <Item style={{ borderBottomColor: 'transparent', marginTop: 8}}>
                <Icon active name="chatbubbles" style={styles.icon}/>
                <Text style={{color: AppColors.colorPrimary}}>{reviews.length}</Text>
              </Item>
              <Item style={{ borderBottomColor: 'transparent', marginTop: 8}}>
                <Icon active name="heart" style={styles.icon}/>
                <Text style={{color: AppColors.colorPrimary}}>{wishlist.length}</Text>
              </Item>

            </View>
          </View>
        </Card>

        <ButtonGroup
          liked={addedToWishlish()}
          reviewed={reviewed()}
          writeReview={() => this._writeReview(id, title)}
          addToWishlist={() => this._addToWishlist(id, addedToWishlish())}
        />
      </Container>
    );
  }
}

const styles = {
  card: {
    width: width - 32,
    elevation: 3,
    paddingHorizontal: 8,
  },
  photo: {
    flex: 1,
    width: width - 48,
    height: 350,
  },
  info: {
    flex: 1,
  },
  meta: {
    padding: 8,
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: AppColors.colorPrimaryText,
    fontWeight: '800',
  },
  author: {
    fontSize: 12,
    color: AppColors.colorSecondaryText,
    marginTop: 4,
  },
  ratingWrapper:{
    padding: 0,
    borderBottomColor: 'transparent',
    marginTop: 8,
  },
  icon: {
    color: AppColors.colorPrimary,
    fontSize: 20,
  }
};
