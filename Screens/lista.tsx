import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('database.db');

type Contato = {
  id: number;
  nome: string;
  numero: string;
};

export default function Lista() {
  const [contatos, setContatos] = useState<Contato[]>([]);

  useEffect(() => {
    fetchContatos();
  }, []);

  useEffect(() => {
          initializeDatabase();
      }, []);
  
      const initializeDatabase = async () => {
          try {   
              await db.execAsync(
                  'CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome varchar(100), numero varchar(100))'
              );
              console.log('Tabela criada');
          } catch (error) {
              console.error('Erro', error);
          }
      };

  const fetchContatos = async () => {
    try {
      const rows : Contato[] = await db.getAllAsync('SELECT * FROM contatos order by nome');
      setContatos(rows);
    } catch (error) {
      console.error('Erro ao buscar contatos', error);
    }
  };

  return (
    <FlatList
      data={contatos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.contato}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.telefone}>{item.numero}</Text>
            <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>Ligar</Text>
            </TouchableOpacity>
        </View>
    )}
    />
  );
}

const styles = StyleSheet.create({
  contato: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196f3',
    flex: 2,
  },
  telefone: {
    fontSize: 15,
    color: '#2196f3',
    flex: 2,
    marginLeft: 10,
  },
  botao: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});