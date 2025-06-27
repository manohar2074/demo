# Booking App with API Gateway Architecture

This is a microservices-based booking application with an API Gateway pattern implementation.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Main Frontend │    │ Hotel Service   │    │   API Gateway   │
│   (Port 3000)   │◄──►│   Frontend      │◄──►│   (Port 8081)   │
└─────────────────┘    │   (Port 5001)   │    └─────────────────┘
                       └─────────────────┘              │
                                                        ▼
                                               ┌─────────────────┐
                                               │ Hotel Service   │
                                               │   Backend       │
                                               │   (Port 8080)   │
                                               └─────────────────┘
```

## Services

### 1. API Gateway (Port 8081)
- **Technology**: Spring Cloud Gateway
- **Purpose**: Centralized routing, load balancing, and cross-cutting concerns
- **Features**:
  - Route all API calls through a single entry point
  - CORS handling
  - Request/Response logging
  - Circuit breaker pattern
  - Rate limiting
  - Fallback mechanisms

### 2. Main Frontend (Port 3000)
- **Technology**: React + Vite
- **Purpose**: Main booking application interface
- **Features**:
  - Hotel search interface
  - Payment integration
  - Responsive design

### 3. Hotel Service Frontend (Port 5001)
- **Technology**: React + Vite
- **Purpose**: Hotel listing and selection interface
- **Features**:
  - Hotel cards display
  - Search functionality
  - Booking integration

### 4. Hotel Service Backend (Port 8080)
- **Technology**: Spring Boot + MongoDB
- **Purpose**: Hotel data management
- **Features**:
  - CRUD operations for hotels
  - Search functionality
  - Location-based filtering

## Benefits of API Gateway Architecture

✅ **Centralized Security**: All requests go through a single point for authentication/authorization  
✅ **Load Balancing**: Distribute traffic across multiple service instances  
✅ **Rate Limiting**: Prevent abuse and ensure fair usage  
✅ **Circuit Breaker**: Handle service failures gracefully  
✅ **Monitoring**: Centralized logging and metrics  
✅ **CORS Management**: Handle cross-origin requests in one place  
✅ **API Versioning**: Manage different API versions centrally  
✅ **Request/Response Transformation**: Modify requests/responses as needed  

## Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- MongoDB (or MongoDB Atlas)

### 1. Start the Hotel Service Backend
```bash
cd hotel-service/backend
mvn spring-boot:run
```

### 2. Start the API Gateway
```bash
cd api-gateway
mvn spring-boot:run
```

### 3. Start the Main Frontend
```bash
cd main-frontend
npm install
npm run dev
```

### 4. Start the Hotel Service Frontend
```bash
cd hotel-service/frontend
npm install
npm run dev
```

## API Endpoints

All API calls now go through the API Gateway at `http://localhost:8081`:

### Hotel Service Endpoints
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/{id}` - Get hotel by ID
- `GET /api/hotels/search` - Search hotels with filters
- `GET /api/hotels/locations` - Get all available locations
- `GET /api/hotels/location/{location}` - Get hotels by location
- `POST /api/hotels` - Add new hotel

## Configuration

### Environment Variables
You can configure the API Gateway URL using environment variables:

```bash
# For main frontend
REACT_APP_API_GATEWAY_URL=http://localhost:8081

# For hotel service frontend
REACT_APP_API_GATEWAY_URL=http://localhost:8081
```

### API Gateway Configuration
The API Gateway configuration is in `api-gateway/src/main/resources/application.yml`:

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: hotel-service
          uri: http://localhost:8080
          predicates:
            - Path=/api/hotels/**
```

## Monitoring and Health Checks

### API Gateway Health Endpoints
- `GET /actuator/health` - Service health status
- `GET /actuator/info` - Service information
- `GET /actuator/gateway` - Gateway routes and filters

### Circuit Breaker
The API Gateway includes circuit breaker patterns to handle service failures:
- Fallback endpoint: `/fallback/hotel-service`
- Automatic recovery when services come back online

## Development

### Adding New Services
1. Create your microservice
2. Add a new route in `api-gateway/src/main/resources/application.yml`
3. Update the API configuration in frontend services
4. Test the integration

### Custom Filters
You can add custom filters in `api-gateway/src/main/java/com/example/apigateway/filter/`

### Logging
All requests and responses are logged through the `LoggingFilter` for debugging and monitoring.

## Production Considerations

1. **Security**: Add authentication/authorization filters
2. **SSL/TLS**: Configure HTTPS
3. **Load Balancing**: Use multiple API Gateway instances
4. **Monitoring**: Integrate with monitoring tools (Prometheus, Grafana)
5. **Rate Limiting**: Configure appropriate rate limits
6. **Caching**: Add Redis for response caching

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check API Gateway CORS configuration
2. **Service Unavailable**: Check if hotel service is running
3. **Port Conflicts**: Ensure all services are using different ports

### Logs
Check the API Gateway logs for request/response details and error information. 