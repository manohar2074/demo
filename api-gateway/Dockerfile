FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8081
ENV HOTEL_SERVICE_URL=http://hotel-backend:8080
ENTRYPOINT ["java", "-jar", "app.jar"]
