# MEETRO Server

This is MEETRO API, which ONLY allow MEETRO's application to connect with.
Now at script status, feel free to contribute with :)
## Configuration

The code using Nodejs framework as a server. Connect with MySQL database.
Allow client to connect with, such as web or App in IOS and Android
[Application](https://github.com/WooGaoZan/MEETRO_client)

## Run the Server
After setup, go to working directory and type this line of code

```
node api_server.js
```

## API Route

Here has four route:

```
/data
```
```
/user?
```
```
/userwish?
```
```
/wishlist?
```


### /data

This route checking wether the server connect sucessfully

```
127.0.0.1:1337/data
```

if success server will return:
```
{ message: "Hello World"}
```

### /user?

This route will return user data, you should giving u_id after '?'

```
127.0.0.1:1337/user?1
```

### /userwish?

This route will insert user wish into database.
Giving u_id and wish as following

```
127.0.0.1:1337/userwish?u=1&w=learing%20english
```

### /wishlist?

This route will return wish data that user should have

```
127.0.0.1:1337/wishlist?u=1
```

## Authors

* **Leo Lee** - *Initial work* - [Github](https://github.com/Leoli0320)
* **Letitia She** - *FrontEnd work* - [Github](https://github.com/LetitiaShe)
* **Xu Xuan** - *BackEnd work* - [Github](https://github.com/kugwa)

See also the list of [contributors](https://github.com/WooGaoZan/MEETRO_server/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [City Science Mobility++ Hackathon 2017 / MIT 城市科學【多元運輸】黑客松 2017](https://www.media.mit.edu/events/csopen-taipei-2017/)
