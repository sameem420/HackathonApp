const userAuthAction = (user) => {
  return (dispatch) => {
    dispatch({type: 'USER', payload: {user}});
  };
};

const setAccountType = (type) => {
  return (dispatch) => {
    dispatch({type: 'ACCOUNTTYPE', payload: {type}});
  };
};

const setFormShow = (show) => {
  return (dispatch) => {
    dispatch({type: 'FORMSHOW', payload: {show}});
  };
};

const setDetail = (detail) => {
  return (dispatch) => {
    dispatch({type: 'DETAIL', payload: {detail}});
  };
};
const setKeyboard = (keyboardVisible) => {
  return (dispatch) => {
    dispatch({type: 'KEYBOARD', payload: {keyboardVisible}});
  };
};

export {userAuthAction, setAccountType, setFormShow, setDetail, setKeyboard};
