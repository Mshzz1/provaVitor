import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('database.db');

export default function FormInserirContato({ navigation }) {
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');

  const inserirContato = async () => {
    if (!nome || !numero) {
      Alert.alert('Preencha todos os campos!');
      return;
    }
    try {
      await db.runAsync(
        'INSERT INTO contatos (nome, numero) VALUES (?, ?)', [nome, numero]
      );
      Alert.alert('Contato inserido com sucesso!');
      setNome('');
      setNumero('');
      navigation.goBack(); // Volta para a tela anterior (lista)
    } catch (error) {
      Alert.alert('Erro ao inserir contato');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserir Contato</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#2196f3"
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="phone-pad"
        placeholderTextColor="#2196f3"
      />
      <TouchableOpacity  
        style={styles.button} 
        onPress={inserirContato}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#e0e0e0', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2196f3', marginBottom: 16, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#2196f3',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    color: '#2196f3',
    backgroundColor: '#fff'
  },
  button: { backgroundColor: '#2196f3', padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});