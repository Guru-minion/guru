import {connect} from 'react-redux';
import BookView from './BookView';
import {loadListBooks, addToWishlist} from './Action';

// What data from the store shall we send to the component?
const mapStateToProps = (state, ownProps) => {
  const { books } = state.entities;
  const bookId = ownProps.bookId;
  let book = books[bookId];

  return {
    ...book,
    userId: state.login.id,
  }
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  loadListBooks: () => dispatch(loadListBooks()),
  addToWishlist: (payload) => dispatch(addToWishlist(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookView);