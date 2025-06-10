import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('database.db');

const tabelas: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

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

    const fetchContacts = async () => {
        try {
            const rows = await db.getAllAsync('SELECT * FROM contatos;');
            setData(rows);
        } catch (error) {
            console.error('Erro ao buscar contatos', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SQLite Integration</Text>
            <TouchableOpacity style={styles.button} onPress={fetchContacts}>
                <Text style={styles.buttonText}>Buscar Contatos</Text>
            </TouchableOpacity>
            <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.Nome} - {item.Numero}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#e0e0e0' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#2196f3', marginBottom: 12 },
    button: { backgroundColor: '#2196f3', padding: 10, borderRadius: 6, marginBottom: 12, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    item: { padding: 10, backgroundColor: '#fff', borderRadius: 6, marginBottom: 8 },
    text: { color: '#2196f3', fontSize: 16 }
});

export default tabelas;