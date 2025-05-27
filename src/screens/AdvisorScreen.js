import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StyleSheet,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // <-- Add this import
import Calander from '../assets/img/menu/uil_calendar.svg';
import Phone from '../assets/img/menu/proicons_call.svg';
import Agence from '../assets/img/menu/agence.svg';
import BottomSheet from '../components/BottomSheet';
import { BottomSheetContext } from '../context/BottomSheetContext';


const AdvisorScreen = ({ navigation }) => {
  const advisor = {
    name: 'Stephane Benattar',
    title: 'Conseiller',
    phone: '01 23 45 67 89',
    email: 'jean.dupont@example.com',
    photo: require('../assets/img/advisor-photo.png')
  };

  const handleCall = () => {
    Linking.openURL(`tel:${advisor.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${advisor.email}`);
  };

  const handleSchedule = () => {
    // Implement scheduling functionality
    console.log('Schedule appointment');
  };

  const handleAgency = () => {
    // Implement agency location functionality
    console.log('View agency location');
  };

  // Add this line to use the BottomSheetContext
  const { isOpen, toggleSheet } = useContext(BottomSheetContext);
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient header with advisor info */}
      <LinearGradient
        colors={['#5A8DC6', '#0C2B72']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1.1971 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Mon conseiller</Text>
        
        <View style={styles.advisorProfile}>
          <Image 
            source={advisor.photo} 
            style={styles.advisorPhoto}
          />
          
          <View style={styles.advisorInfo}>
            <Text style={styles.advisorName}>{advisor.name}</Text>
            <Text style={styles.advisorTitle}>{advisor.title}</Text>
            
            <Text style={styles.contactInfo}>{advisor.phone}</Text>
            <Text style={styles.contactInfo}>{advisor.email}</Text>
          </View>
        </View>
        
        {/* Action buttons */}
      
      </LinearGradient>

      <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSchedule}>
            <View style={styles.actionIconContainer}>
              <Calander name="calendar-outline" size={24} color="#4c8dbd" />
            </View>
            <Text style={styles.actionText}>RDV</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <View style={styles.actionIconContainer}>
              <Phone name="call-outline" size={24} color="#4c8dbd" />
            </View>
            <Text style={styles.actionText}>Appeler</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleAgency}>
            <View style={styles.actionIconContainer}>
              <Agence name="business-outline" size={24} color="#4c8dbd" />
            </View>
            <Text style={styles.actionText}>Agence</Text>
          </TouchableOpacity>
        </View>
      {/* Main content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>À votre écoute</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Questions fréquentes</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        
        <View style={styles.separator} />
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Signaler un problème technique</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        
        <View style={styles.separator} />
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Proposer une amélioration</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </ScrollView>
      
      {/* Remove the bottom navigation section completely */}
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    // backgroundColor: '#4c8dbd', // Remove this line
    paddingTop: 20,
    paddingBottom: 50,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 20, // 100% of font size
    letterSpacing: 0,
    color: 'white',
    marginLeft: 20,
    marginBottom: 20,
  },
  advisorProfile: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  advisorPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    // Removed borderWidth and borderColor to eliminate the border
  },
  advisorInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  advisorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  advisorTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 14,
    color: 'white',
    marginBottom: 2,
  },
  actionButtons: {
    marginTop: -30, 
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  actionButton: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, // 12 in hex is about 7% opacity
    shadowRadius: 4
  },
  actionIconContainer: {
    width: 75,
    height: 75,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  actionText: {
    fontSize: 12,
    color: 'white',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16, // 100% of font size
    letterSpacing: 0,
    color: '#333',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  menuItemText: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 13, // 100% of font size
    letterSpacing: 0,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  bottomNavigation: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottomButtonsContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      bottom: -30, // Half of the button height outside the header
      zIndex: 10,
      gap: 20, // Space between the two buttons (React Native 0.71+), otherwise use margin
    },
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0033A0',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
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

export default AdvisorScreen;