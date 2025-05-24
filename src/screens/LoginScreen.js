import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginStyles from '../styles/LoginStyles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    // Clear any previous error messages
    setErrorMessage('');
    
    // Validate inputs
    if (!email || !password) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);

    try {
      // Make API request to login endpoint
      const response = await fetch('https://srv819563.hstgr.cloud/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email, // Using email as username
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Login successful
        console.log('Login successful:', data.data);
        
        // Store user data in AsyncStorage
        try {
          // Store the entire user data object
          await AsyncStorage.setItem('userData', JSON.stringify(data.data));
          
          // Store airtable data separately for easy access
          await AsyncStorage.setItem('airtableData', JSON.stringify(data.data.airtableData));
          
          // Navigate to the main screen
          navigation.navigate('Main');
        } catch (storageError) {
          console.error('Error storing user data:', storageError);
          Alert.alert(
            'Erreur',
            'Impossible de sauvegarder vos données. Veuillez réessayer.'
          );
        }
      } else {
        // Login failed - show error message
        setErrorMessage('Identifiants incorrects. Veuillez réessayer.');
        
        // You can also use Alert for a popup
        Alert.alert(
          'Échec de connexion',
          'Identifiants incorrects. Veuillez vérifier votre email et mot de passe.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Impossible de se connecter au serveur. Veuillez réessayer plus tard.');
      
      // Show network error alert
      Alert.alert(
        'Erreur de connexion',
        'Impossible de se connecter au serveur. Veuillez réessayer plus tard.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#4c8dbd', '#1a3c6e']}
      style={LoginStyles.gradient}
    >
      <SafeAreaView style={LoginStyles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={LoginStyles.container}
        >
          <View style={LoginStyles.logoContainer}>
            <Image 
              source={require('../assets/img/logo.png')} 
              style={LoginStyles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={LoginStyles.formContainer}>
            {/* Error message display */}
            {errorMessage ? (
              <View style={LoginStyles.errorContainer}>
                <Text style={LoginStyles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}
            
            <TextInput
              style={LoginStyles.input}
              placeholder="Votre email"
              placeholderTextColor="#000" // Changé de "#888" à "#000" (noir)
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            
            <TextInput
              style={LoginStyles.input}
              placeholder="Votre mot de passe"
              placeholderTextColor="#000" // Changé de "#888" à "#000" (noir)
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />

            <TouchableOpacity 
              style={[
                LoginStyles.loginButton, 
                isLoading && LoginStyles.loginButtonDisabled
              ]} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={LoginStyles.loginButtonText}>Se connecter</Text>
              )}
            </TouchableOpacity>
          </View>

          
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;