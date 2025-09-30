# Stage 1: Build the Angular application
FROM node:22.20.0-alpine AS builder

# Set working directory
WORKDIR /app

# Install specific npm version
RUN npm install -g npm@10.9.3

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Build the Angular application
RUN npm run build -- --configuration=production

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Install curl for health check
RUN apk add --no-cache curl

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user (nginx already runs as nginx user)
RUN chown -R nginx:nginx /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]