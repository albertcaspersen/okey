# Mobile Setup Guide

## ✅ Forberedelse (Allerede gjort!)

1. ✅ Web-appen er bygget
2. ✅ Native projekter er synced

---

## 📱 iOS - Få appen på iPhone/iPad

### Metode 1: iOS Simulator (hurtigste vej)

1. **Åbn Xcode:**
   ```bash
   npm run cap:ios
   ```

2. **I Xcode:**
   - Øverst i Xcode, klik på enhedsmenuen (fx "iPhone 15 Pro")
   - Vælg en simulator (fx "iPhone 15 Pro" eller "iPhone 14")
   - Klik på "Run" knappen (▶️) eller tryk `Cmd + R`
   - Simulatoren starter og appen installeres automatisk

### Metode 2: Fysisk iPhone/iPad

**Første gang setup:**

1. **Forbind din iPhone/iPad til Mac'en** med USB-kabel

2. **Åbn Xcode:**
   ```bash
   npm run cap:ios
   ```

3. **I Xcode:**
   - Klik på enhedsmenuen øverst
   - Vælg din iPhone/iPad (den skal være tilsluttet)
   - Hvis du får en fejl om "Untrusted Developer":
     - Gå til iPhone/iPad: **Indstillinger → Generelt → VPN og enhedsadministration**
     - Find din udviklerkonto og tryk "Tillid"

4. **Vælg Team/Signing:**
   - I Xcode, klik på "App" projektet i venstre sidebar
   - Vælg "App" target
   - Gå til "Signing & Capabilities" tab
   - Vælg dit Apple ID under "Team" (eller opret en gratis Apple Developer konto)
   - Xcode vil automatisk oprette et provisioning profile

5. **Kør appen:**
   - Klik på "Run" (▶️) eller `Cmd + R`
   - Appen installeres på din iPhone/iPad

**Næste gange:**
- Bare kør `npm run cap:ios` og tryk Run i Xcode

---

## 🤖 Android - Få appen på Android telefon

### Metode 1: Android Emulator

**Første gang - Installer Android Studio:**

1. Download Android Studio fra: https://developer.android.com/studio
2. Installer Android Studio
3. Åbn Android Studio og installer SDK og emulator gennem setup wizard

**Kør appen:**

1. **Åbn Android Studio:**
   ```bash
   npm run cap:android
   ```

2. **I Android Studio:**
   - Vælg en emulator fra dropdown (eller opret en ny via AVD Manager)
   - Klik på "Run" (▶️) knappen
   - Emulatoren starter og appen installeres

### Metode 2: Fysisk Android telefon

**Første gang setup:**

1. **Aktiver Developer Options på din telefon:**
   - Gå til **Indstillinger → Om telefonen**
   - Tryk 7 gange på "Build-nummer" eller "Build Number"
   - Du får besked om at Developer Options er aktiveret

2. **Aktiver USB Debugging:**
   - Gå til **Indstillinger → Udviklerindstillinger** (eller **Developer Options**)
   - Slå "USB-debugging" til

3. **Forbind telefon til Mac'en:**
   - Brug USB-kabel
   - På telefonen, accepter "Tillad USB-debugging" prompt

4. **Åbn Android Studio:**
   ```bash
   npm run cap:android
   ```

5. **I Android Studio:**
   - Din telefon skulle nu vises i enhedsmenuen
   - Vælg din telefon
   - Klik på "Run" (▶️)
   - Appen installeres på din telefon

**Næste gange:**
- Bare kør `npm run cap:android` og tryk Run i Android Studio

---

## 🔄 Opdater appen efter ændringer

Hver gang du laver ændringer i koden:

```bash
# 1. Byg web-appen
npm run build

# 2. Sync til mobile projekter
npm run cap:sync

# 3. Åbn i Xcode eller Android Studio og kør igen
npm run cap:ios      # eller
npm run cap:android
```

---

## 📝 Vigtige noter

- **iOS:** Du skal have en Apple ID (gratis) for at køre på fysisk enhed
- **Android:** USB-debugging skal være aktiveret på telefonen
- Appen er konfigureret til standalone mode med:
  - Safe area support (notch/status bar)
  - Ingen zoom
  - Fuldt skærm
  - Mobile-optimerede meta tags

---

## 🆘 Troubleshooting

**iOS:**
- Hvis Xcode ikke finder din telefon: Tjek at telefonen er låst op og tillid er givet
- Hvis signing fejler: Vælg dit Apple ID i Signing & Capabilities

**Android:**
- Hvis telefonen ikke vises: Tjek USB-debugging er aktiveret
- Hvis adb ikke finder enheden: Kør `adb devices` i terminalen for at se tilkoblede enheder

