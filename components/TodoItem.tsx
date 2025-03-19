import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CheckBox from "@react-native-community/checkbox";


interface TodoItemProps {
  text: string;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ text, onDelete }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };
  

  return (
    <View style={styles.todoItem}>
      <View style={styles.checkboxContainer}>
      <TouchableOpacity onPress={handleCheck} style={{ width: 20, height: 20, borderWidth:1, backgroundColor: isChecked ? "#0096FF" : "white" }} />

      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.todoText, isChecked && styles.checkedText]}>{text}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="cancel" size={28} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  checkboxContainer: {
    flex: 0.1, // Adjust size of checkbox container
  },
  textContainer: {
    flex: 0.8,
  },
  todoText: {
    fontSize: 18,
    fontWeight: "600",
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: "#0096FF",
  },
});

export default TodoItem;
