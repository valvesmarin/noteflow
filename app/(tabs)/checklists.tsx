import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useNotesStore, type ChecklistNote } from '../../store/notesStore';
import { Card, Title, Text, Button, TextInput, Checkbox } from 'react-native-paper';

export default function ChecklistsScreen() {
  const { checklists, addChecklist, addItemToChecklist, toggleChecklistItem, deleteNote } = useNotesStore();

  const [title, setTitle] = useState('');
  const [selectedChecklistId, setSelectedChecklistId] = useState<string | null>(null);
  const [newItemText, setNewItemText] = useState('');

  const handleCreateChecklist = () => {
    if (!title.trim()) return;

    const newChecklist: ChecklistNote = {
      id: Date.now().toString(),
      title: title.trim(),
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addChecklist(newChecklist);
    setTitle('');
    setSelectedChecklistId(newChecklist.id);
  };

  const handleAddItem = () => {
    if (!selectedChecklistId || !newItemText.trim()) return;
    addItemToChecklist(selectedChecklistId, newItemText);
    setNewItemText('');
  };

  const selectedChecklist = checklists.find(c => c.id === selectedChecklistId);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f8f9fa' }}>
      <Title style={{ fontSize: 26, marginBottom: 20 }}>✅ Checklists</Title>

      {/* Criar nova checklist */}
      <Card style={{ marginBottom: 24 }}>
        <Card.Content>
          <TextInput
            label="Nome da checklist"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
          />
          <Button mode="contained" onPress={handleCreateChecklist} style={{ marginTop: 12 }}>
            Criar Checklist
          </Button>
        </Card.Content>
      </Card>

      {/* Lista de checklists */}
      <FlatList
        data={checklists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedChecklistId(item.id)}>
            <Card style={{ marginBottom: 12 }}>
              <Card.Content>
                <Title>{item.title}</Title>
                <Text>
                  {item.items.length} itens • {item.items.filter(i => i.isCompleted).length} concluídos
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />

      {/* Área da checklist selecionada */}
      {selectedChecklist && (
        <Card style={{ marginTop: 16 }}>
          <Card.Content>
            <Title>{selectedChecklist.title}</Title>

            <TextInput
              label="Novo item"
              value={newItemText}
              onChangeText={setNewItemText}
              mode="outlined"
              style={{ marginVertical: 12 }}
            />

            <Button mode="outlined" onPress={handleAddItem} style={{ marginBottom: 16 }}>
              + Adicionar Item
            </Button>

            <FlatList
              data={selectedChecklist.items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}
                  onPress={() => toggleChecklistItem(selectedChecklist.id, item.id)}
                >
                  <Checkbox
                    status={item.isCompleted ? 'checked' : 'unchecked'}
                    onPress={() => toggleChecklistItem(selectedChecklist.id, item.id)}
                  />
                  <Text style={{ marginLeft: 12, textDecorationLine: item.isCompleted ? 'line-through' : 'none' }}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Card.Content>
        </Card>
      )}
    </View>
  );
}