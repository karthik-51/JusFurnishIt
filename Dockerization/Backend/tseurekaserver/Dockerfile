FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/*-SNAPSHOT.jar ./
RUN mv *.jar tseurekaserver.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "/app/tseurekaserver.jar"]