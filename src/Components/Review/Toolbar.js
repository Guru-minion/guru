import React from 'react';
import { connect } from 'react-redux';
import {
  Body,
  Button,
  Header,
  Left,
  Icon,
  Right,
  Title,
  Text,
  Spinner,
} from 'native-base';
import { AppColors } from '@style/index';
import { NavigationActions } from 'react-navigation';
import { reviewLoadingVisibility } from '../../Redux/UIs/Action';
import { addReview } from '../../Container/Review/Action';

const NewReviewToolbar = (props) => {
  const { navigation, loading } = props;

  const submitReview = () => {
    navigation.dispatch(reviewLoadingVisibility(true));
    navigation.dispatch(addReview());
  };

  return (
    <Header>
      <Left>
        <Button
          onPress={() => navigation.dispatch(NavigationActions.back())}
          transparent>
          <Icon style={{ color: AppColors.colorPrimary}} name='close' />
        </Button>
      </Left>
      <Body>
      <Title>New review</Title>
      </Body>
      <Right>
        <Right>
          <Button style={{backgroundColor: AppColors.colorPrimary}} onPress={submitReview} small rounded>
            {
              loading ? (<Spinner size="small" color={AppColors.colorPrimary} />) : null
            }
            <Text style={{marginLeft: 4}}>Submit</Text>
          </Button>
        </Right>
      </Right>
    </Header>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.ui.addNewReviewLoading,
  }
};

export default connect(mapStateToProps)(NewReviewToolbar);
