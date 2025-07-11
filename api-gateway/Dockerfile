FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8081
ENV HOTEL_SERVICE_URL=http://13.204.76.21:8080
ENTRYPOINT ["java", "-jar", "app.jar"]
