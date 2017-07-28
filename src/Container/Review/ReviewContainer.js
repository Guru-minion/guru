import { connect } from 'react-redux';
import Review from './Review';
import { onReviewChange, onRatingChange, initialReview } from './Action';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  return {
    user: state.login,
    review: state.newReview,
    loading: state.ui.addNewReviewLoading,
  }
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  onReviewChange: (text) => dispatch(onReviewChange(text)),
  onRatingChange: (rate) => dispatch(onRatingChange(rate)),
  initialReview: (data) => dispatch(initialReview(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);