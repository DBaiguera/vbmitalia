# V.B.M. - Sito Web

Sito web professionale per **V.B.M.**, specializzati in lavorazione marmi e mobili su misura.

**Ex Traditione ad Futurum** - Dalla tradizione al futuro

## 📁 Struttura del Sito

```
Sito/
├── index.html          # Homepage con slider
├── marmi.html          # Pagina lavorazione marmi
├── mobili.html         # Pagina mobili su misura
├── chi-siamo.html      # Storia e valori aziendali
├── contatti.html       # Form contatti e informazioni
├── css/
│   ├── style.css       # Stili principali
│   └── gallery.css     # Stili gallerie e pagine interne
├── js/
│   ├── main.js         # JavaScript principale (menu, slider, form)
│   ├── gallery-loader.js  # Caricamento gallerie
│   └── load-images.js  # Utility caricamento immagini
└── images/
    ├── slider/         # Immagini slider homepage (3)
    ├── marmi/
    │   ├── progetti/
    │   │   ├── brescia/     # 42 immagini
    │   │   ├── montecarlo/  # 28 immagini
    │   │   └── novatek/     # 91 immagini
    │   └── laboratorio/     # 30 immagini
    ├── mobili/         # 16 immagini mobili
    └── storia/         # 8 immagini storiche
```

**Totale: 215 immagini organizzate**

---

## 🚀 Come Aprire il Sito

### Metodo 1: Aprire Direttamente (Semplice)
1. Vai nella cartella `Sito`
2. Fai **doppio click su `index.html`**
3. Il sito si aprirà nel tuo browser predefinito

### Metodo 2: Con Server Locale (Consigliato)

Per vedere correttamente tutte le funzionalità (specialmente le gallerie), usa un server locale:

#### Opzione A - Live Server (Visual Studio Code)
1. Apri la cartella `Sito` in VS Code
2. Installa l'estensione "Live Server"
3. Click destro su `index.html` → "Open with Live Server"

#### Opzione B - Python
```bash
cd Sito
python -m http.server 8000
```
Poi apri: http://localhost:8000

#### Opzione C - Node.js
```bash
cd Sito
npx serve
```

---

## ✨ Funzionalità del Sito

### ✅ Homepage (`index.html`)
- **Slider automatico** con 3 immagini e citazioni
- Sezione servizi (Marmi, Mobili, Progetti)
- Anteprima "Chi Siamo"
- Call-to-action contatti

### ✅ Pagina Marmi (`marmi.html`)
- **3 progetti in galleria:**
  - Casa Privata Brescia (42 foto)
  - Casa Privata Montecarlo (28 foto)
  - Scala Novatek (91 foto)
- Sezione laboratorio con 30 foto
- Lista servizi offerti
- **Lightbox** per ingrandire le immagini

### ✅ Pagina Mobili (`mobili.html`)
- Galleria con 16 immagini
- 6 categorie di mobili:
  - Living & Soggiorni
  - Camere da Letto
  - Cucine
  - Uffici & Studio
  - Porte & Boiserie
  - Complementi
- Sezione materiali e finiture
- Processo di lavoro in 4 step

### ✅ Pagina Chi Siamo (`chi-siamo.html`)
- Storia aziendale
- 6 valori fondamentali
- Timeline storica (1950-2026)
- Galleria immagini storiche
- Sezione team

### ✅ Pagina Contatti (`contatti.html`)
- **Form funzionante** con validazione
- Informazioni contatto complete
- Orari di apertura
- Placeholder per Google Maps
- Social media links

### ✅ Sistema Multilingua 🇮🇹🇬🇧
- **Italiano / Inglese**
- Switch lingua in header
- Preferenza salvata nel browser

### ✅ Responsive Design 📱
- Ottimizzato per desktop, tablet e mobile
- Menu hamburger su mobile
- Gallerie adattive

---

## 🎨 Personalizzazione

### Cambiare Testi
Apri i file `.html` e cerca le sezioni che vuoi modificare. Ogni testo ha due versioni:
- `data-it="testo italiano"`
- `data-en="English text"`

Esempio:
```html
<h2 data-it="I Nostri Servizi" data-en="Our Services">
    I Nostri Servizi
</h2>
```

### Cambiare Colori
Apri `css/style.css` e modifica le variabili CSS all'inizio:
```css
:root {
    --primary-color: #2c2c2c;      /* Colore principale */
    --secondary-color: #8b7355;     /* Colore secondario */
    --accent-color: #c9a882;        /* Accento */
}
```

### Aggiungere/Sostituire Immagini
1. Copia le nuove immagini nella cartella appropriata in `images/`
2. Le gallerie caricheranno automaticamente tutte le immagini `.jpg`, `.jpeg`, `.png`

### Modificare Informazioni di Contatto
Cerca nel file `contatti.html` e negli altri HTML:
- `Via [Indirizzo], Italia` → Inserisci indirizzo reale
- `+39 [Telefono]` → Inserisci telefono reale
- `info@vbm.it` → Cambia email

---

## 📤 Come Pubblicare Online

### Opzione 1: Hosting Condiviso (più semplice)
1. Acquista hosting (es. Aruba, SiteGround, Hostinger)
2. Carica tutti i file via FTP/FileManager
3. Configurare il dominio

