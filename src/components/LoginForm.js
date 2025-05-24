import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import LoginStyles from '../styles/LoginStyles';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin }) => {
  return (
    <View style={LoginStyles.formContainer}>
      <TextInput
        style={LoginStyles.input}
        placeholder="Votre email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={LoginStyles.input}
        placeholder="Votre mot de passe"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={LoginStyles.loginButton} onPress={handleLogin}>
        <Text style={LoginStyles.loginButtonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;