# Utilisation de Nginx (serveur web léger) pour servir le contenu statique
FROM nginx:alpine

# Nettoyer le répertoire par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers du projet dans le dossier de Nginx
# On copie l'index à la racine du serveur
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY pieces.js /usr/share/nginx/html/
COPY avis.js /usr/share/nginx/html/
COPY pieces-autos.json /usr/share/nginx/html/


# Copier le dossier images (important pour le logo et les pièces)
COPY images /usr/share/nginx/html/images

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]