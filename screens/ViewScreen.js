import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {useroute} from '@react-navigation/native';
import styles from '../Styles';

export default function ViewTask({route, navigation})
{
  const task = route.params.task;

  return(
    <View style={styles.conatiner}>
    <Text style = {style.title}> View Task Details</Text>
    <Text style= {styles.taskField}>
    {"\n"}ID: <Text style={styles.taskText}>{task.id}</Text>
    </Text>
    <Text style= {styles.taskField}>
    Task Name: <Text style={styles.taskText}>{task.name}</Text>
    </Text>
    <Text style= {styles.taskField}>
    Description: <Text style={styles.taskText}>{task. description}</Text>
    </Text>

    <View style={styles.imageContainer}>
    <Image
    source = {require('../assets/boardRoom-unsplash.jpg')}
    style = {styles.image}
  />
  </View>
  </View>
  );

}