import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import urllib.request
import threading
import time

credpath = r"D:\PycharmProjects\FaceRecognitionProject\fypweb-cf26e-firebase-adminsdk-akh29-88690cc35b.json"
login = credentials.Certificate(credpath)

# initialize firebase
firebase_admin.initialize_app(login)

# reading from database
db = firestore.client()

# callback_done = threading.Event()
#
# boolValue = False
#
# def on_snapshot(doc_snapshot, changes , read_time):
#     for doc in doc_snapshot:
#         docDict = doc.to_dict()
#         isTrue = docDict['isTrue']
#         print(f'Received document snapshot: {doc.id}, isTrue = {isTrue}')
#         global boolValue
#         boolValue = isTrue
#     callback_done.set()
#
# db_ref = db.collection()

patients = db.collection("patients").stream()
deliveries = db.collection("delivery").stream()

delivery_set = db.collection("delivery")


delivery_list = []
d_list_counter = 0

for delivery in deliveries:
    delivery_list.append(delivery.to_dict())
    delivery_list[d_list_counter]["ID"] = delivery.id
    d_list_counter += 1

# for delivery in deliveries:
#     # print("{}".format(patient.to_dict()))
#     person = delivery.to_dict()
#     if delivery.get("status") == "pending":
#         person_name = delivery.get("patient")
#         print(person_name + " status pending")

# print("Delivery List")
#
# for delivery in deliveries:
#     delivery_list.append(delivery.to_dict())

    # if delivery.get("status") == "pending":
    #         d_patient_name = delivery.get("patient")
    #         print(d_patient_name + " : faceRecognized = 1")


# Create an Event for notifying main thread.
callback_done = threading.Event()


# Create a callback on_snapshot function to capture changes
def on_snapshot(col_snapshot, changes, read_time):
    d_counter = 0
    for doc in col_snapshot:
        idx = next((item for item, a in enumerate(delivery_list) if a["ID"] == doc.id), None)
        if idx is not None:  # found
            print("Yes")
            print(idx)
            print("Updated")
            delivery_list[idx] = doc.to_dict()
            delivery_list[idx]["ID"] = doc.id

        else:
            delivery_list.append(doc.to_dict())
            delivery_list[d_counter]["ID"] = delivery.id

        d_counter += 1

    print(delivery_list)

        # print(doc.to_dict())
    callback_done.set()

col_query = db.collection(u'delivery')

# Watch the collection query
query_watch = col_query.on_snapshot(on_snapshot)



# delivery_set.document("1656035585579").set({
# 'isRecognized': '0', 'medicine': 'Aspirin', 'doctor': 'Ben Parker', 'timeStamp': "DatetimeWithNanoseconds(2022, 6, 24, 1, 53, 4, 747000, tzinfo=datetime.timezone.utc)", 'patient': 'Celeste Galicia', 'status': 'pending', 'bed': '2', 'hasReached': 'true'
# })


# def download_image(img_url, file_path, pat_img):
#     full_path = file_path + pat_img + '.jpg'
#     urllib.request.urlretrieve(img_url, full_path)
#
#
# for patient in patients:
#     # print("{}".format(patient.to_dict()))
#     person = patient.to_dict()
#     person_name = person.get("fName") + " " + person.get("lName")
#     print(person_name)
#
#     if person.get("img"):
#         download_image(person.get("img"), 'PatientImages/', person_name)
#
#
#
#
# d = next((item for item in delivery_list if item["patient"] == "Celeste Galicia"), None)
# if d is not None: # found
#     print("Yes")
#     print(d)
#




# timeStr = time.strftime("%Y%m%d-%H%M%S")
#
# img_url = "https://firebasestorage.googleapis.com/v0/b/fypweb-cf26e.appspot.com/o/ben-parker-OhKElOkQ3RE-unsplash.jpg?alt=media&token=1a0042a9-e647-4e9e-bb16-46a5989db987"
# pat_img = "pat-" + timeStr

# download_image(img_url, 'PatientImages/', pat_img)


while True:
    print('', end='', flush=True)
    time.sleep(1)

