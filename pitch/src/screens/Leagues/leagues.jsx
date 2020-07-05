import React from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logoSrc from 'assets/logo/Logo_NoBG.png';

const Home = () => (
  <View style={styles.containerStyle}>
    <View style={styles.logoContainerStyle}>
      <Image
        source={logoSrc}
        style={styles.logoStyle}
      />
    </View>
    <Text style={styles.titleTextStyle}>Leagues Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fefffe',
  },

  titleTextStyle: {
    flex: 1,
    fontSize: hp(3),
  },

  logoContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    width: wp('50%'),
    height: hp('50%'),
    // borderWidth : 1
  },

  logoStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Home;