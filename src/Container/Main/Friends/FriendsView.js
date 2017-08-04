import React, {Component} from 'react';
import { FlatList, Image, TouchableHighlight } from 'react-native';
import { Container, View, Content, Card, Item, List,
  CardItem, Thumbnail, Text, Button, Icon, Left,
  Body, Right, H3 } from 'native-base';
import Activity from '../../../Components/Common/ActivityItem';

export default class FriendsView extends Component {

  constructor(props) {
    super(props)    
  }

  render() {
    const { activities, user } = this.props;

    return (
      <Container>
        <Content>
          <List style={styles.activities}>
            {
              activities.map((activity) =>
                (<Activity
                  key={activity.id}
                  user={user}
                  {...activity}
                />))
            }
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  activities: {
    marginHorizontal: 16,
    marginTop: 16,
  }
};
