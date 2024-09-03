# Stage 1: build
# Lấy về image là hệ điều hành trong đó có maven và java 17
FROM maven:3.9.9-amazoncorretto-17-al2023 as build

# Tạo 1 thư mục /app trong image vừa kéo về
WORKDIR /app
# Copy file pom.xml /app
COPY pom.xml .
# Copy thư mục src vào /app/src
COPY src ./src
COPY local.env .
COPY database.sql .

# Build file jar
RUN mvn package -DskipTests

# Stage 2: create image
FROM amazoncorretto:17-al2023

WORKDIR /app
# Copy từ build là cái image ban đầu và copy file jar và đổi tên thành app.jar
COPY --from=build /app/target/*.jar app.jar
COPY --from=build /app/local.env .
COPY --from=build /app/database.sql .

# Câu lệnh để chạy: java -jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]