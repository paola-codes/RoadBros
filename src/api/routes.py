"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Vehicle, Request
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

#Initial GET method
@api.route('/user', methods=['GET'])
def get_users():

    users_query = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users_query))

    return jsonify(
        all_users
    ), 200

#SignUp and Login Methods ---------------------------------------------------

#Sign Up (Adding a new user)
@api.route('/user', methods=['POST'])
def add_new_user():

    body = request.get_json()

    new_user = User(
        user_type=body["user_type"], 
        full_name=body["full_name"], 
        email=body["email"], 
        password=body["password"], 
        phone=body["phone"],
        rating="",
    )

    db.session.add(new_user)
    db.session.commit()

    users_query = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users_query))
    return jsonify(all_users), 200

#Login (Validating Existing User)
@api.route('/login', methods=['POST'])
def user_login():

    body = request.get_json()

    user = User.query.filter_by(email = body["email"], password = body["password"]).first()

    if user == None:
        return "email or password is incorrect", 400
    return jsonify(
        user.serialize()
    ), 200

#User Methods ---------------------------------------------------------------

#Get User by ID
@api.route('/user/<id>', methods=['GET'])
def get_specific_user(id):

    user_query = User.query.get(id)

    return jsonify(
        user_query.serialize()
    ), 200

#Update Client Profile
@api.route('/user/client/<id>', methods=['PUT'])
def change_client_profile(id):
    
    my_profile = User.query.get(id)

    body = request.get_json()

    my_profile.full_name = body["full_name"]
    my_profile.email = body["email"]
    my_profile.phone = body["phone"]

    db.session.commit()

    profile_query = User.query.get(id)

    if profile_query.full_name == body["full_name"]:
        return jsonify(profile_query.serialize()), 200
    raise APIException("Update Failed")

#Update Trucker Profile
@api.route('/user/trucker/<id>', methods=['PUT'])
def change_trucker_profile(id):
    
    my_profile = User.query.get(id)

    body = request.get_json()

    my_profile.full_name = body["full_name"]
    my_profile.email = body["email"]
    my_profile.phone = body["phone"]

    db.session.commit()

    profile_query = User.query.get(id)

    if profile_query.full_name == body["full_name"]:
        return jsonify(profile_query.serialize()), 200
    raise APIException("Update Failed")

#Update Trucker Rating
@api.route('/user/trucker/rating/<id>', methods=['PUT'])
def update_trucker_rating(id):
    
    my_profile = User.query.get(id)

    body = request.get_json()

    my_profile.rating = body["rating"]

    db.session.commit()

    profile_query = User.query.get(id)

    if profile_query.rating == body["rating"]:
        return jsonify(profile_query.serialize()), 200
    raise APIException("Update Failed")

#Vehicle Methods ------------------------------------------------------------

#Get All Vehicles (Client Vehicles List)
@api.route('/vehicle/user/<user_id>', methods=['GET'])
def get_vehicles(user_id):

    vehicles_query = Vehicle.query.filter_by(user_id=user_id)
    all_vehicles = list(map(lambda x: x.serialize(), vehicles_query))

    return jsonify(
        all_vehicles
    ), 200

#Post New Vehicle
@api.route('/vehicle', methods=['POST'])
def add_vehicle():

    body = request.get_json()

    new_vehicle = Vehicle(
        vehicle_type=body["vehicle_type"], 
        vehicle_model=body["vehicle_model"], 
        vehicle_make=body["vehicle_make"], 
        vehicle_year=body["vehicle_year"], 
        vehicle_color=body["vehicle_color"],
        vehicle_plate=body["vehicle_plate"],
        user_id=body["user_id"]
    )

    db.session.add(new_vehicle)
    db.session.commit()

    vehicles_query = Vehicle.query.all()
    all_vehicles = list(map(lambda x: x.serialize(), vehicles_query))
    return jsonify(all_vehicles), 200

#Delete Vehicle
@api.route('/vehicle/<id>', methods=['DELETE'])
def delete_vehicle(id):

    body = request.get_json()
    
    vehicle =  Vehicle.query.get(id)

    db.session.delete(vehicle)
    db.session.commit()

    vehicles_query = Vehicle.query.all()
    all_vehicles = list(map(lambda x: x.serialize(), vehicles_query))
    return jsonify(all_vehicles), 200
    
#Request Methods ------------------------------------------------------------

#Get All Requests (Happens in TruckerRequestsList.js)
@api.route('/request', methods=['GET'])
def get_requests():
    
    requests_query = Request.query.all()
    all_requests = list(map(lambda x: x.serialize(), requests_query))

    return jsonify(
        all_requests
    ), 200

#Get Requests of Specific User
@api.route('/request/user/client/<user_id>', methods=['GET'])
def get_user_requests(user_id):
    
    requests_query = Request.query.filter_by(user_id=user_id)
    user_requests = list(map(lambda x: x.serialize(), requests_query))

    return jsonify(
        user_requests
    ), 200

#Post New Request
@api.route('/request', methods=['POST'])
def add_request():

    body = request.get_json()

    new_request = Request(
        zip_code=body["zip_code"], 
        service=body["service"], 
        vehicle=body["vehicle"],
        completed="",
        finished="",
        trucker_id="",
        trucker_name="",
        trucker_phone="",
        user_id=body["user_id"],
        client_name=body["client_name"],
        client_phone=body["client_phone"],
    )

    db.session.add(new_request)
    db.session.commit()

    requests_query = Request.query.all()
    all_requests = list(map(lambda x: x.serialize(), requests_query))
    return jsonify(all_requests), 200

#Delete Request
@api.route('/request/<id>', methods=['DELETE'])
def delete_request(id):
    
    my_request =  Request.query.get(id)

    body = request.get_json()

    db.session.delete(my_request)
    db.session.commit()

    requests_query = Request.query.all()
    all_requests = list(map(lambda x: x.serialize(), requests_query))
    return jsonify(all_requests), 200

#Trucker Service Management Methods -----------------------------------------

#Update Request as Accepted (Happens in TruckerRequestsList.js)
@api.route('/request/accepted/<id>', methods=['PUT'])
def accept_request(id):
    
    my_request = Request.query.get(id)

    body = request.get_json()

    my_request.trucker_id = body["trucker_id"]
    my_request.trucker_name = body["trucker_name"]
    my_request.trucker_phone = body["trucker_phone"]

    db.session.commit()

    request_query = Request.query.get(id)

    if request_query.trucker_id == body["trucker_id"]:
        return jsonify(request_query.serialize()), 200
    raise APIException("Update Failed")

#Update Request as Completed (Happens in TruckerServiceManagement.js)
@api.route('/request/completed/<id>', methods=['PUT'])
def complete_request(id):

    my_request = Request.query.get(id)

    body = request.get_json()

    my_request.completed = body["completed"]

    db.session.commit()

    request_query = Request.query.get(id)

    if request_query.completed == body["completed"]:
        return jsonify(request_query.serialize()), 200
    raise APIException("Update Failed")

#Update Request as Finished
@api.route('/request/finished/<id>', methods=['PUT'])
def finish_request(id):

    my_request = Request.query.get(id)

    body = request.get_json()

    my_request.finished = body["finished"]

    db.session.commit()

    request_query = Request.query.get(id)

    if request_query.finished == body["finished"]:
        return jsonify(request_query.serialize()), 200
    raise APIException("Update Failed")