import React, { useState, useContext } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { FormErrorMessage } from '../components/UI/FormErrorMessage';
import { CustomButton } from '../components/UI/CustomButton';
import { TextInput } from '../components/UI/TextInput';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../hooks/useColors';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { FONTS, PADDING } from '../styles/base';
import { useTranslation } from '../hooks/useTranslation';
import { LinkButton } from '../components/UI/LinkButton';
import { supabase } from '../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConfirmAnonymousUserModal } from '../components/ConfirmAnonymousUserModal';
import { UserContext } from '../store/user-context';

export const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useContext(UserContext);
    const [showAnonymousModal, setShowAnonymousModal] = useState(false);
    const navigation = useNavigation();
    const getColor = useColors();
    const trans = useTranslation();

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string().required().email().label('Email'),
        password: Yup.string().required().min(6).label('Password'),
    });

    const [errorState, setErrorState] = useState('');
    const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility();

    const handleLogin = async (values: { email: string; password: string }) => {
        setIsLoading(true);

        const { email, password } = values;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setErrorState(error.message);
            // TODO: fix error messages
        }
        await AsyncStorage.setItem('appUser', 'registered');
        updateUser({ userType: 'registered' });
        setIsLoading(false);
    };

    const handleUseWithoutAcc = async () => {
        setIsLoading(true);
        await AsyncStorage.setItem('appUser', 'anonymous');
        updateUser({ userType: 'anonymous' });
        setIsLoading(false);
    };

    return (
        <>
            <SafeAreaCard>
                <View style={[styles.container, { backgroundColor: getColor('background') }]}>
                    <KeyboardAvoidingView>
                        <Text style={[styles.screenTitle, { color: getColor('text') }]}>{trans('auth.welcome')}</Text>
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
                                    <Text style={{ color: getColor('text'), paddingTop: PADDING.sm }}>
                                        {trans('auth.password')}
                                    </Text>
                                    <TextInput
                                        otherProps={{
                                            placeholder: trans('auth.enterPassword'),
                                            autoCapitalize: 'none',
                                            autoCorrect: false,
                                            secureTextEntry: passwordVisibility,
                                            textContentType: 'password',
                                            value: values.password,
                                            onChangeText: handleChange('password'),
                                            onBlur: handleBlur('password'),
                                        }}
                                        leftIconName="lock"
                                        rightIcon={rightIcon}
                                        handlePasswordVisibility={handlePasswordVisibility}
                                    />
                                    <FormErrorMessage error={errors.password} visible={touched.password} />

                                    {errorState !== '' ? <FormErrorMessage error={errorState} visible={true} /> : null}

                                    <LinkButton
                                        title={`${trans('auth.forgotPassword')}?`}
                                        onPress={() => navigation.navigate('ForgotPassword')}
                                        color={getColor('primary500')}
                                        style={styles.forgotPassword}
                                        textStyle={styles.forgotPasswordText}
                                    />

                                    <CustomButton type="primary" onPress={handleSubmit}>
                                        <Text style={[styles.buttonText, { color: getColor('text') }]}>
                                            {trans('auth.signin')}
                                        </Text>
                                    </CustomButton>
                                    <CustomButton type="secondary" onPress={() => setShowAnonymousModal(true)}>
                                        <Text style={[styles.buttonText, { color: getColor('text') }]}>
                                            {trans('auth.useWithoutAcc')}
                                        </Text>
                                    </CustomButton>
                                </>
                            )}
                        </Formik>

                        <View style={styles.linkButtonContainer}>
                            <Text style={{ color: getColor('text') }}>
                                {trans('auth.dontHaveAcc')}
                                {'  '}
                            </Text>
                            <LinkButton
                                title={trans('auth.signup')}
                                onPress={() => navigation.navigate('Signup')}
                                color={getColor('primary500')}
                                textStyle={styles.signupText}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaCard>
            <ConfirmAnonymousUserModal
                showModal={showAnonymousModal}
                onClose={() => setShowAnonymousModal(false)}
                onConfirm={handleUseWithoutAcc}
            />
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
