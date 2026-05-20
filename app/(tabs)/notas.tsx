import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNotesStore, type Note } from '../../store/notesStore';
import { Card, Title, Text, Button, TextInput, IconButton } from 'react-native-paper';

export default function NotasScreen() {
  const { notes, addNote, deleteNote } = useNotesStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addNote(newNote);
    setTitle('');
    setContent('');
  };

  return (
    <Card style={{ flex: 1, margin: 12 }}>
      <Card.Content>
        <Title style={{ fontSize: 26, marginBottom: 16 }}>📝 Minhas Notas</Title>

        <TextInput
          label="Título da nota"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={{ marginBottom: 12 }}
        />

        <TextInput
          label="Escreva sua nota aqui..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
          mode="outlined"
          style={{ marginBottom: 16 }}
        />

        <Button mode="contained" onPress={handleAddNote} style={{ marginBottom: 20 }}>
          Adicionar Nota
        </Button>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 12 }}>
              <Card.Content>
                <Title>{item.title}</Title>
                <Text style={{ marginTop: 8 }} numberOfLines={3}>
                  {item.content}
                </Text>
                <TouchableOpacity onPress={() => deleteNote(item.id)}>
                  <Text style={{ color: 'red', marginTop: 12 }}>Excluir</Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 40, color: '#666' }}>
              Nenhuma nota ainda. Crie a primeira acima!
            </Text>
          }
        />
      </Card.Content>
    </Card>
  );
}