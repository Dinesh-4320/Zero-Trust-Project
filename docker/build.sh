#!bin/bash
docker build -t disciklean/zta-app-admin:latest AdminApp/
docker build -t disciklean/zta-app-user:latest UserApp/
docker build -t disciklean/zta-app-auditor:latest AuditorApp/
docker build -t disciklean/zta-app-public:latest PublicApp/
docker build -t disciklean/zta-app-backend:latest backend/


docker push disciklean/zta-app-public:latest
docker push disciklean/zta-app-admin:latest
docker push disciklean/zta-app-user:latest
docker push disciklean/zta-app-auditor:latest
docker push disciklean/zta-app-backend:latest

