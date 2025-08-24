FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/*-SNAPSHOT.jar ./
RUN mv *.jar customerservice.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "/app/customerservice.jar"]