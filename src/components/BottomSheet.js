import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, useDerivedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const MENU_HEIGHT = 80; // Set this to your menu/tab bar height

export default function BottomSheet({ isOpen, toggleSheet, duration = 500, children }) {
  const height = useSharedValue(0);
  // Add a flag to track initial render
  const isInitialRender = useSharedValue(true);
  
  // Animate from hidden (height) to visible (0), but skip animation on initial render
  const translateY = useDerivedValue(() => {
    // If it's the initial render and sheet should be closed, don't animate
    if (isInitialRender.value && !isOpen.value) {
      // Don't set isInitialRender to false here
      return height.value;
    }
    // Otherwise, animate as usual
    return withTiming(isOpen.value ? 0 : height.value, { duration });
  });
  
  // Use useEffect to set isInitialRender to false after the first render cycle is complete
  useEffect(() => {
    // This will run after the component has mounted
    const timer = setTimeout(() => {
      isInitialRender.value = false;
    }, 100); // Small delay to ensure we're past initial rendering
    
    return () => clearTimeout(timer); // Cleanup
  }, []);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View 
      style={StyleSheet.absoluteFill} 
      pointerEvents={isOpen.value ? "auto" : "none"}
    >
      {isOpen.value && (
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={toggleSheet} 
        />
      )}
      <Animated.View
        style={[styles.sheet, { bottom: 0 }, sheetStyle]}
        onLayout={e => { height.value = e.nativeEvent.layout.height; }}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding some opacity to make backdrop visible
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(65, 127, 201, 0.9)', // #417FC9 with 90% opacity
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    minHeight: 300, // Increased from 200 to 300
    height: '50%', // Added to make it take up half the screen height
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 10, // Lower than menu/tab bar
  },
});