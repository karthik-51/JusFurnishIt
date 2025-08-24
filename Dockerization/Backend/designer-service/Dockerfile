FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/*-SNAPSHOT.jar ./

RUN mv *.jar designerservice.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "/app/designerservice.jar"]


