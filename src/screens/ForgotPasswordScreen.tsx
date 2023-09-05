import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { TextInput } from '../components/UI/TextInput';
import { FormErrorMessage } from '../components/UI/FormErrorMessage';
import { CustomButton } from '../components/UI/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { useColors } from '../hooks/useColors';
import { useTranslation } from '../hooks/useTranslation';
import { FONTS, PADDING } from '../styles/base';
import { LinkButton } from '../components/UI/LinkButton';

export const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const getColor = useColors();
    const trans = useTranslation();

    const [errorState, setErrorState] = useState('');

    const passwordResetSchema = Yup.object().shape({
        email: Yup.string().required(trans('auth.enterValidEmail')).label('Email').email(trans('auth.enterValidEmail')),
    });

    const handleSendPasswordResetEmail = (values: { email: string }) => {
        const { email } = values;

        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Success: Password Reset Email sent.'); // TODO: show success screen?
                // or show alert?and navigate to login?
                navigation.navigate('Login');
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                    setErrorState(trans('auth.enterValidEmail'));
                    return;
                }
                setErrorState(error.message);
            });
    };

    return (
        <SafeAreaCard>
            <View style={styles.container}>
                <Text style={[styles.screenTitle, { color: getColor('text') }]}>Reset your password</Text>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={passwordResetSchema}
                    onSubmit={values => handleSendPasswordResetEmail(values)}
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
                                    value: values.email,
                                    onChangeText: handleChange('email'),
                                    onBlur: handleBlur('email'),
                                }}
                                leftIconName="mail-outline"
                            />
                            <FormErrorMessage error={errors.email} visible={touched.email} />

                            {errorState !== '' ? <FormErrorMessage error={errorState} visible={true} /> : null}

                            <CustomButton type="primary" onPress={handleSubmit} style={{ marginTop: PADDING.md }}>
                                <Text style={[styles.buttonText, { color: getColor('text') }]}>
                                    {trans('auth.sendResetEmail')}
                                </Text>
                            </CustomButton>
                        </>
                    )}
                </Formik>
                <View style={styles.linkButtonContainer}>
                    <LinkButton
                        title={trans('auth.returnToLogin')}
                        onPress={() => navigation.navigate('Login')}
                        color={getColor('primary500')}
                        textStyle={styles.signupText}
                    />
                </View>
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
        fontSize: FONTS.m,
    },
});
