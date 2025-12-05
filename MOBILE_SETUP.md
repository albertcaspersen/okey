# Mobile Setup Guide

## Forberedelse

1. **Byg web-appen:**
   ```bash
   npm run build
   ```

2. **Sync til native projekter:**
   ```bash
   npm run cap:sync
   ```

## Android

1. **Åbn Android Studio:**
   ```bash
   npm run cap:android
   ```

2. **Eller kør direkte på enhed:**
   ```bash
   npm run cap:run:android
   ```

3. I Android Studio:
   - Vælg din enhed/emulator
   - Klik på "Run" (▶️)

## iOS

1. **Åbn Xcode:**
   ```bash
   npm run cap:ios
   ```

2. **Eller kør direkte på enhed:**
   ```bash
   npm run cap:run:ios
   ```

3. I Xcode:
   - Vælg din enhed/simulator
   - Klik på "Run" (▶️)

## Vigtige noter

- Efter hver `npm run build`, kør `npm run cap:sync` for at opdatere native projekter
- Appen er konfigureret til standalone mode med:
  - Safe area support (notch/status bar)
  - Ingen zoom
  - Fuldt skærm
  - Status bar styling

## Troubleshooting

Hvis appen ikke vises korrekt:
1. Tjek at `dist` mappen er opdateret: `npm run build`
2. Sync igen: `npm run cap:sync`
3. Rens build i Android Studio/Xcode og byg igen

