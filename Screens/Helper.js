import Toast from 'react-native-root-toast';

export const toastMessage = (message) => {
  let toast = Toast.show(message, {
    position: -150,
    shadowColor: '#000',
    animation: true,
    hideOnPress: true,
    textColor: '#fff',
    delay: 0,
  });
  setTimeout(function () {
    Toast.hide(toast);
  }, 3000);
};
