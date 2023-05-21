# Imports for Flask
from flask import Flask, request
from flask_login import LoginManager, UserMixin, login_user, current_user
from flask_socketio import SocketIO, emit

# Imports for multithread
from threading import Thread

# Conectar a la base de datos MySQL
import mysql.connector
import json
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="29577769",
    database="proyectoredes"
)

# Crear un cursor para ejecutar consultas
mycursor = mydb.cursor(buffered=True)

# Flask server creation
app = Flask(__name__)
app.config['SECRET_KEY'] = "secret! "

# Socket creation
socket_io = SocketIO(app, cors_allowed_origins="*")

# Login handler
login_manager = LoginManager(app)
login_manager.init_app(app)


# Lista de usuarios conectados
users = []

# Maximo de usuarios conectados
max_users = 4


# Función para manejar la conexión de un usuario


def getProductsFromDatabase(socket):
    mycursor.execute("select * from productos")
    resultados = mycursor.fetchall()

    if resultados:
        # Iterar sobre los resultados
        data = []
        for resultado in resultados:
            id, nombre, descripcion, precio, src, marca, modelo, year = resultado
            data.append({
                'id': str(id),
                'nombre': str(nombre),
                'descripcion': str(descripcion),
                'precio': str(precio),
                'src': str(src),
                'marca': str(marca),
                'modelo': str(modelo),
                'year': str(year)
            })
        socket.emit('postProducts', data)


def handle_client(sid, socket):
    while True:
        @socket_io.on('getProducts')
        def getProducts():
            thread = Thread(target=getProductsFromDatabase, args=(socket,))
            thread.start()


@socket_io.on('Login')
def login(data):
    # Consultar si el correo electrónico existe en la tabla de usuarios
    email = data['email']
    password = data['password']
    query = "SELECT * FROM clientes WHERE correo = %s AND contraseña = %s"
    mycursor.execute(query, (email, password))
    result = mycursor.fetchone()

    if result is None:
        socket_io.emit('Login response', {
                       'response': 'Failed', 'message': 'Email or Password wrong, please try again'})
    else:
        global users
        if (len(users) <= max_users):
            users.append(request.sid)
            socket_io.emit('Login response', {
                'response': 'Success', 'message': 'Login'})
            thread = Thread(target=handle_client,
                            args=(request.sid, socket_io,))
            thread.start()


def logout():
    # Eliminar al usuario de la lista de usuarios conectados
    global users
    users.remove(request.sid)


@socket_io.on('logout')
def handle_disconnect():
    logout()


@socket_io.on('disconnect')
def handle_disconnect():
    logout()


if __name__ == "__main__":
    socket_io.run(app, debug=True, port=4000)
