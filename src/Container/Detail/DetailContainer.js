import { connect } from 'react-redux';
import DetailView from './DetailView';
import { loadBookById } from './Action';

// What data from the store shall we send to the component?
const mapStateToProps = (state, ownProps) => {
  const {reviews, users } = state.entities;
  let bookInfo = null;
  const bookDetail = state.book;
  const navigation = ownProps.navigation;
  const id = navigation.state.params.id;
  console.log('[DetailContainer.js] mapStateToProps', id);
  if(bookDetail.hasOwnProperty(id)){
    bookInfo = bookDetail[id];
  }
  //load reviews
  let _reviews = [];
  if(bookInfo && bookInfo.reviews && reviews && users){
    bookInfo.reviews.map(rev => {
      if(reviews.hasOwnProperty(rev.id)){
        let review = reviews[rev.id];
        if(users.hasOwnProperty(review.userId)){
          review.user = users[review.userId];
        }
        _reviews.push(review);
      }
    });
  }

  return {
    user: state.login,
    loading: bookDetail.loading,
    error: bookDetail.error,
    book: bookInfo,
    reviews: _reviews,
  }
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  loadBookById: (id) => dispatch(loadBookById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);