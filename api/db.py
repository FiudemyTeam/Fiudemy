from datetime import datetime
from sqlmodel import SQLModel, create_engine, Session

from models.course_material_views import CourseMaterialView
from models.courses import Course, Category
from models.users import User
from models.course_rates import CourseUserRate
from models.course_favorites import CourseUserFavorite
from models.course_materials import CourseMaterial
from auth import auth_handler

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def drop_db_and_tables():
    SQLModel.metadata.drop_all(engine)


def seed_db():
    course_materials = [
        CourseMaterial(
            id=1,
            title='Introducción a HTML',
            description='Aprende los fundamentos de HTML y crea tu primera página web.',
            order=1,
            type='video',
            value='https://www.youtube.com/watch?v=3JluqTojuME',
            course_id=1
        ),
        CourseMaterial(
            id=2,
            title='Introducción a JavaScript',
            description='Aprende los fundamentos de JavaScript y crea la lógica de tu página web.',
            order=2,
            type='video',
            value='https://www.youtube.com/watch?v=ivdTnPl1ND0',
            course_id=1
        ),
        CourseMaterial(
            id=3,
            title='Introducción a CSS',
            description='Introducción a la estilización de páginas web con CSS.',
            order=3,
            type='video',
            value='https://www.youtube.com/watch?v=24gNhTcy6pw',
            course_id=1
        ),
        CourseMaterial(
            id=4,
            title='Responsive Web Design',
            description='Introducción a la creación de diseños web que se adaptan a diferentes dispositivos y tamaños de pantalla.Media queries y diseño fluido',
            order=4,
            type='video',
            value='https://www.youtube.com/watch?v=2zypRlzIcHc',
            course_id=1
        ),
        CourseMaterial(
            id=5,
            title='Introducción a Git y Control de Versiones',
            description='Principios básicos de Git y GitHub para el control de versiones.',
            order=5,
            type='video',
            value='https://www.youtube.com/watch?v=3GymExBkKjE',
            course_id=1
        ),   
        CourseMaterial(
            id=6,
            title='Principios Básicos de Diseño Web',
            description='Conceptos fundamentales de diseño como la tipografía, el color y la disposición.',
            order=6,
            type='video',
            value='https://www.youtube.com/watch?v=-ut593BSlCk',
            course_id=1
        ),    
        CourseMaterial(
            id=7,
            title='Introducción a Node.js y Express (Backend)',
            description='Breve vista al desarrollo del lado del servidor con Node.js. Configuración de un servidor simple con Express.',
            order=7,
            type='video',
            value='https://www.youtube.com/watch?v=1hpc70_OoAg',
            course_id=1
        ),      
        CourseMaterial(
            id=8,
            title='Despliegue de Aplicaciones Web',
            description='Opciones para desplegar aplicaciones web en la nube o en servicios de alojamiento.',
            order=8,
            type='video',
            value='https://www.youtube.com/watch?v=xZjIMrmu-bg',
            course_id=1
        ),                                        
        CourseMaterial(
            id=9,
            title='Introducción a Adobe Photoshop',
            description='Aprende los conceptos básicos de Adobe Photoshop y domina el retoque de imágenes.',
            order=1,
            type='video',
            value='https://www.youtube.com/watch?v=abc123',
            course_id=2
        ),
        CourseMaterial(
            id=12,
            title='Tipografía Avanzada',
            description='Exploración de técnicas avanzadas de manipulación y diseño de tipografía.Combinación y emparejamiento de fuentes para lograr impacto visual. Diseño tipográfico para diferentes formatos y plataformas',
            order=2,
            type='video',
            value='https://www.youtube.com/watch?v=3_v47BU0wDg',
            course_id=2
        ),   
        CourseMaterial(
            id=10,
            title='Diseño de Identidad de Marca',
            description='Desarrollo de identidades visuales coherentes y distintivas. Creación de logotipos y sistemas de marca. Estrategias de diseño para transmitir la personalidad y los valores de una marca.',
            order=3,
            type='video',
            value='https://www.youtube.com/watch?v=88kNe9dthDU',
            course_id=2
        ),
        CourseMaterial(
            id=11,
            title='Ilustración Digital Avanzada',
            description='Técnicas de ilustración vectorial y diseño de gráficos complejos. Integración de ilustraciones en proyectos de diseño gráfico.',
            order=4,
            type='video',
            value='https://www.youtube.com/watch?v=-yUMCH5vVnk',
            course_id=2
        ),             
        CourseMaterial(
            id=13,
            title='Diseño Editorial y Maquetación',
            description='Maquetación de revistas, libros y otros materiales editoriales. Consideraciones de diseño para la legibilidad y la experiencia del usuario.',
            order=5,
            type='video',
            value='https://www.youtube.com/watch?v=B66NWPBPR3o',
            course_id=2
        ),
        CourseMaterial(
            id=14,
            title='Animación y Diseño de Interfaz de Usuario (UI)',
            description='Diseño de interfaces de usuario animadas. Herramientas y técnicas para crear prototipos interactivos.',
            order=6,
            type='video',
            value='https://www.youtube.com/watch?v=PnhcSBk6Spw',
            course_id=2
        ),   
        CourseMaterial(
            id=15,
            title='Introducción al Marketing Digital',
            description='Definición de Marketing Digital. Importancia y beneficios del Marketing Digital. Breve historia y evolución del Marketing Digital.',
            order=1,
            type='video',
            value='https://www.youtube.com/watch?v=JVZmN1OSld4',
            course_id=4
        ),
        CourseMaterial(
            id=16,
            title='Estrategias de Contenido y Marketing de Contenidos',
            description='Importancia del contenido en el marketing. Estrategias de marketing de contenidos. Creación y distribución de contenido relevante.',
            order=2,
            type='video',
            value='https://www.youtube.com/watch?v=os9TWBSvVSA',
            course_id=4
        ),
        CourseMaterial(
            id=17,
            title='SEO (Optimización para Motores de Búsqueda)',
            description='Introducción al SEO y su importancia. Factores de clasificación en los motores de búsqueda. Estrategias para mejorar el posicionamiento web.',
            order=3,
            type='video',
            value='https://www.youtube.com/watch?v=wHmFzsB22Tg',
            course_id=4
        ),
        CourseMaterial(
            id=18,
            title='Publicidad en Redes Sociales',
            description='Estrategias de publicidad en plataformas sociales. Segmentación de audiencia y personalización de anuncios. Análisis de métricas y rendimiento publicitario.',
            order=4,
            type='video',
            value='https://www.youtube.com/watch?v=shfbXfBLDbc',
            course_id=4
        ),
        CourseMaterial(
            id=19,
            title='Analítica Web y Marketing de Conversión',
            description='Herramientas de analítica web (Google Analytics). Interpretación de datos y métricas clave. Estrategias para aumentar la tasa de conversión.',
            order=5,
            type='video',
            value='https://www.youtube.com/watch?v=obpdQ4f7A0I',
            course_id=4
        )
    ]

    courses = [
        Course(
            name='Curso de Desarrollo Web',
            description='Aprende a crear aplicaciones web modernas con las últimas tecnologías.',
            image='https://i.ytimg.com/vi/bYOjmW-740M/maxresdefault.jpg',
            id=1,
            user_rates=[],
            category_id=1,
            user_favorites=[],
            course_materials=[],
            teacher_id=1,
            user_subscriptions=[]
        ),
        Course(
            name='Diseño Gráfico Avanzado',
            description='Perfecciona tus habilidades de diseño gráfico y crea proyectos impresionantes.',
            image='https://institutonoa.com.ar/wp-content/uploads/2021/10/diseno_grafico.jpg',
            id=2,
            user_rates=[],
            category_id=2,
            user_favorites=[],
            course_materials=[],
            teacher_id=2,
            user_subscriptions=[]
        ),
        Course(
            name='Machine Learning con Python',
            description='Explora el mundo del machine learning y la inteligencia artificial con Python.',
            image='https://escuelafullstack.com/web/image/slide.channel/14/image_512',
            id=3,
            user_rates=[],
            category_id=1,
            user_favorites=[],
            course_materials=[],
            teacher_id=1,
            user_subscriptions=[]
        ),
        Course(
            name='Curso de Marketing Digital',
            description='Domina las estrategias de marketing digital para hacer crecer tu negocio.',
            image='https://i.ytimg.com/vi/sRAlwvGz-vo/maxresdefault.jpg',
            id=4,
            user_rates=[],
            category_id=5,
            user_favorites=[],
            course_materials=[],
            teacher_id=1,
            user_subscriptions=[]
        ),
        Course(
            name='Programación en C++',
            description='Aprende a programar en C++ y construye aplicaciones de alto rendimiento.',
            image='https://i.ytimg.com/vi/_vzc9pQnpic/maxresdefault.jpg',
            id=5,
            user_rates=[],
            category_id=1,
            user_favorites=[],
            course_materials=[],
            teacher_id=1,
            user_subscriptions=[]
        ),
        Course(
            name='Curso de Cocina Gourmet',
            description='Conviértete en un chef experto y prepara platos gourmet de alta calidad.',
            image='https://d3puay5pkxu9s4.cloudfront.net/curso/4271/800_imagen.jpg',
            id=6,
            user_rates=[],
            category_id=3,
            user_favorites=[],
            course_materials=[],
            teacher_id=1,
            user_subscriptions=[]
        ),
        Course(
            name='Desarrollo de Aplicaciones Móviles',
            description='Crea aplicaciones móviles para iOS y Android y llega a millones de usuarios.',
            image='https://globaldardos.com.ar/blog/wp-content/uploads/2021/09/blog-1.png',
            id=7,
            user_rates=[],
            category_id=1,
            user_favorites=[],
            course_materials=[],
            teacher_id=1,
            user_subscriptions=[]
        ),
        Course(
            name='Inversión en Bolsa',
            description='Aprende a invertir en el mercado de valores y hacer crecer tu patrimonio.',
            image='https://inverarg.com/wp-content/uploads/2022/03/cursobolsa_2-1024x576.jpg',
            id=8,
            user_rates=[],
            category_id=4,
            user_favorites=[],
            course_materials=[],
            teacher_id=1,
            user_subscriptions=[]
        ),
        Course(
            name='Curso de Yoga y Meditación',
            description='Encuentra la paz interior y mejora tu salud a través del yoga y la meditación.',
            image='https://www.escueladeyoga.com/wp-content/uploads/2021/07/EIY-coemmn-004.jpg',
            id=9,
            user_rates=[],
            category_id=5,
            user_favorites=[],
            course_materials=[],
            teacher_id=1,
            user_subscriptions=[]
        )
    ]

    course_user_favorites = [
        CourseUserFavorite(user_id=1, course_id=1),
    ]

    course_user_rates = [
        CourseUserRate(user_id=1, course_id=1, rate=5,
                       comment='Very good course!'),
        CourseUserRate(user_id=1, course_id=2, rate=3,
                       comment='Good content, but not very good teacher'),
    ]

    course_material_views = [
        # CourseMaterialView(material_id=1, user_id=1),
    ]

    users = [
        User(
            username="john_doe",
            password=auth_handler.get_password_hash("password"),
            email="john_doe@example.com",
            created_at=datetime.now(),
            course_rates=[],
            course_favorites=[],
            course_subscriptions=[]
        ),
        User(
            username="jane_smith",
            password=auth_handler.get_password_hash("password"),
            email="jane_smith@example.com",
            created_at=datetime.now(),
            course_rates=[],
            course_favorites=[],
            course_subscriptions=[]
        ),
        User(
            username="alex_jones",
            password=auth_handler.get_password_hash("password"),
            email="alex_jones@example.com",
            created_at=datetime.now(),
            course_rates=[],
            course_favorites=[],
            course_subscriptions=[]
        ),
        User(
            username="emily_brown",
            password=auth_handler.get_password_hash("password"),
            email="emily_brown@example.com",
            created_at=datetime.now(),
            course_rates=[],
            course_favorites=[],
            course_subscriptions=[]
        ),
        User(
            username="michael_taylor",
            password=auth_handler.get_password_hash("password"),
            email="michael_taylor@example.com",
            created_at=datetime.now(),
            course_rates=[],
            course_favorites=[],
            course_subscriptions=[]
        )
    ]

    categories = [
        Category(id=1, name="Programacion"),
        Category(id=2, name="Diseño"),
        Category(id=3, name="Cocina"),
        Category(id=4, name="Inversiones"),
        Category(id=5, name="Otras"),
    ]

    with Session(engine) as session:

        for course in courses:
            session.add(course)

        for course_material in course_materials:
            session.add(course_material)

        for user in users:
            session.add(user)

        for course_user_rate in course_user_rates:
            session.add(course_user_rate)

        for course_user_favorite in course_user_favorites:
            session.add(course_user_favorite)

        for category in categories:
            session.add(category)

        for course_material_view in course_material_views:
            session.add(course_material_view)

        session.commit()
