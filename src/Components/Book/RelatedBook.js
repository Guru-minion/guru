import React from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Content,
  Header,
  Body,
  Icon,
  List, ListItem, Text, Thumbnail
} from 'native-base';
import { AppColors } from '@style/index';

const RelatedBook = (props) => {

  const { related } = props;

  const getBiggerImage = (url) => `${url}&zoom=7`;

  if(!related || related.length === 0){
    return (
      <List>
        <ListItem itemHeader first style={styles.item}>
          <Text style={styles.related}>Related books</Text>
        </ListItem>
        <ListItem style={{ borderBottomColor: 'transparent'}}>
          <Body>
            <Text style={styles.related}>No related book found.</Text>
          </Body>
        </ListItem>
      </List>
    )
  }
  return (
    <FlatList
      horizontal
      data={related}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <ListItem key={item.id} style={{ borderBottomColor: 'transparent'}}>
          <Thumbnail
            style={styles.cover}
            square
            resizeMode="stretch"
            size={80}
            defaultSource={require('../../Assets/Images/holder.jpg')}
            source={{ uri: getBiggerImage(item.imageLinks ? item.imageLinks.thumbnail : '')}}
          />
        </ListItem>
      )}
    />

  );
};

const styles = {
  container: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  cover: {
    width: 120,
    height: 200,
  },
  item: {
    borderBottomColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: AppColors.divider,
  },
  related: {
    fontWeight: 'bold',
  },
  listRelated: {
    flex: 1,
    height: 210,
    flexDirection: 'row',
  }
};

export default RelatedBook;
