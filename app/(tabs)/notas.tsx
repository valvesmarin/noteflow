import { useState } from 'react';
import { FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNotesStore, type Note } from '../../store/notesStore';
import { Box, Heading, Text, Button, VStack } from '@gluestack-ui/themed';

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
    <Box flex={1} bg="$background" p="$4">
      <Heading size="xl" mb="$6" color="$textDark">
        📝 Minhas Notas
      </Heading>

      <VStack space="md" mb="$6">
        <TextInput
          placeholder="Título da nota"
          value={title}
          onChangeText={setTitle}
          style={{
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#e2e8f0',
          }}
        />

        <TextInput
          placeholder="Escreva sua nota aqui..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
          style={{
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#e2e8f0',
            minHeight: 100,
          }}
        />

        <Button onPress={handleAddNote}>
          <Button.Text>Adicionar Nota</Button.Text>
        </Button>
      </VStack>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box
            bg="$white"
            p="$4"
            mb="$3"
            borderRadius="$md"
            borderWidth={1}
            borderColor="$borderLight"
          >
            <Heading size="md">{item.title}</Heading>
            <Text numberOfLines={2} mt="$2" color="$textLight">
              {item.content}
            </Text>
            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Text color="$error" mt="$3" fontSize="$sm">
                Excluir
              </Text>
            </TouchableOpacity>
          </Box>
        )}
        ListEmptyComponent={
          <Text textAlign="center" color="$textLight" mt="$10">
            Nenhuma nota ainda. Crie sua primeira nota acima!
          </Text>
        }
      />
    </Box>
  );
}