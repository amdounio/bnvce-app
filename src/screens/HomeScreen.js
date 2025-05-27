import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  ActivityIndicator,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStyles from '../styles/HomeStyles';
import API_CONFIG from '../config/api';
import BottomSheet from '../components/BottomSheet';
import { useSharedValue } from 'react-native-reanimated'; // Add this import
// Make sure these imports are at the top
import { useContext } from 'react';
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

// In the HomeScreen component:
const HomeScreen = ({ navigation }) => {
  // State for insurance cards
  const [insuranceCards, setInsuranceCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [cardsError, setCardsError] = useState(null);

  // State for news articles
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for user data
  const [userData, setUserData] = useState(null);
  
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
          // Get logo using the mapping function instead of dynamic require
          const logo = getLogoForContract(card['Nom du contrat']);
          
          // Set color logic based on contract name
          const contractName = card['Nom du contrat'].toLowerCase();
          let color, buttonBgColor, buttonTextColor, textColor;
  
          if (contractName.includes('swisslife') || contractName.includes('swiss')) {
            color = '#FFFFFF'; // White background for Swisslife
            buttonBgColor = '#E30613';
            buttonTextColor = 'white';
            textColor = '#333';
          } else if (contractName.includes('axa')) {
            color = '#0033A0'; // Blue background for AXA
            buttonBgColor = 'white';
            buttonTextColor = '#0033A0';
            textColor = 'white';
          } else {
            // Default alternating logic for other companies
            const isEven = index % 2 === 0;
            color = isEven ? '#0033A0' : '#FFFFFF';
            buttonBgColor = isEven ? 'white' : '#E30613';
            buttonTextColor = isEven ? '#0033A0' : 'white';
            textColor = isEven ? 'white' : '#333';
          }
  
          return {
            id: index + 1,
            company: card['Compagnie'],
            type: card['Nom du contrat'],
            amount: `${card['amount']}€`,
            logo: logo, // Use the logo from our mapping function
            color: color,
            buttonText: 'En savoir plus',
            buttonBgColor: buttonBgColor,
            buttonTextColor: buttonTextColor,
            textColor: textColor
          };
        });
  
        setInsuranceCards(formattedCards);
      } else {
        setCardsError('Impossible de charger les cartes d\'assurance');
      }
    } catch (err) {
      console.error('Error fetching insurance cards:', err);
      setCardsError('Erreur lors du chargement des cartes d\'assurance');
    } finally {
      setCardsLoading(false);
    }
  };

  // Fetch news articles from API
  useEffect(() => {
    fetchNewsArticles();
  }, []);

  const fetchNewsArticles = async () => {
    try {
      // First fetch the config
      const configResponse = await fetch(API_CONFIG.CONFIG_API);
      const configData = await configResponse.json();
      
      // Extract config values
      const limit = configData.config.number_of_posts || 3;
      const categories = configData.config.category_ids || '';
      
      // Fetch posts with config parameters
      const postsUrl = API_CONFIG.getPostsUrl(limit, categories);
      const postsResponse = await fetch(postsUrl);
      const postsData = await postsResponse.json();
      
      // Transform API data to match our app's structure
      const formattedArticles = postsData.map(post => ({
        id: post.id,
        title: post.title,
        description: post.excerpt,
        date: new Date(post.date).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        image: { uri: post.featured_image },
        link: post.link,
        content: post.content
      }));
      
      setNewsArticles(formattedArticles);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching news articles:', err);
      setError('Impossible de charger les actualités');
      setLoading(false);
    }
  };


  // Use the context
  const { isOpen, toggleSheet } = useContext(BottomSheetContext);

  const handleToggle = () => {
    console.log('BottomSheet state before toggle:', isOpen.value); // Debug log
    toggleSheet();
    console.log('BottomSheet state after toggle:', isOpen.value); // Debug log
  };

  return (
    <SafeAreaView style={HomeStyles.container}>
      {/* Header with profile */}
      <View style={HomeStyles.header}>
        <View style={HomeStyles.profileSection}>
          <Image 
            source={require('../assets/img/profile-placeholder.png')} 
            style={HomeStyles.profileImage}
          />
          <View style={HomeStyles.welcomeTextContainer}>
            <Text style={HomeStyles.welcomeText}>Bienvenue sur Bienviyance !</Text>
            <Text style={HomeStyles.userName}>
              {userData ? `${userData.name} ${userData.lastname}` : 'Chargement...'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={HomeStyles.notificationButton}>
          <View style={HomeStyles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* Main content - scrollable */}
      <ScrollView style={HomeStyles.scrollContent}>
        {/* Insurance cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={HomeStyles.cardsScrollView}
        >
          {cardsLoading ? (
            <ActivityIndicator size="large" color="#0033A0" style={HomeStyles.loader} />
          ) : cardsError ? (
            <Text style={HomeStyles.errorText}>{cardsError}</Text>
          ) : insuranceCards.length > 0 ? (
            insuranceCards.map(card => (
              <View 
                key={card.id} 
                style={[HomeStyles.insuranceCard, { backgroundColor: card.color }]}
              >
                <View style={HomeStyles.cardHeader}>
                  <Image source={card.logo} style={HomeStyles.companyLogo} />
                  <Text style={[HomeStyles.insuranceType, 
                    { color: card.textColor }]}>
                    {card.type}
                  </Text>
                </View>
                <View style={HomeStyles.cardFooter}>
                  <Text style={[HomeStyles.insuranceAmount, 
                    { color: card.textColor }]}>
                    {card.amount}
                  </Text>
                  <TouchableOpacity 
                    style={[HomeStyles.learnMoreButton, 
                      { backgroundColor: card.buttonBgColor }]}
                  >
                    <Text style={[HomeStyles.learnMoreText, 
                      { color: card.buttonTextColor }]}>
                      {card.buttonText}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={HomeStyles.errorText}>Aucune carte d'assurance trouvée</Text>
          )}
        </ScrollView>

        {/* News section */}
        <View style={HomeStyles.newsSection}>
          <View style={HomeStyles.newsSectionHeader}>
            <Text style={HomeStyles.newsSectionTitle}>Actualités</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://bnvce.fr/actualites-2/')}>
              <Text style={HomeStyles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {/* News articles */}
          {loading ? (
            <ActivityIndicator size="large" color="#0033A0" style={HomeStyles.loader} />
          ) : error ? (
            <Text style={HomeStyles.errorText}>{error}</Text>
          ) : (
            newsArticles.map(article => (
              <TouchableOpacity 
                key={article.id} 
                style={HomeStyles.newsArticle}
                onPress={() => Linking.openURL(article.link)}
              >
                <Image 
                  source={article.image} 
                  style={HomeStyles.articleImage}
                  defaultSource={require('../assets/img/coins-stack.jpg')}
                />
                <View style={HomeStyles.articleContent}>
                  <Text
                    style={HomeStyles.articleTitle}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {article.title}
                  </Text>
                  <Text
                    style={HomeStyles.articleDescription}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {article.description}..
                  </Text>
                  <Text style={HomeStyles.articleDate}>{article.date}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 18 }}>Hello from Bottom Sheet!</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;