### Opzione 2: WordPress (come discusso)
Questo sito può essere facilmente convertito in tema WordPress:
1. Crea cartella tema in `wp-content/themes/vittorio/`
2. Converti i file HTML in template PHP
3. Aggiungi `style.css` con header tema
4. Crea `functions.php` per funzionalità

### Opzione 3: Netlify/Vercel (Gratuito)
1. Crea account su Netlify o Vercel
2. Connetti il repository o carica la cartella `Sito`
3. Deploy automatico

---

## 🔧 Manutenzione

### Aggiungere Nuovi Progetti Marmi
1. Crea nuova cartella in `images/marmi/progetti/nome-progetto/`
2. Copia le immagini del progetto
3. Apri `marmi.html`
4. Copia un blocco `<div class="project-block">` esistente
5. Modifica titolo, descrizione e ID galleria
6. Aggiungi riferimento in `js/gallery-loader.js`

### Aggiungere Nuove Immagini Mobili
1. Copia le immagini in `images/mobili/`
2. Le gallerie si aggiorneranno automaticamente

### Modificare Slider Homepage
1. Le immagini dello slider sono in `images/slider/`
2. Sostituisci `slide1.jpg`, `slide2.jpg`, `slide3.jpg`
3. Oppure aggiungi nuove slide modificando `index.html` e `js/main.js`

---

## 📝 Configurare Form Contatti

Il form attualmente mostra solo un messaggio di successo. Per renderlo funzionante:

### Opzione 1: Formspree (Gratuito)
1. Vai su https://formspree.io
2. Crea account e ottieni endpoint
3. In `contatti.html` modifica il form:
```html
<form action="https://formspree.io/f/TUO_ID" method="POST">
```

### Opzione 2: PHP Mail
Crea file `send-mail.php`:
```php
<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

mail('info@vbm.it', 'Nuovo messaggio', $message);
?>
```

### Opzione 3: Servizi WordPress
Se converti in WordPress, usa plugin come Contact Form 7 o WPForms.

---

## 🗺️ Aggiungere Google Maps

1. Vai su https://google.com/maps
2. Cerca il tuo indirizzo
3. Click su "Condividi" → "Incorpora mappa"
4. Copia il codice `<iframe>`
5. In `contatti.html`, sostituisci la sezione `.map-placeholder` con:

```html
<div class="map-embed">
    <iframe
        src="URL_GOOGLE_MAPS"
        width="100%"
        height="400"
        style="border:0;"
        allowfullscreen=""
        loading="lazy">
    </iframe>
</div>
```

---

## 🎯 SEO e Ottimizzazioni

### Modificare Meta Tag
In ogni file HTML, aggiorna:
```html
<title>Titolo Pagina - Vittorio Mobili e Marmi</title>
<meta name="description" content="Descrizione pagina per Google">
```

### Ottimizzare Immagini
Le immagini sono già ottimizzate con `loading="lazy"`. Per ulteriori ottimizzazioni:
1. Comprimi le immagini con TinyPNG o ImageOptim
2. Converti in formato WebP per prestazioni migliori

### Google Analytics
Aggiungi prima di `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TUO_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'TUO_ID');
</script>
```

---

## 🛠️ Tecnologie Utilizzate

- **HTML5** - Struttura semantica
- **CSS3** - Stili moderni con CSS Grid e Flexbox
- **JavaScript (Vanilla)** - Nessuna dipendenza esterna
- **Google Fonts** - Cormorant Garamond & Montserrat
- **Responsive Design** - Mobile-first approach

---

## 📞 Supporto

Per domande o problemi con il sito:
1. Controlla questo README
2. Verifica la console del browser (F12) per errori
3. Assicurati che tutti i file siano nella posizione corretta

---

## 📋 Checklist Prima di Pubblicare

- [ ] Sostituire tutti i placeholder `[Indirizzo]`, `[Telefono]`, etc.
- [ ] Configurare form contatti con servizio email
- [ ] Aggiungere Google Maps
- [ ] Aggiungere link social media reali
- [ ] Testare su diversi browser (Chrome, Firefox, Safari, Edge)
- [ ] Testare su mobile
- [ ] Verificare che tutte le immagini si carichino
- [ ] Creare Privacy Policy e Cookie Policy
- [ ] Configurare Google Analytics
- [ ] Testare tutte le lingue (IT/EN)
- [ ] Verificare velocità con PageSpeed Insights

---

## 💼 Per Vendere il Sito

### Cosa Includere
1. Tutti i file nella cartella `Sito/`
2. Questo README
3. Accesso hosting e dominio
4. 2-3 ore di formazione su come aggiornare contenuti

### Pacchetto Manutenzione Annuale
Offri servizi di:
- Aggiornamenti contenuti (max 2/mese)
- Backup mensili
- Aggiornamenti sicurezza
- Supporto tecnico
- Aggiunta nuovi progetti/immagini

**Prezzo consigliato:** €500-1000/anno

---

## 🎨 **Branding**

### Logo e Motto
- **Nome:** V.B.M.
- **Motto:** Ex Traditione ad Futurum (Dalla tradizione al futuro)
- **Logo:** `images/logo-vbm.png` (1184x864px)

Il logo appare:
- Nella navbar di tutte le pagine (60px altezza)
- In grande nella pagina "Chi Siamo" con animazione floating
- Nel footer (solo testo V.B.M.)

---

**Sito creato con ❤️ per V.B.M.**
*Ex Traditione ad Futurum*
*Versione 1.0 - Gennaio 2026*
