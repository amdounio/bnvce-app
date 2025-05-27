import React, { useState, useEffect } from 'react';
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

// Add this import at the top if not already present
import NetInfo from '@react-native-community/netinfo';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Modify the beginning of your handleLogin function
  // Add this near the top of your handleLogin function
  const handleLogin = async () => {
    // Clear any previous error messages
    setErrorMessage('');
    
    // Log platform information
    console.log('Platform:', Platform.OS, Platform.Version);
    
    // Validate inputs
    if (!email || !password) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }
  
    // Check network connectivity first
    const netInfo = await NetInfo.fetch();
    console.log('Network info:', JSON.stringify(netInfo));
    
    if (!netInfo.isConnected) {
      setErrorMessage('Pas de connexion internet. Veuillez vérifier votre connexion.');
      return;
    }
    
    setIsLoading(true);
  
    // Replace your fetchWithTimeout function with this XMLHttpRequest implementation
    const makeRequest = (url, method, data) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState !== 4) return;
          
          console.log('XHR Status:', xhr.status);
          console.log('XHR Response Text:', xhr.responseText);
          
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (e) {
              console.error('Error parsing response:', e);
              reject(new Error('Invalid JSON response'));
            }
          } else {
            reject(new Error('Request failed with status ' + xhr.status));
          }
        };
        
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.timeout = 10000; // 10 seconds timeout
        xhr.ontimeout = () => reject(new Error('Request timed out'));
        xhr.onerror = () => reject(new Error('Network error'));
        
        if (data) {
          xhr.send(JSON.stringify(data));
        } else {
          xhr.send();
        }
      });
    };
    
    // Then in your handleLogin function, replace the fetch call with:
    try {
      console.warn('[TERMINAL] Attempting to login with:', email);
      
      const data = await makeRequest(
        'https://srv819563.hstgr.cloud/api/login',
        'POST',
        {
          username: email,
          password: password
        }
      );
      
      console.warn('[TERMINAL] Response data:', JSON.stringify(data));
      
      // Continue with your existing success handling...
      if (data.success) {
        // Login successful
        console.warn('[TERMINAL] Login successful:', data.data);
        
        // Store user data in AsyncStorage
        try {
          console.warn('[TERMINAL] Storing user data in AsyncStorage');
          // Store the entire user data object
          await AsyncStorage.setItem('userData', JSON.stringify(data.data));
          console.warn('[TERMINAL] Successfully stored userData');
          
          // Store airtable data separately for easy access
          await AsyncStorage.setItem('airtableData', JSON.stringify(data.data.airtableData));
          console.warn('[TERMINAL] Successfully stored airtableData');
          
          // Navigate to the main screen
          navigation.navigate('Main');
        } catch (storageError) {
          console.error('Error storing user data:', storageError);
          // Try to get more detailed error information
          console.error('Error details:', JSON.stringify(storageError));
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
      // At the end of your try block in handleLogin
      try {
        setIsLoading(false);
      } catch (error) {
        // Add this fallback navigation
        setTimeout(() => {
          // If we're still on the login screen after 2 seconds, force navigate
          if (isLoading) {
            console.log('Forcing navigation to Main screen');
            setIsLoading(false);
            navigation.navigate('Main');
          }
        }, 2000);
      }
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