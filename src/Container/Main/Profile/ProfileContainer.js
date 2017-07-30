import { connect } from 'react-redux';
import ProfileView from './ProfileView';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  const { reviews, wishlist, books, users } = state.entities;
  const user = users[state.user.id];
  let _activities = [];
  if(user.activities){
    user.activities.map(item => {
      if(item.type === 'review'){
        item = {
          ...item,
          ...reviews[item.id],
        };
        item.book = books[item.bookId];
      }else if(item.type === 'wishlist'){
        item = {
          ...item,
          ...wishlist[item.id],
        };
        item.book = books[item.bookId];
      }
      _activities.push(item)
    })
  }

  console.log('[ProfileContainer.js] xxxxx', _activities);

  return {
    user,
    activities: _activities
  }
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);