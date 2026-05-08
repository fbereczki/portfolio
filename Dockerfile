# syntax=docker/dockerfile:1.6
# Bereczki Ferenc — Portfolio · production image
# Single-stage: assumes `dist/` already built locally with `npm run build`.
# If you prefer a self-contained build, see Dockerfile.full.

FROM nginx:1.27-alpine AS runtime

# Drop default nginx site
RUN rm -f /etc/nginx/conf.d/default.conf

# Custom site config — security headers + iframe sub-app handling
COPY deploy/nginx.conf /etc/nginx/conf.d/portfolio.conf

# Static assets (whole dist incl. /magus-app, /beacon-app, /codewitness-app, /wp-planner-app, /pgp-app)
COPY dist/ /usr/share/nginx/html/

# Healthcheck — nginx health endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O - http://127.0.0.1/healthz || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
