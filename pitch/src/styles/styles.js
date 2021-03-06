// This file is for commonly used styles
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // OUTERMOST container styling
  rootContainer: {
    backgroundColor: '#061f26',
    flex: 1,
  },

  // FORM STYLING
  input: {
    borderWidth: 1,
    borderColor: '#fd7719',
    borderRadius: 5,
    margin: 5,
    padding: 7,
    height: 40,
    color: '#fefffe',
  },
  formHeader: {
    fontSize: 40,
    padding: 20,
    alignSelf: 'center',
    color: '#fefffe',
  },
  formContainer: {
    alignSelf: 'center',
    width: '85%',
  },

  // BUTTON STYLING
  opaqueButton: {
    backgroundColor: '#fd7719',
    borderRadius: 10,
    height: 40,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  transparentButton: {
    borderRadius: 10,
    height: 50,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // TEXT STYLING
  errorText: {
    color: 'red',
    margin: 5,
  },

  // LOGO STYLING
  logo: {
    flex: 1,
    resizeMode: 'contain',
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
});

export default styles;
