# Android Setup Guide

## Status
✅ Android-projektet er synkroniseret og klar
✅ CocoaPods er installeret (til iOS senere)
❌ JDK mangler - skal installeres for at bygge Android-apps

## Trin 1: Installer JDK (Java Development Kit)

Du har to muligheder:

### Option A: Installer via Homebrew (anbefalet)
```bash
brew install --cask zulu@17
```
Dette kræver din adgangskode.

### Option B: Download manuelt
1. Gå til https://www.azul.com/downloads/?package=jdk#zulu
2. Download Zulu JDK 17 for macOS (ARM64 hvis du har Apple Silicon)
3. Installer .dmg filen

## Trin 2: Verificer JDK installation
Efter installation, tjek at det virker:
```bash
java -version
/usr/libexec/java_home -V
```

## Trin 3: Byg Android-appen

Når JDK er installeret, kan du bygge projektet:

```bash
cd android
./gradlew assembleDebug
```

Dette vil oprette en APK fil i `android/app/build/outputs/apk/debug/`

## Trin 4: Kør på emulator eller fysisk enhed

### Med Android Studio:
1. Installer Android Studio fra https://developer.android.com/studio
2. Åbn `android` mappen i Android Studio
3. Vælg en emulator eller tilslut en fysisk enhed
4. Klik "Run"

### Med Capacitor CLI:
```bash
npx cap run android
```

## Trin 5: Live reload under udvikling

For at se ændringer i appen mens du udvikler:

1. Terminal 1 - Start dev server:
```bash
npm run dev
```

2. Terminal 2 - Kør appen:
```bash
npx cap run android
```

## Nyttige kommandoer

- Synkroniser web assets til Android: `npx cap sync android`
- Byg debug APK: `cd android && ./gradlew assembleDebug`
- Byg release APK: `cd android && ./gradlew assembleRelease`
- Rens build: `cd android && ./gradlew clean`

## Troubleshooting

### "Unable to locate a Java Runtime"
- Sørg for at JDK er installeret (se Trin 1)
- Tjek JAVA_HOME: `echo $JAVA_HOME`

### Gradle build fejler
- Prøv at rense: `cd android && ./gradlew clean`
- Synkroniser igen: `npx cap sync android`

### Appen viser ikke opdateringer
- Synkroniser assets: `npx cap sync android`
- Byg igen: `cd android && ./gradlew assembleDebug`

