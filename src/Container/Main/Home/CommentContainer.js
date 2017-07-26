import { connect } from 'react-redux';
import { addComment } from './Action';
// What data from the store shall we send to the component?
const mapStateToProps = state => {
  const entities = state.entities;
  const home = state.home;
  let comments = [];

  if(entities['books']){
    const bookEntities = entities['books'];
    for (let id in bookEntities) {
      if (bookEntities.hasOwnProperty(id)) {
        books.push(bookEntities[id]);
      }
    }
  }

  return {
    loading: home.books.loading,
    books,
  };
};

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
  loadListBooks: (data) => dispatch(loadListBooks(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
