import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Erstellt dirname, da es in ES-Modulen nicht direkt verfügbar ist
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Express App initialisieren // Liest den PORT-Wert aus der Umgebungsvariable `PORT`.
// Falls nicht gefunden, wird der Standardwert 3000 verwendet.
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware zum Servieren statischer Dateien (HTML, CSS usw.) aus dem public-Verzeichnis
app.use(express.static(path.join(dirname, "public")));

// Middleware zum Parsen von URL-encoded Daten (Formulardaten)
app.use(express.urlencoded({ extended: true }));

// Route für die Startseite
app.get("/", (req, res) => {
  res.sendFile(path.join(dirname, "public", "index.html"));
});

// Route für die Login-Seite
app.get("/login", (req, res) => {
  res.sendFile(path.join(dirname, "public", "login.html"));
});

// POST-Route zum Verarbeiten von Login-Formulardaten
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "user@email.com" && password === "top-secret") {
    res.redirect("/my-account");
  } else {
    res.redirect("/error");
  }
});

// Route für My Account Seite
app.get("/my-account", (req, res) => {
  res.sendFile(path.join(dirname, "public", "my-account.html"));
});

// Route für Fehlerseite
app.get("/error", (req, res) => {
  res.sendFile(path.join(dirname, "public", "error.html"));
});

// Beispiel-Route: Echo-Route
app.get("/echo/:message", (req, res) => {
  const message = req.params.message;

  if (message === "secret") {
    res.send("the secret is... 42!");
  } else {
    res.send(message);
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
