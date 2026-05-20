import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useNotesStore, type IdeaNote } from '../../store/notesStore';
import { Card, Title, Text, Button, TextInput, Chip } from 'react-native-paper';

const colors = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];

export default function IdeasScreen() {
  const { ideas, addIdea, deleteNote } = useNotesStore();

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleAddIdea = () => {
    if (!title.trim()) return;

    const newIdea: IdeaNote = {
      id: Date.now().toString(),
      title: title.trim(),
      tags: [...tags],
      color: selectedColor,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addIdea(newIdea);
    setTitle('');
    setTags([]);
    setNewTag('');
  };

  const handleAddTag = () => {
    if (!newTag.trim() || tags.includes(newTag.trim())) return;
    setTags([...tags, newTag.trim()]);
    setNewTag('');
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f8f9fa' }}>
      <Title style={{ fontSize: 28, marginBottom: 20 }}>💡 Ideias Rápidas</Title>

      <Card style={{ marginBottom: 20 }}>
        <Card.Content>
          <TextInput
            label="Título da ideia"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />

          <TextInput
            label="Adicionar tag"
            value={newTag}
            onChangeText={setNewTag}
            mode="outlined"
            style={{ marginBottom: 8 }}
            onSubmitEditing={handleAddTag}
          />

          <Button mode="outlined" onPress={handleAddTag} style={{ marginBottom: 12 }}>
            Adicionar Tag
          </Button>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {tags.map((tag, index) => (
              <Chip key={index} onClose={() => setTags(tags.filter(t => t !== tag))}>
                #{tag}
              </Chip>
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: color,
                  borderRadius: 20,
                  borderWidth: selectedColor === color ? 3 : 0,
                  borderColor: '#000',
                }}
              />
            ))}
          </View>

          <Button mode="contained" onPress={handleAddIdea}>
            Salvar Ideia
          </Button>
        </Card.Content>
      </Card>

      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12, backgroundColor: item.color + '20' }}>
            <Card.Content>
              <Title style={{ color: item.color }}>{item.title}</Title>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {item.tags.map((tag, index) => (
                  <Text key={index} style={{ fontSize: 12, backgroundColor: '#e2e8f0', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>
                    #{tag}
                  </Text>
                ))}
              </View>
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
                <Text style={{ color: 'red', marginTop: 12 }}>Excluir</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#666' }}>
            Nenhuma ideia ainda. Crie a primeira acima!
          </Text>
        }
      />
    </View>
  );
}