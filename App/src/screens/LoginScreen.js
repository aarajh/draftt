import React, {useRef} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import tcomb from 'tcomb-form-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import userApi from '../api/user';




var _ = require('lodash');

// tcomb form library vars
const Form = tcomb.form.Form;
const stylesheet = _.cloneDeep(Form.stylesheet);
stylesheet.formGroup.normal.padding = wp(0.5);
stylesheet.textbox.normal.height = hp(5);

// define form
const loginForm = tcomb.struct({
    username_or_email : tcomb.String,
    password : tcomb.String
});

// define form options
const options = {
    auto : 'placeholders',
    fields : {
        username_or_email : {
            placeholder : 'Email / Username',
            label : null
        },
        password : {
            placeholder : 'Password',
            label : null,
            password : true,
            secureTextEntry: true
            
        }
    },
    stylesheet : stylesheet
};


// On Press functions
const loginOnPress = async (navigation, formRef) => {

    /* TODO:
        - pass state variable ErrorString
        - if userData is null --> validation failed --> modify ErrorString with message
        - setup response from the server --> if not 200, modify ErrorString
        - on successful login, go to Tester with some success message or something (for now)

    */

    console.log('Login Called');
    const userData = formRef.current.getValue();

    const response = await userApi.post(
        '/login/',
        userData
    )   

    console.log(response.status);
    console.log(response.data);

};


const LoginScreen = ({navigation}) => {


    const formRef = useRef(loginForm);


    return (
        <KeyboardAvoidingView style={styles.containerStyle} behavior="padding" enabled>

            <View style={styles.logoContainerStyle}>
                <Image source={require('../../assets/nonamelogo/Logo_NoBG.png')} style={styles.logoStyle} />
            </View>

            <View style={styles.formStyle}>

                <View style={styles.formHeaderStyle}>
                    <Text style={{fontSize : hp('4%')}}>Login</Text>
                </View>
                <View style={{flex : 1}}>
                    <Form ref={formRef} type={loginForm} options={options} />

                    <TouchableOpacity style={styles.submitButtonStyle} onPress={() => loginOnPress(navigation, formRef)}>
                        <Text style={styles.submitButtonTextStyle}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotPassButtonStyle}>
                        <Text style={styles.forgotPassTextStyle} onPress={() => {navigation.navigate('ResetPassword')}}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.signUpStyle}>
                    <TouchableOpacity style={{width : '80%', height : '20%', alignItems : 'center', justifyContent : 'center'}} onPress={() => {navigation.navigate('Signup')}}>
                        <Text style={{color : '#fd7719' }}>No Account? Sign up!</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
    );

};


const styles = StyleSheet.create({

    containerStyle : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : '#fefffe'
        // borderWidth : 1
    },

    // Logo Styles

    logoContainerStyle : {
        flex : 1,
        justifyContent : "center",
        alignItems : 'center',
        marginTop : hp(5),
        width : wp('70%'),
        height : hp('50%'),
        // borderWidth : 1
    },
    
    logoStyle : {
        flex : 1,
        width : '100%' ,
        height : '100%',
        resizeMode : 'contain'
    },


    // Login Form Styles

    formStyle : {
        flex : 3,
        width : wp('80%'),
        justifyContent : 'space-between'
    },

    formHeaderStyle : {
        fontSize : hp('4%'),
        alignSelf : 'center',
        justifyContent : 'center',
        paddingBottom : hp('5%'),
        flex : 1
    },

    submitButtonStyle : {
        backgroundColor : '#fd7719',
        borderRadius : 5,
        padding : hp('1%'),
        // flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },

    submitButtonTextStyle : {
        fontSize : hp('2%'), 
        textAlign : 'center', 
        color:'white'
    },

    forgotPassTextStyle : {
        fontSize : hp('2%'), 
        textAlign : 'center', 
        color:'#fd7719'
    },

    forgotPassButtonStyle : {
        borderRadius : 5,
        marginTop : hp(1),
        padding : hp('1%'),
        borderWidth : 1,
        borderColor : '#fd7719',
        // flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },

    // Or text styling

    orTextStyle : {
        alignSelf : 'center', 
        fontSize : hp('2%'), 
        padding : hp('3.5%'),
        flex : 1
    },

    // Other sign in option styling

    placeholderStyle : {
        borderRadius : 5,
        padding : hp('1.5%'),
        margin : hp('1%'),
        width : wp('80%'),
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    

    signUpStyle : {
        borderRadius : 5,
        padding : hp('1.5%'),
        flex : 2,
        alignItems : 'center',
        justifyContent : 'flex-end'
    }

});


export default LoginScreen;