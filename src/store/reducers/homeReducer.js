const INITIAL_STATE = {
  userAuth: null,
  accountType: null,
  formShow: false,
  detail: null,
  keyboardVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        userAuth: action.payload.user,
      };
    case 'ACCOUNTTYPE':
      return {
        ...state,
        accountType: action.payload.type,
      };
    case 'FORMSHOW':
      return {
        ...state,
        formShow: action.payload.show,
      };
    case 'DETAIL':
      return {
        ...state,
        detail: action.payload.detail,
      };
    case 'KEYBOARD':
      return {
        ...state,
        keyboardVisible: action.payload.keyboardVisible,
      };

    default:
      return state;
  }
};
