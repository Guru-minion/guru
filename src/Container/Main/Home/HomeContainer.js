import {connect} from 'react-redux';
import HomeView from './HomeView';
import {loadListBooks, addToWishlist } from './Action';
import { updateItem } from '../../../Redux/Action';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  const {books, reviews } = state.entities;
  const {loading, data, error} = state.books;
  //let _books = [];
  //let _book;
  /*if (books && data.length > 0) {
    data.map(id => {
      if (books.hasOwnProperty(id)) {
        _book = books[id];
        if(!_book.reviews){
          _book.reviews = [];
        }
        if(!_book.wishlist){
          _book.wishlist = [];
        }
        _books.push(_book);
      }
    });
  }*/

  return {
    loading,
    error,
    books: data,
    user: state.login,
    reload: state.ui.reloadBook,
  };
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  loadListBooks: (flag) => dispatch(loadListBooks(flag)),
  addToWishlist: (payload) => dispatch(addToWishlist(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);