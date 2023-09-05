import React, { useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { FormErrorMessage } from '../components/UI/FormErrorMessage';
import { CustomButton } from '../components/UI/CustomButton';
import { TextInput } from '../components/UI/TextInput';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../hooks/useColors';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { FONTS, PADDING } from '../styles/base';
import { useTranslation } from '../hooks/useTranslation';
import { RootStackParamList } from '../navigation/AuthStack';
import { LinkButton } from '../components/UI/LinkButton';

export const LoginScreen = () => {
    const navigation = useNavigation();
    const getColor = useColors();
    const translate = useTranslation();

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string().required().email().label('Email'),
        password: Yup.string().required().min(6).label('Password'),
    });

    const [errorState, setErrorState] = useState('');
    const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility();

    const handleLogin = (values: { email: string; password: string }) => {
        const { email, password } = values;
        signInWithEmailAndPassword(auth, email, password).catch(error => setErrorState(error.message));
    };
    return (
        <>
            <SafeAreaCard>
                <View style={[styles.container, { backgroundColor: getColor('background') }]}>
                    <KeyboardAvoidingView>
                        <Text style={[styles.screenTitle, { color: getColor('text') }]}>
                            {translate('auth.welcome')}
                        </Text>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={loginValidationSchema}
                            onSubmit={values => handleLogin(values)}
                        >
                            {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
                                <>
                                    <Text style={{ color: getColor('text') }}>{translate('auth.email')}</Text>
                                    <TextInput
                                        otherProps={{
                                            placeholder: translate('auth.enterEmail'),
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
                                    <Text style={{ color: getColor('text'), paddingTop: PADDING.sm }}>
                                        {translate('auth.password')}
                                    </Text>
                                    <TextInput
                                        otherProps={{
                                            placeholder: translate('auth.enterPassword'),
                                            autoCapitalize: 'none',
                                            autoCorrect: false,
                                            secureTextEntry: passwordVisibility,
                                            textContentType: 'password',
                                            value: values.password,
                                            onChangeText: handleChange('password'),
                                            onBlur: handleBlur('password'),
                                        }}
                                        leftIconName="lock-closed-outline"
                                        rightIcon={rightIcon}
                                        handlePasswordVisibility={handlePasswordVisibility}
                                    />
                                    <FormErrorMessage error={errors.password} visible={touched.password} />

                                    {errorState !== '' ? <FormErrorMessage error={errorState} visible={true} /> : null}

                                    <LinkButton
                                        title={`${translate('auth.forgotPassword')}?`}
                                        onPress={() => navigation.navigate('ForgotPassword')}
                                        color={getColor('primary500')}
                                        style={styles.forgotPassword}
                                        textStyle={styles.forgotPasswordText}
                                    />

                                    <CustomButton type="primary" onPress={handleSubmit}>
                                        <Text style={[styles.buttonText, { color: getColor('text') }]}>
                                            {translate('auth.signin')}
                                        </Text>
                                    </CustomButton>
                                </>
                            )}
                        </Formik>

                        <View style={styles.linkButtonContainer}>
                            <Text style={{ color: getColor('text') }}>
                                {translate('auth.dontHaveAcc')}
                                {'  '}
                            </Text>
                            <LinkButton
                                title={translate('auth.signup')}
                                onPress={() => navigation.navigate('Signup')}
                                color={getColor('primary500')}
                                textStyle={styles.signupText}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaCard>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: PADDING.md,
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
    forgotPassword: {
        marginBottom: PADDING.lg,
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        fontSize: FONTS.m,
    },
});
