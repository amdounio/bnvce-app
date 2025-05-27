import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../config/api';
import BottomSheet from '../components/BottomSheet';
import { BottomSheetContext } from '../context/BottomSheetContext';

// Pre-import all possible logos
const logos = {
  axa: require('../assets/img/axa-logo.png'),
  swisslife: require('../assets/img/swisslife-logo.png'),
  // Add more logos as needed
  default: require('../assets/img/axa-logo.png'), // Fallback logo
};

// Function to get the correct logo based on contract name
const getLogoForContract = (contractName) => {
  const name = contractName.toLowerCase();
  if (name.includes('axa')) {
    return logos.axa;
  } else if (name.includes('swisslife') || name.includes('swiss')) {
    return logos.swisslife;
  } else {
    // Return default logo if no match
    return logos.default;
  }
};

const ContractsScreen = ({ navigation }) => {
  // Add this line to use the BottomSheetContext
  const { isOpen, toggleSheet } = useContext(BottomSheetContext);
  const [expandedCard, setExpandedCard] = useState(null);
  const [insuranceContracts, setInsuranceContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  // Animation refs for each card
  const animationRefs = useRef({});

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Fetch user data from AsyncStorage
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const parsedUserData = JSON.parse(userDataString);
          setUserData(parsedUserData);
          
          // After getting user data, fetch insurance cards
          if (parsedUserData.email) {
            fetchInsuranceCards(parsedUserData.email);
          }
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    
    getUserData();
  }, []);

  // Fetch insurance cards from API
  const fetchInsuranceCards = async (email) => {
    try {
      const response = await fetch(API_CONFIG.CARDS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Transform API data to match our app's structure
        const formattedCards = data.data.map((card, index) => {
          // Get logo using the mapping function
          const logo = getLogoForContract(card['Nom du contrat']);
          
          // Set color based on contract name
          const contractName = card['Nom du contrat'].toLowerCase();
          let color = '#FFFFFF';
          let buttonBgColor = '#E30613';
          let buttonTextColor = 'white';
          let textColor = '#333';
          
          if (contractName.includes('axa')) {
            color = '#0033A0';
            buttonBgColor = 'white';
            buttonTextColor = '#0033A0';
            textColor = 'white';
          } else if (contractName.includes('swisslife') || contractName.includes('swiss')) {
            color = '#FFFFFF';
            buttonBgColor = '#E30613';
            buttonTextColor = 'white';
            textColor = '#333';
          }

          return {
            id: index + 1,
            company: card['Compagnie'],
            type: card['Nom du contrat'],
            amount: `${card['amount']}€`,
            logo: logo,
            color: color,
            buttonText: 'En savoir plus',
            buttonBgColor: buttonBgColor,
            buttonTextColor: buttonTextColor,
            textColor: textColor
          };
        });
        
        setInsuranceContracts(formattedCards);
        // Open the last card by default
        if (formattedCards.length > 0) {
          setExpandedCard(formattedCards[formattedCards.length - 1].id);
        }
      } else {
        setError('Impossible de charger les cartes d\'assurance');
      }
    } catch (err) {
      console.error('Error fetching insurance cards:', err);
      setError('Erreur lors du chargement des cartes d\'assurance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes contrats</Text>
        <Text style={styles.headerSubtitle}>
          Retrouvez ici l'ensemble de vos contrats d'assurance, en toute clarté.
        </Text>
      </View>

      {/* Contracts list */}
      <ScrollView style={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#0033A0" style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          insuranceContracts.map(contract => (
            <TouchableOpacity 
              key={contract.id} 
              activeOpacity={1}
              onPress={() => toggleExpand(contract.id)}
            >
              <View
                style={[
                  styles.contractCard,
                  { backgroundColor: contract.color },
                  expandedCard === contract.id && styles.expandedCard3D
                ]}
              >
                <View style={styles.cardHeader}>
                  <Image source={contract.logo} style={styles.companyLogo} />
                  <Text style={[styles.contractType, 
                    { color: contract.color === '#FFFFFF' ? '#333' : 'white' }]}>
                    {contract.type}
                  </Text>
                </View>
                {expandedCard === contract.id && (
                  <View style={styles.cardFooter}>
                    <Text style={[styles.contractAmount, 
                      { color: contract.color === '#FFFFFF' ? '#333' : 'white' }]}>
                      {contract.amount}
                    </Text>
                    <TouchableOpacity 
                      style={[styles.learnMoreButton, 
                        { backgroundColor: contract.buttonBgColor }]}
                    >
                      <Text style={[styles.learnMoreText, 
                        { color: contract.buttonTextColor }]}>
                        {contract.buttonText}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      
      {/* Add BottomSheet at the end of the component, before the closing SafeAreaView tag */}
      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.iconGrid}>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons name="document-text-outline" size={30} color="#0C2B72" />
                <Text style={styles.iconText}>Documents</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons name="calculator-outline" size={30} color="#0C2B72" />
                <Text style={styles.iconText}>Simulateur</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons name="card-outline" size={30} color="#0C2B72" />
                <Text style={styles.iconText}>Paiement</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons name="chatbubble-outline" size={30} color="#0C2B72" />
                <Text style={styles.iconText}>Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons name="call-outline" size={30} color="#0C2B72" />
                <Text style={styles.iconText}>Appel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={30} color="#0C2B72" />
                <Text style={styles.iconText}>Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

// Add these styles at the end of your existing styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 20, // 100% of font size
    letterSpacing: 0,
    color: '#333',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 12, // 100% of font size
    letterSpacing: 0,
    color: '#666',
    // keep margin or padding if needed
  },
  scrollContent: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  contractCard: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    // Remove height: 222,
  },
  expandedCard3D: {
    height: 222,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8, // For Android
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyLogo: {
    width: 50,
    height: 20,
    resizeMode: 'contain',
  },
  contractType: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  contractAmount: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  learnMoreButton: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  learnMoreText: {
    fontSize: 12,
    fontWeight: '500',
  },
  loader: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: '#E30613',
    marginVertical: 20,
    fontSize: 16,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  iconGrid: {
    marginTop: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  iconContainer: {
    alignItems: 'center',
    width: '30%',
  },
  iconText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default ContractsScreen;