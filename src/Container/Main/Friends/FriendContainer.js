import { connect } from 'react-redux';
import {   } from './Action';
import FriendsView from './FriendsView';

// What data from the store shall we send to the component?
const mapStateToProps = state => {
  const { users, reviews, wishlist, books } = state.entities;
  const currentUser = users[state.user.id];
  let _activities = [];
  if(currentUser.friends && currentUser.friends.length > 0){
    const friends = currentUser.friends;
    let friend, _activity;
    friends.map(item => {
      friend = users[item.id];
      if(friend && friend.activities && friend.activities.length > 0){
        friend.activities.map(activity => {
          if(activity.type === 'review'){
            _activity = reviews[activity.id];
            _activity.type = 'review';
          }else if(activity.type === 'wishlist'){
            _activity = wishlist[activity.id];
            _activity.type = 'wishlist';
          }
          //add user info
          _activity.user = friend;
          _activity.book = books[_activity.bookId];
          _activities.push(_activity);
        });
      }
    });
  }
  return {
    user: currentUser,
    activities: _activities,
  }
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsView);