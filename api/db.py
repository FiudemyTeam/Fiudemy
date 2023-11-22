from datetime import datetime

from sqlmodel import SQLModel, create_engine, Session

from auth import auth_handler
from models.course_favorites import CourseUserFavorite
from models.course_materials import CourseMaterial
from models.course_rates import CourseUserRate
from models.courses import Course, Category
from models.donations import Donation
from models.users import User

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
        ),
        CourseMaterial(
            id=20,
            title='Introducción a Machine Learning',
            description='Definición de Machine Learning. Aplicaciones y conceptos fundamentales. Breve introducción a Python para Machine Learning.',
            order=1,
            type='video',
            value='https://www.youtube.com/watch?v=qp-lQwmXZEU',
            course_id=3
        ),
        CourseMaterial(
            id=21,
            title='Preprocesamiento de Datos en Machine Learning',
            description='Importancia del preprocesamiento de datos. Limpieza y transformación de datos. Manejo de datos faltantes y outliers.',
            order=2,
            type='video',
            value='https://www.youtube.com/watch?v=GOiEBALSxM0',
            course_id=3
        ),

        CourseMaterial(
            id=22,
            title='Algoritmos de Machine Learning',
            description='Revisión de algoritmos comunes. Regresión, clasificación y agrupación. Comparación de algoritmos y selección del modelo.',
            order=3,
            type='video',
            value='https://www.youtube.com/watch?v=3CC4N4z3GJc',
            course_id=3
        ),

        CourseMaterial(
            id=23,
            title='Evaluación y Validación de Modelos',
            description='Métricas de evaluación de modelos. Validación cruzada. Interpretación de resultados y ajuste de parámetros.',
            order=4,
            type='video',
            value='https://www.youtube.com/watch?v=sXYXTBKU4W0',
            course_id=3
        ),

        CourseMaterial(
            id=24,
            title='Aplicaciones Prácticas de Machine Learning con Python',
            description='Casos de uso reales. Desarrollo de proyectos con Python y scikit-learn. Implementación y despliegue de modelos.',
            order=5,
            type='video',
            value='https://www.youtube.com/watch?v=aircAruvnKk',
            course_id=3
        ),
        CourseMaterial(
            id=25,
            title='Introducción a la Programación en C++',
            description='Conceptos básicos de C++. Estructuras de control y tipos de datos. Primeros programas en C++.',
            order=1,
            type='video',
            value='https://www.youtube.com/watch?v=Rub-JsjMhWY',
            course_id=5
        ),

        CourseMaterial(
            id=26,
            title='Programación Orientada a Objetos en C++',
            description='Principios de la programación orientada a objetos. Clases y objetos en C++. Herencia y polimorfismo.',
            order=2,
            type='video',
            value='https://www.youtube.com/watch?v=aEVH7oFoWnw',
            course_id=5
        ),

        CourseMaterial(
            id=27,
            title='Estructuras de Datos en C++',
            description='Conceptos avanzados de estructuras de datos. Vectores, listas y árboles en C++. Uso de STL.',
            order=3,
            type='video',
            value='https://www.youtube.com/watch?v=ySZaUstgEH8',
            course_id=5
        ),

        CourseMaterial(
            id=28,
            title='Programación de Aplicaciones en C++',
            description='Desarrollo de aplicaciones con C++. Manipulación de archivos y entrada/salida. Creación de interfaces de usuario básicas.',
            order=4,
            type='video',
            value='https://www.youtube.com/watch?v=16FI1-d2P4E',
            course_id=5
        ),

        CourseMaterial(
            id=29,
            title='Optimización y Rendimiento en C++',
            description='Técnicas para optimizar el rendimiento en C++. Uso eficiente de memoria. Herramientas de análisis de rendimiento.',
            order=5,
            type='video',
            value='https://www.youtube.com/watch?v=16FI1-d2P4E',
            course_id=5
        ),
        CourseMaterial(
            id=30,
            title='Introducción a la Cocina Gourmet',
            description='Conceptos básicos de la cocina gourmet. Ingredientes y técnicas esenciales. Primeros pasos en la cocina de alta cocina.',
            order=1,
            type='video',
            value='https://www.youtube.com/watch?v=pmYltlxwAWk',
            course_id=6
),

        CourseMaterial(
            id=31,
            title='Técnicas Avanzadas de Cocción',
            description='Dominio de técnicas avanzadas de cocción. Cocción sous-vide, reducciones y salsas complejas. Trucos de chefs profesionales.',
            order=2,
            type='video',
            value='https://www.youtube.com/watch?v=PrHS2riy4L4',
            course_id=6
        ),

        CourseMaterial(
            id=32,
            title='Creatividad en la Cocina Gourmet',
            description='Desarrollo de la creatividad culinaria. Presentación de platos gourmet. Fusión de sabores y estilos.',
            order=3,
            type='video',
            value='https://www.youtube.com/watch?v=XyrGQu9wg8k',
            course_id=6
        ),

        CourseMaterial(
            id=33,
            title='Maridaje de Vinos y Comida Gourmet',
            description='Principios del maridaje. Selección de vinos para acompañar platos gourmet. Degustación y apreciación de sabores.',
            order=4,
            type='video',
            value='https://www.youtube.com/watch?v=7RxbfHQBso4',
            course_id=6
        ),

        CourseMaterial(
            id=34,
            title='Creación de un Menú Gourmet Completo',
            description='Planificación y ejecución de un menú gourmet completo. Coordinación de sabores y presentación de platos. Experiencia culinaria integral.',
            order=5,
            type='video',
            value='https://www.youtube.com/watch?v=uGIr_V8KokE',
            course_id=6
        ),
        CourseMaterial(
            id=35,
            title='Introducción al Desarrollo de Aplicaciones Móviles',
            description='Conceptos básicos de desarrollo móvil. Plataformas y tecnologías. Primeros pasos en la creación de aplicaciones para dispositivos móviles.',
            order=1,
            type='video',
            value='https://www.youtube.com/watch?v=RIKdJh8Un34',
            course_id=7
        ),

        CourseMaterial(
            id=36,
            title='Desarrollo de Interfaces de Usuario (UI) para Móviles',
            description='Diseño de interfaces efectivas para aplicaciones móviles. Principios de diseño de usuario. Herramientas y mejores prácticas.',
            order=2,
            type='video',
            value='https://www.youtube.com/watch?v=hHdzat0xunE',
            course_id=7
        ),

        CourseMaterial(
            id=37,
            title='Programación en Kotlin para Android',
            description='Uso del lenguaje Kotlin en el desarrollo de aplicaciones Android. Estructuras de control, clases y funciones en Kotlin.',
            order=3,
            type='video',
            value='https://www.youtube.com/watch?v=ebQphhLpJG0',
            course_id=7
        ),

        CourseMaterial(
            id=38,
            title='Desarrollo de Aplicaciones iOS con Swift',
            description='Creación de aplicaciones iOS utilizando el lenguaje Swift. Fundamentos de programación en Swift y desarrollo para dispositivos Apple.',
            order=4,
            type='video',
            value='https://www.youtube.com/watch?v=BYHt44u3Uh8',
            course_id=7
        ),

        CourseMaterial(
            id=39,
            title='Integración de Funcionalidades Avanzadas en Aplicaciones Móviles',
            description='Incorporación de características avanzadas en aplicaciones móviles. Sensores, notificaciones y servicios en segundo plano.',
            order=5,
            type='video',
            value='https://www.youtube.com/watch?v=2c9CmCts03k',
            course_id=7
        ),

        CourseMaterial(
            id=40,
            title='Introducción a la Inversión en Bolsa',
            description='Conceptos básicos de inversión en bolsa. Funcionamiento del mercado de valores. Tipos de activos y estrategias iniciales.',
            order=1,
            type='video',
            value='https://www.youtube.com/watch?v=VFfdt2xHDxU',
            course_id=8
        ),

        CourseMaterial(
            id=41,
            title='Análisis Fundamental y Técnico',
            description='Métodos de análisis para la toma de decisiones en inversiones. Análisis fundamental y técnico. Evaluación de acciones y sectores.',
            order=2,
            type='video',
            value='https://www.youtube.com/watch?v=dxVSFs9UmUc',
            course_id=8
        ),

        CourseMaterial(
            id=42,
            title='Estrategias de Inversión y Gestión de Riesgos',
            description='Desarrollo de estrategias de inversión. Diversificación de cartera. Gestión de riesgos y toma de decisiones informada.',
            order=3,
            type='video',
            value='https://www.youtube.com/watch?v=emPkpHUEFHo',
            course_id=8
        ),
        CourseMaterial(
            id=43,
            title='Introducción al Yoga y la Meditación',
            description='Principios básicos del yoga y la meditación. Beneficios para la salud mental y física. Primeros pasos en la práctica diaria.',
            order=1,
            type='video',
            value='https://www.youtube.com/watch?v=6p_yaNFSYao',
            course_id=9
),

        CourseMaterial(
            id=44,
            title='Posturas y Secuencias de Yoga',
            description='Aprendizaje de posturas fundamentales en yoga. Creación de secuencias de práctica. Flexibilidad y fortaleza física.',
            order=2,
            type='video',
            value='https://www.youtube.com/watch?v=97sQsDSU3so',
            course_id=9
        ),

        CourseMaterial(
            id=45,
            title='Técnicas de Respiración y Meditación Guiada',
            description='Exploración de técnicas de respiración en yoga. Meditación guiada para la relajación y la atención plena. Calma mental.',
            order=3,
            type='video',
            value='https://www.youtube.com/watch?v=UFJZfPHJgLc',
            course_id=9
        ),

        CourseMaterial(
            id=46,
            title='Yoga Avanzado y Prácticas de Meditación Profunda',
            description='Desarrollo de prácticas avanzadas de yoga. Meditación profunda y mindfulness. Incorporación de la práctica en la vida diaria.',
            order=4,
            type='video',
            value='https://www.youtube.com/watch?v=ZcjQIAZHYq4',
            course_id=9
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

    donations = [
        Donation(id=1, donor_id=2, teacher_id=1, amount=1000, message="Gracias por el curso!"),
        Donation(id=2, donor_id=1, teacher_id=2, amount=10000, message="Increible contenido!"),
        Donation(id=3, donor_id=3, teacher_id=1, amount=50000, message="Cambiaste mi vida!"),
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

        for donation in donations:
            session.add(donation)

        session.commit()
