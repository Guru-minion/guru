import React, {Component} from 'react';
import {
  Container, View, Content,
  DeckSwiper, Spinner, Card, CardItem, Thumbnail,
  Text, Left, Body, Icon
} from 'native-base';
import SwipeCards from 'react-native-swipe-cards';
import BookItem from './BookContainer';
//style
import { AppColors } from '@style/index';

export default class HomeView extends Component {

  constructor(props) {
    super(props);
    this.index = 0;
    this.state = {
      books: [],
      showPopup: false,
    }
  }

  componentDidMount = () => {
    const {books: {loading}, loadListBooks} = this.props;
    if (!loading) {
      loadListBooks();
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { reload, loadListBooks } = nextProps;
    if(reload && !this.props.reload){
      //oadListBooks(true);
    }
  };

  _renderItem = (item) => {
    return (<BookItem
      navigation={this.props.navigation}
      bookId={item}/>);
  };

  handleYup = () => {
  };

  handleNope = () => {
  };

  render() {
    console.log('[HomeView.js] render');
    const {loading, books} = this.props;
    if (loading) {
      return (<Spinner color={AppColors.colorPrimary}/>);
    }
    return (
      <Container>
        <SwipeCards
          cards={books ? books : []}
          renderCard={this._renderItem}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
        />
      </Container>
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
  swipeCards: {
    flex: 1,
  },
};
