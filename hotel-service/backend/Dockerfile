FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENV SPRING_DATA_MONGODB_URI=mongodb+srv://harshavardhankalla:GBdITMUGHoVmdVH2@cluster0.geqmsjf.mongodb.net/hotel-db?retryWrites=true&w=majority&appName=Cluster0
ENTRYPOINT ["java", "-jar", "app.jar"]
