import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// redux
import {connect} from 'react-redux';
// redux store actions
import {userAuthAction} from '../store/actions/homeActions';

//Firebase
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const UpdateScreen = ({navigation, userAuth, userAuthAction}) => {
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 200,
    maxWidth: 200,
  };

  const imagePicker = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setImage(source);
      }
    });
  };

  const takeImage = () => {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        setImage(null);
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    if (image) {
      setLoader(true);
      const {uri} = image;
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const task = storage()
        .ref(`/images/${userAuth.uid}/profilePicture.jpg`)
        .putFile(uploadUri);

      try {
        await task.then(async () => {
          const url = await storage()
            .ref(`images/${userAuth.uid}/profilePicture.jpg`)
            .getDownloadURL();
          const userUpdate = auth().currentUser;
          userUpdate
            .updateProfile({
              photoURL: url,
            })
            .then(() => {
              userAuthAction(auth().currentUser);
              setImage(null);
              setLoader(false);
              navigation.goBack();
            })
            .catch((error) => {
              // An error happened.
              // console.log('Update Unsuccessful.', error);
            });
        });
      } catch (e) {
        // console.error(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View
          style={{
            marginRight: 20,
          }}>
          <AntDesign
            name="left"
            size={25}
            color={'#a171ef'}
            onPress={() => {
              setImage(null);
              navigation.goBack();
            }}
          />
        </View>
        <Text style={styles.heading}>Update Image</Text>
      </View>
      <View>
        <View style={styles.photoContainer}>
          <View style={styles.photoCircle}>
            {image ? (
              <Image source={{uri: image.uri}} style={styles.imageStyle} />
            ) : userAuth.photoURL ? (
              <Image
                style={styles.imageStyle}
                source={{uri: userAuth.photoURL}}
              />
            ) : (
              <View style={styles.defaultImage}>
                <AntDesign name="user" size={60} color={'#c4c4c4'} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={imagePicker}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takeImage}>
            <Text style={styles.buttonText}>Take Image</Text>
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              disabled={!image}
              style={
                image
                  ? [styles.button, {flexDirection: 'row'}]
                  : styles.disabledButton
              }
              onPress={uploadImage}>
              <Text
                style={image ? styles.buttonText : styles.disabledButtonText}>
                Update Image
              </Text>
              <View>
                {loader && (
                  <ActivityIndicator
                    style={{marginLeft: 10}}
                    size={'small'}
                    color="#ffffff"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a171ef',
  },
  headingContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 20,
    width,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#a171ef',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  disabledButtonText: {
    fontSize: 15,
    color: '#586069',
    fontWeight: 'bold',
  },
  photoContainer: {
    width,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 50,
  },
  photoCircle: {
    width: 105,
    height: 105,
    backgroundColor: '#f6f6f6',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#c4c4c4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetail: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  defaultImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    userAuthAction: (userAuth) => dispatch(userAuthAction(userAuth)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(UpdateScreen);
