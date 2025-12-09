# 📱 Sådan installerer du Okey App på din mobil

## Forudsætninger

✅ Appen skal være deployet på HTTPS (fx på Netlify) eller køre på localhost  
✅ Du skal åbne appen i browseren på din mobil

---

## 📱 Android (Chrome/Samsung Internet)

### Metode 1: Via browser prompt
1. Åbn appen i **Chrome** eller **Samsung Internet** på din Android-telefon
2. Du vil se en **"Tilføj til startskærm"** eller **"Install app"** prompt nederst på skærmen
3. Tryk på **"Tilføj"** eller **"Install"**
4. Appen installeres og vises på din startskærm! 🎉

### Metode 2: Via menu
1. Åbn appen i browseren
2. Tryk på **menu-knappen** (tre prikker) → **"Tilføj til startskærm"** eller **"Install app"**
3. Bekræft installationen
4. Appen vises nu på din startskærm!

---

## 🍎 iOS (Safari)

### Trin 1: Åbn appen i Safari
1. Åbn **Safari** (ikke Chrome!) på din iPhone/iPad
2. Gå til appens URL (fx din Netlify URL)

### Trin 2: Tilføj til startskærm
1. Tryk på **deling-knappen** (firkant med pil opad) nederst på skærmen
2. Scroll ned og tryk på **"Tilføj til startskærm"**
3. Vælg ikon og navn (hvis ønsket)
4. Tryk på **"Tilføj"** øverst til højre
5. Appen vises nu på din startskærm! 🎉

### Tips:
- Appen åbner i standalone mode (uden browser UI)
- Fungerer offline efter første besøg
- Kan bruges ligesom en native app

---

## 🌐 Hvis appen er deployet på Netlify

1. Åbn din Netlify URL på mobilen (fx `https://din-app.netlify.app`)
2. Følg instruktionerne ovenfor for din platform
3. Appen installeres automatisk!

---

## 🔧 Hvis du tester lokalt

### Android:
1. Sørg for at mobilen er på samme WiFi som din computer
2. Åbn `http://[DIN-IP]:5173` i Chrome på mobilen
3. Chrome vil vise en advarsel om "Ikke sikker" - dette er OK for lokal udvikling
4. Følg Metode 2 ovenfor (via menu)

### iOS:
1. Sørg for at mobilen er på samme WiFi som din computer  
2. Åbn `http://[DIN-IP]:5173` i Safari på mobilen
3. iOS kræver HTTPS for PWA installation, så du skal bruge en HTTPS tunnel:
   - Brug **ngrok**: `ngrok http 5173`
   - Eller deploy til Netlify for at teste installation

---

## ✅ Verificer installation

Efter installation:
- ✅ Appen vises på startskærmen med dit ikon
- ✅ Åbner i standalone mode (uden browser UI)
- ✅ Fungerer offline (efter første besøg)
- ✅ Har sin egen app-ikon i app-switcher

---

## 🐛 Fejlfinding

**"Install app" prompt vises ikke:**
- Tjek at du er på HTTPS (eller localhost)
- Tjek at service worker er registreret (se browser console)
- Tjek at manifest.webmanifest er tilgængelig
- Prøv at rydde browser cache

**Appen virker ikke offline:**
- Tjek at service worker er aktiv (Chrome DevTools → Application → Service Workers)
- Tjek browser console for fejl

**iOS: "Tilføj til startskærm" mangler:**
- Du skal bruge Safari (ikke Chrome)
- Appen skal være på HTTPS (ikke HTTP, medmindre det er localhost)

