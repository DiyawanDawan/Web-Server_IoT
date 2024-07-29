# web server iot

### Front End

https://github.com/DiyawanDawan/Web-Bumiku

### Web Server 


https://github.com/DiyawanDawan/Web-Server_IoT

### Databse 
<ul>
    <li>XAMPP</li>
    <li>MYSQl / SQL</li>
</ul>


Cara melakukan migrasi DB
1. buat file .env di root project dan buat juga nama databsenya di mysql

2. Pastikan username, password, host, name di .env sudah sesuai dengan databse masing 

Contoh

    DB_USERNAME = root
    DB_PASSWORD =
    DB_HOSTNAME = 127.0.0.1
    DB_NAME = db_donordarah
    DB_DIALECT = mysql

    JWT_SECRET=kunci_rahasia_anda


3. Perintah Untuk Migrasi database

        npx sequelize db:migrate

4. Untuk melakukan seender atau insert query di databse

       npx sequelize db:seed --seed 20240506174014-insert-nh4-data.js

4. Cara melakukan seed pada tabel keseluruhanya perintah ini di jalankan ketika perintah sebelumnya belum di jalankan


    npx sequelize db:seed:all


### Add migrasi file

    npx sequelize-cli migration:generate --name create-nh4-and-phair-tables


## Hemo Life API
## Base URL
<ul>
<li><a href="#">http://127.0.0.1:3000</a></li>
</ul>

<html>
  <head>
    <title>Express</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
  </head>
  <body>
    <h1>Express</h1>
    <p>Welcome to Express</p>
  </body>
</html>
