# Configuración de Herramientas de IA - NoteFlow

## Objetivo
Documentar la configuración de las herramientas de Inteligencia Artificial utilizadas durante el desarrollo de NoteFlow para mejorar la productividad, calidad del código y coherencia del proyecto.

## Herramientas utilizadas

### 1. Cursor (IDE principal)
- **Archivo de configuración**: `.cursorrules` (creado en la raíz del proyecto)
- **Contenido principal del .cursorrules**:
  - Stack tecnológico: React Native + Expo + TypeScript + React Native Paper
  - Uso de Expo Router para navegación por pestañas
  - Estado global con Zustand + persistencia con AsyncStorage
  - Componentes de UI deben seguir el diseño consistente de React Native Paper
  - Preferencia por código limpio, tipado estricto y componentes reutilizables
  - Evitar el uso de Gluestack UI (debido a conflictos de dependencias)

### 2. Otras herramientas
- ChatGPT / Claude: utilizados puntualmente para revisión de conceptos de React Native y mejores prácticas.
- No se utilizó sistema de prompt persistente en Claude/Gemini durante esta fase.

## Justificación de la configuración
La configuración de Cursor con `.cursorrules` permite que la IA entienda el contexto técnico del proyecto desde el principio, evitando que genere código incompatible con Expo Router, Zustand o React Native Paper. Esto reduce significativamente el tiempo de corrección de errores y mantiene la coherencia del proyecto.

## Conclusión
La combinación de Cursor + ChatGpt / Claude permitió un desarrollo más rápido y estructurado, cumpliendo con los requisitos técnicos de la Fase 6.

---
