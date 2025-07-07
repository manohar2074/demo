FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENV SPRING_DATA_MONGODB_URI=mongodb://mongo:27017/hotel-db
ENTRYPOINT ["java", "-jar", "app.jar"]
