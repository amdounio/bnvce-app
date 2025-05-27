import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StyleSheet,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '../components/BottomSheet';
import { BottomSheetContext } from '../context/BottomSheetContext';

const MenuScreen = ({ navigation }) => {
  // Add this line to use the BottomSheetContext
  const { isOpen, toggleSheet } = useContext(BottomSheetContext);
  
  // Menu sections and items
  const menuSections = [
    {
      title: 'Plus',
      items: [
        { id: 2, title: 'Mes informations personnelles', icon: 'person-outline' },
      ]
    },
    {
      title: 'Nos partenaires',
      items: []
    },
    {
      title: 'Nos réseaux',
      items: []
    },
    {
      title: 'Laissez-nous votre avis',
      items: []
    },
    {
      title: 'En vidéo',
      subtitle: 'Bienviyance x Les Coqs de Courbevoie (Hockey)',
      items: []
    }
  ];

  // Partner logos
  const partners = [
    { id: 1, name: 'Entrepreneurs d\'Assurances', logo: require('../assets/img/partners/image 4.png') },
    { id: 2, name: 'Generali', logo: require('../assets/img/partners/image 5.png') },
    { id: 3, name: 'SwissLife', logo: require('../assets/img/partners/image 6.png') },
    { id: 4, name: 'April', logo: require('../assets/img/partners/image 7.png') },
    { id: 5, name: 'MetLife', logo: require('../assets/img/partners/image 8.png') },
    { id: 6, name: 'Alptis', logo: require('../assets/img/partners/image 9.png') },
    { id: 7, name: 'Néoliane', logo: require('../assets/img/partners/image 10.png') },
    { id: 8, name: 'Garance', logo: require('../assets/img/partners/image 11.png') },
  ];

  // Social media
  const socialMedia = [
    { id: 1, name: 'Instagram', icon: 'logo-instagram' },
    { id: 2, name: 'LinkedIn', icon: 'logo-linkedin' },
  ];

  // Rating stars
  const renderRatingStars = () => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <Ionicons key={star} name="star" size={24} color="#4c8dbd" style={styles.star} />
        ))}
      </View>
    );
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {/* Menu sections */}
        {menuSections.map((section, index) => (
          <View key={index} style={styles.section}>
            {/* Only render section title if not "Nos réseaux" or "Laissez-nous votre avis" */}
            {section.title !== 'Nos réseaux' && section.title !== 'Laissez-nous votre avis' && (
              <Text style={styles.sectionTitle}>{section.title}</Text>
            )}
            
            {section.subtitle && (
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            )}

            {/* Menu items */}
            {section.items.length > 0 && section.items.map(item => (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <Ionicons name={item.icon} size={24} color="#666" style={styles.menuItemIcon} />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}

            {/* Partners section */}
            {section.title === 'Nos partenaires' && (
              <View style={styles.partnersContainer}>
                {partners.map((partner, idx) => (
                  <View key={partner.id} style={styles.partnerLogo}>
                    <Image source={partner.logo} style={styles.logo} resizeMode="contain" />
                  </View>
                ))}
              </View>
            )}

            {/* Social media section */}
            {section.title === 'Nos réseaux' && (
              <View style={styles.networkRow}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.socialContainer}>
                  {socialMedia.map(social => (
                    <TouchableOpacity key={social.id} style={styles.socialButton}>
                      <Ionicons name={social.icon} size={24} color="#4c8dbd" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Rating section */}
            {section.title === 'Laissez-nous votre avis' && (
              <View style={styles.networkRow}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Ionicons key={star} name="star" size={24} color="#4c8dbd" style={styles.star} />
                  ))}
                </View>
              </View>
            )}

            {/* Video section */}
            {section.title === 'En vidéo' && (
              <View style={styles.videoContainer}>
                <Image 
                  source={require('../assets/img/advisor-photo.png')} 
                  style={styles.videoThumbnail}
                />
              </View>
            )}

            {/* Add separator except for the last section */}
            {index < menuSections.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </ScrollView>

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="white" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Me déconnecter</Text>
      </TouchableOpacity>
      
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
    backgroundColor: '#F3F6FB',
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16, // 100% of font size
    letterSpacing: 0,
    color: '#333',
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  partnersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  partnerLogo: {
    width: '23%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: '80%',
    height: '80%',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  star: {
    marginLeft: 5,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c8dbd',
    borderRadius: 25,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  networkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
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

export default MenuScreen;