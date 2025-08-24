FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/*-SNAPSHOT.jar ./

RUN mv *.jar bookingservice.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "/app/bookingservice.jar"]

 