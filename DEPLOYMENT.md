# Deployment auf Vercel + Domain choppercouture.ch verbinden

Schritt-für-Schritt-Anleitung. Rechne mit ~30 Min beim ersten Mal.

---

## 1. Vercel-Account anlegen

- [vercel.com](https://vercel.com) → **Sign Up** (kostenlos, „Hobby"-Plan reicht)
- Mit GitHub / GitLab / Bitbucket **oder** E-Mail anmelden

---

## 2. Deployment — der schnellste Weg (Vercel CLI)

Im Terminal, im Projekt-Ordner:

```bash
# Einmalig installieren
npm i -g vercel

# Ins Projekt wechseln
cd "/Users/dinkaisch/Documents/CC Chopper Couture/CC_Kreation/CC_Webdesign/CC_Webiste neu /chopper-couture"

# Deployment starten — beim ersten Mal fragt es dich einiges
vercel

# Fragen die kommen:
# - "Set up and deploy?" → Y
# - "Which scope?" → deinen Account wählen
# - "Link to existing project?" → N
# - "Project name?" → chopper-couture (oder anders)
# - "In which directory is your code?" → ./ (Enter drücken)
# - "Auto-detected settings?" → Y

# Nach ~2 Min: Preview-URL wie https://chopper-couture-abc123.vercel.app

# Wenn's live gehen soll (Production):
vercel --prod
```

Damit hast du eine **öffentliche URL** wie `chopper-couture.vercel.app`. Von da an: jedes `vercel --prod` deployed die aktuellste Version.

---

## 3. Deine Domain choppercouture.ch verbinden

### 3a. In Vercel Domain hinzufügen

1. [vercel.com/dashboard](https://vercel.com/dashboard) → dein Projekt öffnen
2. **Settings → Domains**
3. Ins Eingabefeld **beide** eintragen (nacheinander):
   - `choppercouture.ch`
   - `www.choppercouture.ch`
4. Vercel zeigt dir jetzt **DNS-Records**, die du beim Domain-Anbieter eintragen musst — sehen etwa so aus:

   ```
   Für choppercouture.ch (Apex/Root):
     Type: A       Name: @       Value: 76.76.21.21

   Für www.choppercouture.ch:
     Type: CNAME   Name: www     Value: cname.vercel-dns.com
   ```

### 3b. DNS beim Domain-Anbieter setzen

Wo du die Records einträgst hängt davon ab, wo du `choppercouture.ch` **gekauft** hast. Übliche CH-Anbieter:

- **Switch.ch / nic.ch** — die eigentliche .ch-Registry, aber du bearbeitest die DNS meist bei deinem Registrar
- **Hostpoint** → Kunden-Center → Domains → choppercouture.ch → DNS-Zonen-Editor
- **cyon** → my.cyon.ch → Domains → DNS-Verwaltung
- **Infomaniak** → Manager → Domains → DNS-Zone
- **Google Domains / Squarespace Domains** → DNS-Einstellungen

**Was du dort machst:**

1. Bestehende A- und CNAME-Records für `@` und `www` löschen (falls welche existieren und auf was anderes zeigen)
2. Die von Vercel angezeigten Records neu eintragen:
   - **A-Record**: Name/Host = `@` (oder leer / "choppercouture.ch"), Wert = `76.76.21.21`, TTL = 3600 (oder Standard)
   - **CNAME-Record**: Name/Host = `www`, Wert = `cname.vercel-dns.com` (mit oder ohne Punkt am Ende, je nach Interface)
3. Speichern

### 3c. Warten

DNS-Änderungen brauchen **5 Min bis zu einigen Stunden**, meist unter 30 Min. Auf Vercel siehst du dann grüne Häkchen bei beiden Domains. SSL/HTTPS wird **automatisch** von Vercel eingerichtet — kein Extra-Aufwand.

Danach ist deine Seite live unter **https://www.choppercouture.ch** und **https://choppercouture.ch**.

---

## 4. Was noch vor Go-Live zu tun ist

- **Hero-Video komprimieren** — aktuell 48 MB, zu groß fürs Handy. Ziel: 5–8 MB.
  Kostenlos mit **Handbrake** (H.264, Web-optimiert) oder **CloudConvert** (online).
- **Impressum-Gewerbenummer** eintragen ([app/legal/impressum/page.tsx](app/legal/impressum/page.tsx))
- **Newsletter/Contact-Formular** an einen Empfänger anbinden (aktuell nur mailto/Placeholder)

---

## Alternative: Deployment via GitHub

Wenn du Änderungen künftig auf GitHub committen willst (dann auto-deployt Vercel):

```bash
cd "/Users/dinkaisch/Documents/CC Chopper Couture/CC_Kreation/CC_Webdesign/CC_Webiste neu /chopper-couture"

# Repo initialisieren + Erstcommit
git init
git add .
git commit -m "Initial commit"

# Auf GitHub ein leeres Repo erstellen (via github.com/new), dann:
git remote add origin git@github.com:DEIN_USERNAME/chopper-couture.git
git branch -M main
git push -u origin main
```

Dann auf Vercel: **New Project → Import** → dein GitHub-Repo auswählen. Jeder `git push` deployt automatisch.

---

## Troubleshooting

**„Domain not verified"** in Vercel → DNS-Records sind noch nicht überall propagiert. Warten oder mit [dnschecker.org](https://dnschecker.org) prüfen ob deine Records weltweit sichtbar sind.

**Video lädt langsam auf Mobilfunk** → siehe oben, komprimieren.

**Fonts laden nicht** → Saira Expanded kommt via Google Fonts (im CSS-Import in `app/globals.css`). Sollte automatisch funktionieren. Falls nicht: Firewalls / Adblocker prüfen.
