import { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alert from '../alert';
import styles from '../Styles';

export default function TaskList({ navigation }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving Tasks:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleAddTask = () => {
    /* Validation - check if all fields are filled*/
    if (
      id.trim() !== '' &&
      name.trim() !== '' &&
      description.trim() !== ''
    ) {
      const newTask = {
        id,
        name,
        description
      };

      const newTasks = tasks.concat(newTask);
      setTasks(newTasks);
      saveTasks(newTasks);

      /* Reset form fields*/
      setId('');
      setName('');
      setDescription('');

      alert('Success', 'Task has been added successfully.');
    } else {
      return alert('Missing Fields', 'Please fill out all the fields.');
    }
  };

  const viewTaskHandler = (task) => {
    navigation.navigate('ViewScreen', { task });
  };

  const deleteTask = (index) => {
    let updatedTasks = tasks.concat();
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteHandler = (index) => {
    return alert(
      'Delete Task',
      'Are you sure you want to delete ' + tasks[index].name + '?',
      [
        {
          text: 'Yes',
          onPress: () => deleteTask(index),
        },
        {
          text: 'No',
        },
      ]
    );
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Task List</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ID"
          placeholderTextColor="#D9D9D9"
          value={id}
          onChangeText={(text) => setId(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Task Name"
          placeholderTextColor="#D9D9D9"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          placeholderTextColor="#D9D9D9"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>ADD TASK DETAILS</Text>
        </TouchableOpacity>
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskField}>
                ID: <Text style={styles.taskText}>{item.id}</Text>
              </Text>
              <Text style={styles.taskField}>
                Task Name: <Text style={styles.taskText}>{item.name}</Text>
              </Text>
              <Text style={styles.taskField}>
                description: <Text style={styles.taskText}>{item.description}</Text>
              </Text>
            
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => viewTaskHandler(item)}>
                  <Text style={styles.actionText}>VIEW TASK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  key={index}
                  style={styles.actionButton}
                  onPress={() => deleteHandler(index)}>
                  <Text style={styles.actionText}>DELETE TASK</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}
