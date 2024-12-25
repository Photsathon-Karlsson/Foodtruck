# Projektrapport för Photsathon Karlsson

## Projektöversikt
**Projekt Namn**: Yum yum gim me sum  
**Kurs**: FED24  
**GitHub Repository**: [Foodtruck](https://github.com/KoiOriginal/Foodtruck)  
**Webbplats**: [Foodtruck Web](https://koioriginal.github.io/Foodtruck/)

## Tidslinje och Framsteg

### 05/12
- Startade projektet och kollade hur webben ser ut.

### 06/12
- Började organisera webbstrukturen (hantera filer och mappar).

### 07/12
- Arbetade med HTML och CSS.

### 08/12
- Startade JavaScript med menyn.

### 09/12
- Arbetade med menyn och hämtade API-nyckeln.

### 10/12
- Arbetade med menyn och hämtade tenant ID.

### 11/12 - Code review med Lärare
- **Saker att fixa**:
  - CSS Responsiv design för 360px.
  - Menudata: kunde inte hämta menyinformation från API.
  - CSS: ta bort punkter från alla menyer.
  - Tenant ID: hämta endast en gång.
  - Rendera meny-funktionen (`renderMenu(menuData)`) fungerade inte: måste använda `renderMenu(menuData.items)` för att visa hela menyn från API.
  Från denna kodgranskning insåg jag att jag behöver fokusera mer på funktioner, nyckelord, reserverade ord och små detaljer som variabelplacering och bokstavsstorlek (många misstag kom från detta).

### 12/12 - Code review med Klasskamrat
- Fick en idé om hur jag kan fixa menyn i HTML.
- Behövde fixa menytexten.

### 13/12
- Arbetade med menyn.
- Kunde inte dela in menyn i 3 delar.

### 14/12
- Arbetade med menyn.
- Måste ta bort alla beskrivningar från Drink & Dips (endast priset ska vara kvar).

### 15/12
- Arbetade med menyn.
- Måste skicka artiklar till kundvagnen.

### 16/12
- Arbetade med varukorgen.
- Måste hämta artiklar från menyn (sida 1) och visa dem i kundvagnen.

### 17/12 - Code review med Klasskamrat
- **Feedback**:
  - Sida 1: Meny (Wonton info: ingredienser, Dip & dryck: inga detaljer).
  - Sida 1: Byt ut kundvagnsbilden från `.png` till `.svg` + funktionalitet.
  - Fick hjälp och idéer om hur jag kan fixa min webb.
Från denna kodgranskning tyckte jag det var riktigt bra att ha både kodgranskning med lärare och klasskompis. Jag fick mycket hjälp och många idéer.

### 18/12
- Arbetade med varukorgen.
- Måste hämta artiklar från menyn (sida 1) och visa dem i kundvagnen, sedan skicka till sida 3.

### 19/12 - Code review med Lärare
- **Saker att fixa**:
  - Använde `.then()` för promises; koden fungerade inte, så jag fixade det med `await`.
  - Funktion för att dölja sidor.
  - Ingen "alert".
  - Fel URL på menysidan.
  - Sida 2: När samma meny läggs till, delas den i 2 menyer.
  - Kan inte använda exempel-ID; måste begära API.
Från denna kodgranskning insåg jag att jag behöver studera mer för att förstå koden, funktioner och hur webben fungerar.

### 20/12
- Arbetade med sida 2.
- Fixade att lägga till/ta bort artiklar från kundvagnen.
- Det finns inget problem med det valda visningsobjektet och det totala priset, men knapparna för att lägga till/ta bort fungerade inte.
- Fixade funktion för att skicka objekt till sida 3.

### 21/12
- Arbetade med sida 3.
- Skapade funktion för att visa kvitto.

### 22/12 (Deadline)
- Sida 3 fungerade inte med ETA.

### 23/12
- Fixade sida 3.
- Skickade "Post Request" med orderinformation till API.

### 24/12
- Fixade sida 3.
- Visade order-ID som returnerades från API.
- Började arbeta med sida 4.

### 25/12
- Arbetade med sida 4.
- Hämtade kvitto från API.
- Skapade funktion för att gå tillbaka till menyn.
- Testade och kollade på webben igen för att hitta problemen och se hur det fungerar.

## Slutsats
Detta projekt handlade om att skapa en webbplats för en foodtruck med sidor för meny, kundvagn och orderhantering. Under projektet lärde jag mig att använda API:er, hantera dynamiskt innehåll med JavaScript och förbättra mina kunskaper i CSS och HTML. Genom regelbundna kodgranskningar och tester kunde vi hitta problem och göra webbplatsen bättre.

