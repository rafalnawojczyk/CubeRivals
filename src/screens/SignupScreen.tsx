import React, { useState } from 'react';
import * as Yup from 'yup';
import { Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { TextInput } from '../components/UI/TextInput';
import { FormErrorMessage } from '../components/UI/FormErrorMessage';
import { CustomButton } from '../components/UI/CustomButton';
import { useColors } from '../hooks/useColors';
import { useTranslation } from '../hooks/useTranslation';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { FONTS, PADDING } from '../styles/base';
import { useNavigation } from '@react-navigation/native';
import { LinkButton } from '../components/UI/LinkButton';

export const SignupScreen = () => {
    const navigation = useNavigation();
    const [errorState, setErrorState] = useState('');
    const getColor = useColors();
    const trans = useTranslation();

    const signupValidationSchema = Yup.object().shape({
        email: Yup.string().required().email().label('Email'),
        password: Yup.string().required().min(6).label('Password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], trans('auth.confirmPasswordMatch'))
            .required(trans('auth.confirmPasswordRequired')),
    });

    const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility();

    const handleSignup = async (values: { email: string; password: string }) => {
        const { email, password } = values;

        createUserWithEmailAndPassword(auth, email, password).catch(error => setErrorState(error.message));
    };

    return (
        <SafeAreaCard>
            <View style={[styles.container, { backgroundColor: getColor('background') }]}>
                <KeyboardAvoidingView>
                    <Text style={[styles.screenTitle, { color: getColor('text') }]}>{trans('auth.createNewAcc')}</Text>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={signupValidationSchema}
                        onSubmit={values => handleSignup(values)}
                    >
                        {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
                            <>
                                <Text style={{ color: getColor('text') }}>{trans('auth.email')}</Text>
                                <TextInput
                                    otherProps={{
                                        placeholder: trans('auth.enterEmail'),
                                        autoCapitalize: 'none',
                                        keyboardType: 'email-address',
                                        textContentType: 'emailAddress',
                                        autoFocus: true,
                                        value: values.email,
                                        onChangeText: handleChange('email'),
                                        onBlur: handleBlur('email'),
                                    }}
                                    leftIconName="mail-outline"
                                />
                                <FormErrorMessage error={errors.email} visible={touched.email} />

                                <Text style={{ color: getColor('text'), paddingTop: PADDING.md }}>
                                    {trans('auth.password')}
                                </Text>
                                <TextInput
                                    otherProps={{
                                        placeholder: trans('auth.enterPassword'),
                                        autoCapitalize: 'none',
                                        autoCorrect: false,
                                        secureTextEntry: passwordVisibility,
                                        textContentType: 'newPassword',
                                        value: values.password,
                                        onChangeText: handleChange('password'),
                                        onBlur: handleBlur('password'),
                                    }}
                                    handlePasswordVisibility={handlePasswordVisibility}
                                    leftIconName="lock-closed-outline"
                                    rightIcon={rightIcon}
                                />
                                <FormErrorMessage error={errors.password} visible={touched.password} />

                                <Text style={{ color: getColor('text') }}>{trans('auth.repeatPassword')}</Text>
                                <TextInput
                                    otherProps={{
                                        placeholder: trans('auth.repeatYourPassword'),
                                        autoCapitalize: 'none',
                                        autoCorrect: false,
                                        secureTextEntry: passwordVisibility,
                                        textContentType: 'password',
                                        value: values.confirmPassword,
                                        onChangeText: handleChange('confirmPassword'),
                                        onBlur: handleBlur('confirmPassword'),
                                    }}
                                    leftIconName="lock-closed-outline"
                                    handlePasswordVisibility={handlePasswordVisibility}
                                    rightIcon={rightIcon}
                                />
                                <FormErrorMessage error={errors.confirmPassword} visible={touched.confirmPassword} />

                                {errorState !== '' ? <FormErrorMessage error={errorState} visible={true} /> : null}

                                <CustomButton type="primary" onPress={handleSubmit} style={{ marginTop: PADDING.lg }}>
                                    <Text style={[styles.buttonText, { color: getColor('text') }]}>
                                        {trans('auth.signup')}
                                    </Text>
                                </CustomButton>
                            </>
                        )}
                    </Formik>

                    <View style={styles.linkButtonContainer}>
                        <Text style={{ color: getColor('text') }}>
                            {trans('auth.alreadyHaveAcc')}
                            {'  '}
                        </Text>

                        <LinkButton
                            title={trans('auth.signin')}
                            onPress={() => navigation.navigate('Login')}
                            color={getColor('primary500')}
                            textStyle={styles.signupText}
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaCard>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
    },
    screenTitle: {
        alignSelf: 'flex-start',
        fontSize: FONTS['xl'],
        paddingBottom: PADDING.md,
    },
    buttonText: {
        fontSize: FONTS.md,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    linkButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PADDING.md,
        marginBottom: PADDING.lg,
    },
    signupText: {
        fontWeight: 'bold',
        fontSize: FONTS.m,
    },
});
