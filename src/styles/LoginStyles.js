import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 50, // Changed from 10 to 50
    width: '50%',
    alignSelf: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14, // 140% of font size
    letterSpacing: 0,
    fontFamily: 'Inter-Medium', // Updated to use the specific weight
  },
  signupContainer: {
    marginTop: 20,
  },
  signupText: {
    color: 'white',
    fontSize: 14,
  },
  signupLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  // Add these new styles
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.3)',
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
});

export default LoginStyles;