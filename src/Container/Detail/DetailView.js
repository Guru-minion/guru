import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  List,
  Spinner,
} from 'native-base';
import BookInfo from '../../Components/Book/Info';
import ReviewItem from '../../Components/Book/ReviewItem';
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

  render() {
    const {loading, book, reviews} = this.props;
    if (loading || !book) {
      return (<Spinner color='blue'/>);
    }

    return (
      <Container style={styles.container}>
        <Content>
          <BookInfo
            {...book}
          />

          <List>
            {
              reviews.map(review => (<ReviewItem key={review.id} {...review} />))
            }
          </List>
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
