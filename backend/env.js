const fs = require('fs');
const path = require('path');

console.log('🔍 Diagnostic du fichier .env...');

// 1. Vérifier le chemin exact
const envPath = path.resolve(__dirname, '.env');
console.log('📁 Chemin du fichier .env:', envPath);

// 2. Vérifier si le fichier existe
if (fs.existsSync(envPath)) {
    console.log('✅ Fichier .env existe');
    
    // 3. Lire le contenu
    const content = fs.readFileSync(envPath, 'utf8');
    console.log('📄 Contenu brut du fichier:');
    console.log('--- DEBUT ---');
    console.log(content);
    console.log('--- FIN ---');
    
    // 4. Vérifier la taille
    const stats = fs.statSync(envPath);
    console.log('📏 Taille du fichier:', stats.size, 'bytes');
    
    // 5. Compter les lignes
    const lines = content.split('\n').filter(line => line.trim() !== '');
    console.log('📊 Nombre de lignes non vides:', lines.length);
    
    // 6. Afficher chaque ligne
    console.log('🔍 Analyse ligne par ligne:');
    lines.forEach((line, index) => {
        console.log(`Ligne ${index + 1}: "${line}"`);
    });
    
} else {
    console.log('❌ Fichier .env NEXISTE PAS à cet emplacement');
}

// 7. Lister les fichiers du dossier
console.log('\n📂 Fichiers dans le dossier:');
fs.readdirSync(__dirname).forEach(file => {
    console.log(' -', file);
});