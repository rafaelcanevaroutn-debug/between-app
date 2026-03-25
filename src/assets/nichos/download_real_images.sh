#!/bin/bash
# ============================================================
# Script para descargar fotos reales de Unsplash
# Reemplaza las imágenes placeholder con fotos profesionales
#
# USO: cd ~/between-app/src/assets/nichos && bash download_real_images.sh
# ============================================================

DIR="$(cd "$(dirname "$0")" && pwd)"
echo "📁 Descargando imágenes en: $DIR"
echo ""

download() {
  local FILE="$1"
  local QUERY="$2"
  local URL="https://source.unsplash.com/800x600/?${QUERY}"
  echo -n "  ↓ $FILE ... "
  curl -sL "$URL" -o "$DIR/$FILE" && echo "✓" || echo "✗ ERROR"
  sleep 0.5  # evitar rate limiting
}

echo "🚀 STARTUPS"
download "startups-1.jpg" "tech,office,modern,startup"
download "startups-2.jpg" "laptop,code,programming,developer"
download "startups-3.jpg" "team,meeting,startup,office"
download "startups-4.jpg" "entrepreneur,founder,working,desk"
download "startups-5.jpg" "whiteboard,brainstorm,ideas,planning"
download "startups-6.jpg" "computer,data,analytics,screen"

echo ""
echo "🏠 INMOBILIARIAS"
download "inmobiliarias-1.jpg" "modern,house,exterior,architecture"
download "inmobiliarias-2.jpg" "apartment,interior,design,room"
download "inmobiliarias-3.jpg" "building,architecture,modern,facade"
download "inmobiliarias-4.jpg" "living,room,elegant,interior"
download "inmobiliarias-5.jpg" "kitchen,modern,interior,design"
download "inmobiliarias-6.jpg" "house,facade,real,estate"

echo ""
echo "🍽️  GASTRONOMIA"
download "gastronomia-1.jpg" "gourmet,food,plate,restaurant"
download "gastronomia-2.jpg" "chef,cooking,kitchen,professional"
download "gastronomia-3.jpg" "restaurant,interior,dining,elegant"
download "gastronomia-4.jpg" "fresh,ingredients,vegetables,food"
download "gastronomia-5.jpg" "professional,kitchen,cooking,chef"
download "gastronomia-6.jpg" "table,setting,dining,elegant"

echo ""
echo "💪 FITNESS"
download "fitness-1.jpg" "gym,modern,fitness,equipment"
download "fitness-2.jpg" "workout,training,exercise,gym"
download "fitness-3.jpg" "weights,equipment,gym,fitness"
download "fitness-4.jpg" "running,outdoor,sport,fitness"
download "fitness-5.jpg" "yoga,meditation,wellness,zen"
download "fitness-6.jpg" "personal,trainer,coaching,fitness"

echo ""
echo "🎤 MARCA PERSONAL"
download "marcapersonal-1.jpg" "public,speaking,stage,conference"
download "marcapersonal-2.jpg" "podcast,recording,microphone,studio"
download "marcapersonal-3.jpg" "camera,recording,video,production"
download "marcapersonal-4.jpg" "person,studio,professional,content"
download "marcapersonal-5.jpg" "conference,stage,speaker,event"
download "marcapersonal-6.jpg" "professional,portrait,business,headshot"

echo ""
echo "✅ ¡Listo! Todas las imágenes descargadas en $DIR"
