import * as firebase from 'firebase';
import {get, set} from './storage';

const config = {
  apiKey: "AIzaSyDHOZk_tADJSgWecEw_RS8X9c55hu0rL1c",
  authDomain: "react-firebase-ebcf7.firebaseapp.com",
  databaseURL: "https://react-firebase-ebcf7.firebaseio.com",
  projectId: "react-firebase-ebcf7",
  storageBucket: "react-firebase-ebcf7.appspot.com",
  messagingSenderId: "101790074065"
};
firebase.initializeApp(config);

firebase.initializeData = () => {
  const ref = firebase.database().ref('books');
  ref.once('value')
    .then(snapshot => {
      if (!snapshot.val()) {
        console.log('INITIALIZE DATA FOR APPLICATION ');
        return fetch('https://www.googleapis.com/books/v1/volumes?q=a&key=AIzaSyDxVtl-VS4lr22NprX_4VdQOQ5kqzUvq1U&maxResults=40');
      } else {
        console.log('APPLICATION HAVING DATA FROM FIREBASE');
        return null;
      }
    })
    .then(response => response.json())
    .then(books => {
      books.items.map(item => {
        const book = {
          id: item.id,
          ...item.volumeInfo,
        };
        ref.child(item.id).set(book);
      });

    })
    .catch(error => console.log('[firebase.js] initializeData ', error))
};

firebase.register = ({email, password}) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(firebaseUser => {
      firebaseUser.providerData.forEach((data) => {
        const user = {
          id: firebaseUser.uid,
          ...data
        };
        return firebase.database().ref('users').child(user.id).set(user);
      });
    })
};

firebase.signInWithEmailAndPassword = ({email, password}) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
};

firebase.getUserInfo = (id) => firebase.database().ref('users').child(id)
  .once('value');

firebase.getReviewById = (id) =>
  firebase.database().ref('reviews').child(id)
    .once('value');

firebase._getReviewById = (id) =>
  firebase.database().ref('reviews').child(id)
    .once('value')
    .then(snapshot => {
      return Promise.resolve(snapshot.val());
    });

firebase.getReviewsOfBook = (book) => {
  const reviews = book.reviews;
  let promises = [];

  Object.keys(reviews).map(function (key) {
    promises.push(firebase._getReviewById(reviews[key]));
  });

  return Promise.all(promises);
};

// firebase.getBookById = (id) => {
//   let book;
//   return firebase.database().ref('books')
//     .child(id).once('value')
//     .then(snapshot => {
//       book = snapshot.val();
//       if (book.reviews && book.reviews.length > 0) {
//         return firebase.getReviewsOfBook(book);
//       } else {
//         return Promise.resolve([]);
//       }
//     })
//     .then(reviews => {
//       book.reviews = reviews;
//       return Promise.resolve(book);
//     })
// };

firebase._getBookById = (id) => {
  return firebase.database().ref('books')
    .child(id).once('value');
};

firebase._testGetBookById = (id) => {
  return firebase.database().ref('books')
    .child(id).once('value')
    .then(snapshot => Promise.resolve(snapshot.val()));
};

firebase.getListBooks = () =>
  firebase.database().ref('books').once('value');

firebase.addReview = (params) => {
  if(params.id){
    return firebase.database().ref('reviews').child(params.id)
      .update(params)
      .then(() => Promise.resolve('success'))
  }else {
    const reviewRef = firebase.database().ref('reviews');
    const key = reviewRef.push().key;
    params.id = key;
    reviewRef.child(key).set(params);
    return firebase.database().ref('reviews').child(key)
      .once('child_added')
      .then(() => {
        return firebase._getBookById(params.bookId);
      })
      .then(snapshot => {
        const book = snapshot.val();
        if (!book.reviews) {
          book.reviews = [];
        }
        book.reviews.push({
          id: key,
          userId: params.userId
        });
        return firebase.database().ref('books').child(params.bookId).update(book);
      })
      .then(() => {
        return Promise.resolve('success');
      })
  }
};

//add to wishlist
firebase.addToWishlist = (params) => {
  const wishlistRef = firebase.database().ref('wishlist');
  const key = wishlistRef.push().key;
  params.id = key;
  wishlistRef.child(key).set(params);
  return firebase.database().ref('wishlist').child(key)
    .once('child_added')
    .then(() => {
      let promises = [];

      promises.push(
        firebase.database().ref('users').child(params.userId)
          .once('value')
          .then(snapshot => {
            const user = snapshot.val();
            if(!user.wishlist){
              user.wishlist = [];
            }
            user.wishlist.push({
              id: key,
              bookId: params.bookId,
            });
            return firebase.database().ref('users').child(params.userId)
              .update(user);
          })
      );

      promises.push(
        firebase.database().ref('books').child(params.bookId)
          .once('value')
          .then(snapshot => {
            const book = snapshot.val();
            if(!book.wishlist){
              book.wishlist = [];
            }
            book.wishlist.push({
              id: key,
              userId: params.userId,
            });
            return firebase.database().ref('books').child(params.bookId)
              .update(book);
          })
      );

      return Promise.all(promises);
    });
};

// firebase.getListBooks = () => {
//   const ref = firebase.database().ref('books');
//   return ref.once('value')
//     .then(snapshot => {
//       let promises = [];
//       const books = snapshot.val();
//       let book;
//       for (let id in books) {
//         if (books.hasOwnProperty(id)) {
//           book = books[id];
//           promises.push(firebase.getReviewsOfBook(book));
//           promises.push(Promise.resolve(book));
//         }
//       }
//       return Promise.all(promises);
//     });
// };

firebase.onReviewAdded = (cb) => {
  firebase.database().ref('reviews').on('child_added', cb);
};

firebase.onBooksChanged = (cb) => {
  firebase.database().ref('books').on('value', cb);
};

firebase.updateReviewOfBook = (review) => {
  firebase.database().ref('books').child(review.bookId)
    .once('value')
    .then(snapshot => {
      const book = snapshot.val();
      if (!book.reviews) {
        book.reviews = [];
      }
      book.reviews.push({
        id: review.id,
        userId: review.userId,
      });
      firebase.database().ref('books').child(review.bookId).update(book);
    })
};

export default firebase;