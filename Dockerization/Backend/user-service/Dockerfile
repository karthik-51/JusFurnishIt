FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR (with wildcard to match SNAPSHOT version)
COPY target/*-SNAPSHOT.jar ./

# Rename the copied jar to userservice.jar
RUN mv *.jar userservice.jar

# Expose the port used by user-service
EXPOSE 8081

# Start the application
ENTRYPOINT ["java", "-jar", "/app/userservice.jar"]
