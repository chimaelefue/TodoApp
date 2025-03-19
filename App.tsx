import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, StyleSheet, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");
  // const [sNumber, setSNumber] = useState(1);

  // Load Todos from AsyncStorage
  useEffect(() => {
    const loadTodos = async () => {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos) setTodos(JSON.parse(storedTodos));
    };
    loadTodos();
  }, []);

  // Save Todos to AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") {
      Alert.alert("Error", "Todo cannot be empty!");
      return;
    }
    setTodos([...todos, newTodo]);
    setNewTodo("");
    // setSNumber(sNumber + 1);
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    // setSNumber(sNumber - 1);
  };

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Todo" onPress={addTodo} />
        </View>
      </View>

      <View style={styles.totalStyle}>
        <Text style={styles.totalText}>Total: {todos.length}</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={todos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TodoItem  text={item} onDelete={() => deleteTodo(index)} />
          
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    paddingTop: 80,
    height: "100%",
    width: "100%",
    rowGap:"60"
  },
  content: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", 
    gap: "10"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#ddd",
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 5, 
    borderRadius: 5,
    fontSize: 20,
  },
  listContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  totalStyle: {
    marginBottom: 5, 
  },
  totalText: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",  
  },
});

export default App;
