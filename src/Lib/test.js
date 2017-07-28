const books = {
  1 : {
    id: 1,
    title: 'sach 1',
    imageUrl: 'xzxz',
    rating: 3.5,
    reviews: [
      1 , 2, 3
    ]
  }
};

reviews = {
  1: {
    id: 1,
    userId: 1,
    content: 'abc',
    rating: 3.5,
  }
};

users = {
  1: {
    id: 1,
    name: 'vy',
    friends: [
      2,3,4,5,6,7
    ],
    activities: [
      1,2,3,4
    ]
  }
};

activities = {
  1: {
    type: 'rate',
    owner: 1,
    book: 1,
  },
  2: {
    type: 'review',
    owner: 2,
    book: 5,
    review: 1,
  }
};

react-native/Libraries/Renderer/src/renderers/native/ReactNativePropRegistry