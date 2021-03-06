/* eslint-disable no-alert */
import React from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from 'components/forminput';
import Logo from 'components/logo';
import globalStyles from 'styles/styles';

// Handle Signup
const handleSubmit = (formikValues, formikActions, navigation, signUpUser) => {
  const params = {
    fullname: formikValues.name,
    username: formikValues.username,
    email: formikValues.email,
    password: formikValues.password,
  };

  // signup success callback
  const onSuccess = () => {
    navigation.navigate('ActivateAccount');
    formikActions.setSubmitting(false);
  };

  // signup failure callback
  const onFailure = (err) => {
    formikActions.setErrors(err.data);
    formikActions.setFieldError('serverError', 'Could not sign up');
    formikActions.setSubmitting(false);
  };

  try {
    signUpUser(params, onSuccess, onFailure);
  } catch (error) {
    alert('Something went very wrong');
  }
};

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Enter password again')
    .equals([Yup.ref('password')], 'Passwords do not match'),
});

// Component
const Signup = ({ navigation, signUpUser }) => (
  <View style={globalStyles.rootContainer}>
    <Logo />
    <View style={globalStyles.formContainer}>
      <Text style={globalStyles.formHeader}>Sign up</Text>
      <Formik
        initialValues={{
          name: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleSubmit(values,
          actions,
          navigation,
          signUpUser)}
      >
        {(formikProps) => (
          <>
            <FormInput
              formikProps={formikProps}
              formikKey="name"
              placeholder="Name"
            />
            <FormInput
              formikProps={formikProps}
              formikKey="username"
              placeholder="Username"
            />
            <FormInput
              formikProps={formikProps}
              formikKey="email"
              placeholder="Email"
            />
            <FormInput
              formikProps={formikProps}
              formikKey="password"
              placeholder="Password"
              secureTextEntry
            />
            <FormInput
              formikProps={formikProps}
              formikKey="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
            />
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <>
                <Text style={{ color: 'red' }}>
                  {formikProps.errors.serverError}
                </Text>
                <TouchableOpacity
                  style={globalStyles.opaqueButton}
                  onPress={formikProps.handleSubmit}
                >
                  <Text style={{ color: '#fefffe' }}>
                    Sign up
                  </Text>
                </TouchableOpacity>

              </>
            )}
          </>
        )}
      </Formik>
    </View>
  </View>
);

export default Signup;
