FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/*-SNAPSHOT.jar ./

RUN mv *.jar apigateway.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "/app/apigateway.jar"]

 