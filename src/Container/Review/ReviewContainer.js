import { connect } from 'react-redux';
import Review from './Review';
import { onReviewChange, onRatingChange, initialReview, loadCurrentReview } from './Action';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  return {
    user: state.user,
    review: state.newReview,
    loading: state.ui.addNewReviewLoading,
  }
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  onReviewChange: (text) => dispatch(onReviewChange(text)),
  onRatingChange: (rate) => dispatch(onRatingChange(rate)),
  initialReview: (data) => dispatch(initialReview(data)),
  loadCurrentReview: (id) => dispatch(loadCurrentReview(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);