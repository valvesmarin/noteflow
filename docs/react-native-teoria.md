# React Native - Teoría y Fundamentos

## ¿Qué es React Native?

React Native es un framework de desarrollo mobile creado por Facebook que permite crear aplicaciones nativas para iOS y Android utilizando JavaScript y React. A diferencia de las aplicaciones híbridas (como Ionic o Cordova), React Native **no** renderiza en un WebView. En su lugar, se comunica directamente con el sistema operativo para crear componentes nativos reales (UIView en iOS y android.view en Android).

## Diferencia entre React Native y una app nativa

- **App Nativa (Swift/Kotlin)**: Código escrito directamente en el lenguaje nativo del sistema operativo. Máximo rendimiento y acceso total a las APIs.
- **React Native**: Código en JavaScript/React que se traduce a componentes nativos reales. Ofrece un rendimiento muy cercano al nativo, con la ventaja de poder compartir código entre iOS y Android.

## Arquitectura de React Native

React Native tiene **dos hilos** principales:
- **JavaScript Thread**: Donde se ejecuta nuestro código React, lógica de negocio, Zustand, etc.
- **UI Thread (Native Thread)**: Donde se renderizan los componentes reales del sistema operativo.

Cuando el hilo de JavaScript se bloquea, la interfaz se congela. Por eso es importante mantener el JS Thread lo más ligero posible.

## Expo Go vs Development Build

- **Expo Go**: Entorno rápido para desarrollo. Se escanea un QR Code y la app corre sin compilar. Ideal para prototipos, pero **no soporta** módulos nativos personalizados (cámara avanzada, notificaciones push, biometría, etc.).
- **Development Build**: Versión personalizada de la app (generada con EAS Build). Es un binario real que permite usar cualquier módulo nativo. En proyectos reales, siempre se usa Development Build.

En esta fase estamos usando Expo Go para agilizar el desarrollo.

## Expo Router

Expo Router utiliza el sistema de archivos para definir rutas. La carpeta `app/` define las pantallas. La carpeta `(tabs)` crea una navegación por pestañas sin aparecer en la URL.

Esta arquitectura (Tabs + Stack + Modales) es la más recomendada actualmente para aplicaciones con varias secciones principales.

---
