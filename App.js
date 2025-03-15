import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, Platform, View } from 'react-native';
import { CheckBox, Input, Button } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 25 : 0,
  },
});

export default function App() {
  const [tasks, setTasks] = React.useState([
    { key: "1", description: "Workout" },
    { key: "2", description: "Water Plants" },
  ]);
  const [newTask, setNewTask] = React.useState('');

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          checked={item.completed}
          onPress={() => {
            const updatedTasks = tasks.map((task) =>
              task.key === item.key ? { ...task, completed: !task.completed } : task
            );
            setTasks(updatedTasks);
          }}
        />
        <Text
          style={{
            //Brought to you in part by: https://stackoverflow.com/questions/35762351/correct-way-to-handle-conditional-styling-in-react
            textDecorationLine: item.completed ? 'line-through' : 'none',
            textDecorationStyle: 'solid',
          }}
        >
          {item.description}
        </Text>
      </View>
    );
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        {
          key: String(Date.now()),
          description: newTask,
          completed: false,
        },
      ]);
      setNewTask('');
    }
  };

  return (
    //This part brought to you in large part by https://reactnative.dev/docs/flatlist
    <SafeAreaView style={styles.container}>
      <FlatList data={tasks} renderItem={renderItem} />
      <Input placeholder="New Task" value={newTask} onChangeText={setNewTask} />
      <Button title="Add" onPress={addTask} />
    </SafeAreaView>
  );
}