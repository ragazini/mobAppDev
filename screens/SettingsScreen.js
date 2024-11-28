import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../Styles';

export default function Settings({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Screen Brightness: </Text>
        <Image
          source={require('../assets/brightnessSlider.png')}
          style={styles.icon}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Adjust Text Size: </Text>
        <Image
          source={require('../assets/fontSizer.png')}
          style={styles.icon}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Sound:</Text>
        <Image
          source={require('../assets/soundControl.png')}
          style={styles.icon}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}> Return Home </Text>
      </TouchableOpacity>
    </View>
  );
}
