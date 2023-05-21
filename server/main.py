# Imports for Flask
from flask import Flask, request
from flask_login import LoginManager, UserMixin, login_user, current_user
from flask_socketio import SocketIO, emit

# Imports for multithread
from threading import Thread

# Conectar a la base de datos MySQL
import mysql.connector
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="29577769",
    database="proyectoredes"
)

# Crear un cursor para ejecutar consultas
mycursor = mydb.cursor()

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


def handle_user_session(sid):
    while True:
        message = input()
        socketio.emit('message', {'data': message}, room=sid)


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
        socket_io.emit('Login response', {
                       'response': 'Success', 'message': 'Login'})


@socket_io.on('connect')
def handle_connect():
    global users
    if (len(users) < max_users):
        # Agregar al usuario a la lista de usuarios conectados
        users.append(request.sid)

        # Iniciar un nuevo hilo para manejar la conexión del usuario
        t = Thread(target=handle_user_session, args=(request.sid,))
        t.start()
    else:
        socket_io.emit('Login response', {
                       'response': 'Preventive', 'message': 'The server is full, please try later'})


@socket_io.on('disconnect')
def handle_disconnect():
    # Eliminar al usuario de la lista de usuarios conectados
    global users
    users.remove(request.sid)


if __name__ == "__main__":
    socket_io.run(app, debug=True, port=4000)
