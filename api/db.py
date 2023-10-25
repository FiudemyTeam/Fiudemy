from datetime import datetime
from sqlmodel import SQLModel, create_engine, Session
from models import Course, User

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def drop_db_and_tables():
    SQLModel.metadata.drop_all(engine)


def seed_db():
    courses = [
        Course(name='Curso de Desarrollo Web', description='Aprende a crear aplicaciones web modernas con las últimas tecnologías.', image='https://i.ytimg.com/vi/bYOjmW-740M/maxresdefault.jpg', id=1),
        Course(name='Diseño Gráfico Avanzado', description='Perfecciona tus habilidades de diseño gráfico y crea proyectos impresionantes.', image='https://institutonoa.com.ar/wp-content/uploads/2021/10/diseno_grafico.jpg', id=2),
        Course(name='Machine Learning con Python', description='Explora el mundo del machine learning y la inteligencia artificial con Python.', image='https://escuelafullstack.com/web/image/slide.channel/14/image_512', id=3),
        Course(name='Curso de Marketing Digital', description='Domina las estrategias de marketing digital para hacer crecer tu negocio.', image='https://i.ytimg.com/vi/sRAlwvGz-vo/maxresdefault.jpg', id=4),
        Course(name='Programación en C++', description='Aprende a programar en C++ y construye aplicaciones de alto rendimiento.', image='https://i.ytimg.com/vi/_vzc9pQnpic/maxresdefault.jpg', id=5),
        Course(name='Curso de Cocina Gourmet', description='Conviértete en un chef experto y prepara platos gourmet de alta calidad.', image='https://d3puay5pkxu9s4.cloudfront.net/curso/4271/800_imagen.jpg', id=6),
        Course(name='Desarrollo de Aplicaciones Móviles', description='Crea aplicaciones móviles para iOS y Android y llega a millones de usuarios.', image='https://globaldardos.com.ar/blog/wp-content/uploads/2021/09/blog-1.png', id=7),
        Course(name='Inversión en Bolsa', description='Aprende a invertir en el mercado de valores y hacer crecer tu patrimonio.', image='https://inverarg.com/wp-content/uploads/2022/03/cursobolsa_2-1024x576.jpg', id=8),
        Course(name='Curso de Yoga y Meditación', description='Encuentra la paz interior y mejora tu salud a través del yoga y la meditación.', image='https://www.escueladeyoga.com/wp-content/uploads/2021/07/EIY-coemmn-004.jpg', id=9)
    ]
    with Session(engine) as session:
        for course in courses:
            session.add(course)
        default_user = User(
            username="default_username",
            password="default_password",
            email="default@example.com",
            created_at=datetime.now(),
            is_student=True
        )
        session.add(default_user)         
        session.commit()            
