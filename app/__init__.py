import os
import datetime
from flask import Flask, jsonify, request, send_from_directory, render_template
from dotenv import load_dotenv
from peewee import *
from playhouse.shortcuts import model_to_dict

# Load environment variables
load_dotenv()



class TimelinePost(Model):
    name = CharField()
    email = CharField()
    content = TextField()
    created_at = DateTimeField(default=datetime.datetime.now)
    

# User data classes
class User:
    def __init__(self, name, pic, about, education, work, hobbies, places):
        self.name = name
        self.pic = pic
        self.about = about
        self.education = education
        self.work = work
        self.hobbies = hobbies
        self.places = places

class Education:
    def __init__(self, school, grad, major):
        self.school = school
        self.grad = grad
        self.major = major

class Work:
    def __init__(self, title, company, description):
        self.title = title
        self.company = company
        self.description = description

class Hobbies:
    def __init__(self, hobby, img):
        self.hobby = hobby
        self.img = img

class Places:
    def __init__(self, city, country):
        self.city = city
        self.country = country

# Create app and define routes
def create_app():
    app = Flask(__name__, static_folder='./build', static_url_path='/')

    # DB Initialization
    if os.getenv("TESTING") == "true":
        print("Running in test mode")
        mydb = SqliteDatabase('file:memory?mode=memory&cache=shared', uri=True)
    else:
        mydb = MySQLDatabase(
            os.getenv("MYSQL_DATABASE"),
            user=os.getenv("MYSQL_USER"),
            password=os.getenv("MYSQL_PASSWORD"),
            host=os.getenv("MYSQL_HOST"),
            port=3306
        )

    
    # Create user object
    Aria = User(
        "Arianna Richardson",
        "/static/img/me.jpg",
        "Hello! My name is Arianna and I am from Bowie, MD! I enjoy coding and creating digital media...",
        Education("University of Maryland, Baltimore County", "Graduated 2025", "Information Systems"),
        [
            Work("Undergraduate Researcher", "", [ "Designed UI dashboards using Unreal Engine."]),
            Work("Platform Engineer Intern", "", ["12-week internship at Disney Experiences."]),
            Work("Google CSSI", "", ["Virtual program teaching JavaScript."]),
            Work("Communications Intern", "", ["Redesigned school website, edited media, etc."]),
        ],
        [Hobbies("Digital Art", "./static/img/DigitalArt.jpg")],
        [Places("Bowie", "USA"), Places("Baltimore", "USA")]
    )

    @app.route("/api/timeline_post", methods=['POST'])
    def post_time_line_post():
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        content = request.form.get('content', '').strip()

        if not name:
            return jsonify({"error": "Invalid name"}), 400
        if not email or '@' not in email:
            return jsonify({"error": "Invalid email"}), 400
        if not content:
            return jsonify({"error": "Invalid content"}), 400


        timeline_post = TimelinePost.create(name=name, email=email, content=content)
        return jsonify(model_to_dict(timeline_post)),201


    @app.route('/api/timeline_post', methods=['GET'])
    def get_timeline_post():
        posts = TimelinePost.select().order_by(TimelinePost.created_at.desc())
        return jsonify({'timeline_posts': [model_to_dict(p) for p in posts]})
 
 
    @app.route('/timeline')
    def timeline():
        return render_template('timeline.html', title="Timeline")
    
    @app.route('/api/data')
    def index():
        return jsonify({
            "name": Aria.name,
            "title": "MLH Fellow",
            "avatarUrl": Aria.pic,
            "about": Aria.about,
            "education": {
                "school": Aria.education.school,
                "grad": Aria.education.grad,
                "major": Aria.education.major,
            },
            "work": [{"title": w.title, "company": w.company, "description": w.description} for w in Aria.work],
            "hobbies": [{"hobby": h.hobby, "img": h.img} for h in Aria.hobbies],
            "places": [{"city": p.city, "country": p.country} for p in Aria.places]
        })

    # Serve React app
    @app.route('/')
    @app.route('/<path:path>')
    def serve_react(path=''):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app
