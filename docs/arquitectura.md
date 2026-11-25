# Arquitectura en AWS

## Diagrama

```mermaid
flowchart LR
    U[Usuario] --> CF[CloudFront + dominio propio]
    CF --> S3[S3: frontend React/Next.js]
    U --> APIGW[API Gateway]
    APIGW --> L[AWS Lambda - Node.js]
    L --> RDS[(Amazon RDS PostgreSQL)]
    L --> S3I[S3 privado: imágenes de productos]
    GH[GitHub Actions] --> S3
```

## Componentes

| Servicio | Función |
|----------|---------|
| Amazon S3 (frontend) | Aloja los archivos estáticos generados por Next.js (out/) |
| CloudFront | Entrega el sitio por HTTPS con el dominio personalizado |
| API Gateway | Expone la API REST al frontend |
| AWS Lambda | Ejecuta la lógica del backend en Node.js |
| Amazon RDS (PostgreSQL) | Guarda usuarios e inventarios |
| S3 privado | Guarda las imágenes de los productos |
| GitHub Actions | Compila y despliega el frontend en S3 |
