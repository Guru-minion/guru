import * as firebase from 'firebase';
import {parseString} from 'react-native-xml2js';
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
        throw new Error();
      }
    })
    .then(response => {
      return response.json();
    })
    .then(bookResponse => {
      const books = bookResponse.items;
      let relatedUrl = 'https://www.googleapis.com/books/v1/volumes?&key=AIzaSyDxVtl-VS4lr22NprX_4VdQOQ5kqzUvq1U&maxResults=40';
      books.map(item => {
        const author = item.volumeInfo.authors[0];
        fetch(`${relatedUrl}&q=${author}`)
          .then(res => res.json())
          .then(response => {
            let book = {
              id: item.id,
              ...item.volumeInfo,
            };
            book.relateds = [];
            const relatedItems = response.items;
            if(relatedItems && relatedItems.length > 0){
              relatedItems.map(item1 => {
                book.relateds.push({
                  id: item1.id,
                  title: item1.volumeInfo.title,
                  imageLinks: item1.volumeInfo.imageLinks ? item1.volumeInfo.imageLinks : [],
                });

                ref.child(item.id).set(book);
              })
            }else {
              ref.child(item.id).set(book);
            }
          })
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

firebase.uploadImage = (base64, url) => {
  console.log('[firebase.js] uploadImage', base64);
  const storageRef = firebase.storage().ref();
  const metadata = {
    contentType: 'image/jpeg',
  };
  const ext = url.substring(url.lastIndexOf('.'), url.length);
  const fileName = uuidv4() + ext;
  const ref = storageRef.child(fileName);
  return ref.putString(base64, 'base64', metadata)
    .then(function (snapshot) {
      console.log('Uploaded a base64 string!', snapshot);
      return Promise.resolve(snapshot.downloadURL);
    });
};

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

firebase.updateUserInfo = (id, info) => {
  return firebase.database().ref('users').child(id)
    .once('value')
    .then(snapshot => {
      let user = snapshot.val();
      user = {
        ...user,
        ...info,
      };
      console.log('[xxxxx] ', user);
      return firebase.database().ref('users').child(id).update(user);
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
  if (params.id) {
    return firebase.database().ref('reviews').child(params.id)
      .update(params)
      .then(() => Promise.resolve('success'))
  } else {
    const reviewRef = firebase.database().ref('reviews');
    const key = reviewRef.push().key;
    const createdAt = new Date().getTime();
    params.id = key;
    params.createdAt = createdAt;
    reviewRef.child(key).set(params);
    return firebase.database().ref('reviews').child(key)
      .once('child_added')
      .then(() => {
        let promises = [];

        promises.push(
          firebase.database().ref('users').child(params.userId)
            .once('value')
            .then(snapshot => {
              const user = snapshot.val();
              //update reviews
              if (!user.reviews) {
                user.reviews = [];
              }
              user.reviews.push({
                id: key,
                bookId: params.bookId,
              });
              //update activities
              if (!user.activities) {
                user.activities = [];
              }
              user.activities.unshift({
                id: key,
                type: 'review',
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
              if (!book.reviews) {
                book.reviews = [];
              }
              book.reviews.push({
                id: key,
                userId: params.userId,
              });
              return firebase.database().ref('books').child(params.bookId)
                .update(book);
            })
        );

        return Promise.all(promises);
      });
  }
};

//add to wishlist
firebase.addToWishlist = (params) => {
  const wishlistRef = firebase.database().ref('wishlist');
  const key = wishlistRef.push().key;
  const createdAt = new Date().getTime();
  params.id = key;
  params.createdAt = createdAt;
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
            //update wishlish
            if (!user.wishlist) {
              user.wishlist = [];
            }
            user.wishlist.push({
              id: key,
              bookId: params.bookId,
            });
            //update activities
            if (!user.activities) {
              user.activities = [];
            }
            user.activities.unshift({
              id: key,
              type: 'wishlist',
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
            if (!book.wishlist) {
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

//add friend
firebase.follow = (currentUserId, userInfo) => {
  return firebase.database().ref('users').child(currentUserId)
    .once('value')
    .then(snapshot => {
      const currentUser = snapshot.val();
      if(!currentUser.friends){
        currentUser.friends = [];
      }
      currentUser.friends.push(userInfo);
      return firebase.database().ref('users').child(currentUserId).update(currentUser);
    })
};

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