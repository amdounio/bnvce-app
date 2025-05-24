import { StyleSheet, Platform } from 'react-native';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
    // Add padding for Dynamic Island on iOS
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'ios' ? 20 : 15, // Extra padding for Dynamic Island
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
  },
  welcomeTextContainer: {
    marginLeft: 15,
  },
  welcomeText: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 12, // 100% of font size
    letterSpacing: 0,
    color: '#666',
  },
  userName: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 20, // 100% of font size
    letterSpacing: 0,
    color: '#333',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  scrollContent: {
    flex: 1,
  },
  cardsScrollView: {
    paddingVertical: 15,
    paddingLeft: 15,
  },
  insuranceCard: {
    width: 280,
    height: 180,
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  companyLogo: {
    width: 50,
    height: 20,
    resizeMode: 'contain',
  },
  insuranceType: {
    fontSize: 16,
    fontWeight: '500',
  },
  insuranceAmount: {
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
  newsSection: {
    padding: 20,
  },
  newsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  newsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 13, // 100% of font size
    letterSpacing: 0,
    color: '#0E134D',
    // Remove background if present, as only color is requested
  },
  newsArticle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  articleImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  articleContent: {
    flex: 1,
    padding: 10,
  },
  articleTitle: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0,
    color: '#333',
    marginBottom: 25, // Increased spacing
  },
  articleDescription: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 11, // 100% of font size
    letterSpacing: 0,
    color: '#666',
    marginBottom: 20,
  },
  articleDate: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 10, // 100% of font size
    letterSpacing: 0,
    color: '#999',
  },
  bottomNavigation: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
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
  // Add these new styles
  loader: {
    marginVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    color: '#E30613',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default HomeStyles;