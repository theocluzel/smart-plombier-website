#!/bin/bash

# Script de déploiement automatique pour Smart Plombier
echo "🚀 Déploiement Smart Plombier..."

# Créer un ZIP avec tous les fichiers
cd /Users/theocluzel/smart-plombier-website
zip -r smart-plombier-updated.zip . -x "*.git*" "deploy.sh"

echo "✅ Fichier ZIP créé : smart-plombier-updated.zip"
echo "📁 Taille du fichier :"
ls -lh smart-plombier-updated.zip

echo ""
echo "🎯 Instructions :"
echo "1. Allez sur https://app.netlify.com/drop"
echo "2. Glissez-déposez le fichier 'smart-plombier-updated.zip'"
echo "3. Votre site sera déployé en 30 secondes !"
echo ""
echo "📱 Ou testez localement :"
echo "http://localhost:8080"



