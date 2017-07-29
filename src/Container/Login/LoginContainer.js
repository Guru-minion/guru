import { connect } from 'react-redux';
import { loginSuccess  } from './Action';

import LoginView from './LoginView';

// What data from the store shall we send to the component?
const mapStateToProps = state => state.user;

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
    loginSuccess: (data) => dispatch(loginSuccess(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);