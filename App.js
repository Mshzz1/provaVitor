import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Lista from './Screens/lista';
import FormInserirContato from './Screens/formInserirContato';

const Stack = createStackNavigator();

function list({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lista Telefônica</Text>
      </View>
      <View style={styles.box}>
        <Lista />
      </View>
      <TouchableOpacity
        style={styles.botaoInserir}
        onPress={() => navigation.navigate('FormInserirContato')}
      >
        <Text style={styles.botaoInserirTexto}>Inserir Contato</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="list" component={list} />
        <Stack.Screen name="FormInserirContato" component={FormInserirContato} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#2196f3',
    fontSize: 22,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  box: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
  },
  botaoInserir: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  botaoInserirTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});