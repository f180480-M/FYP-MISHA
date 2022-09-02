import firebase_admin
import urllib.request
import cv2
import numpy as np
import face_recognition
import os
import pyttsx3
import threading
import time
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime


#                             FIREBASE                                     #

credpath = r"D:\PycharmProjects\FaceRecognitionProject\fypweb-cf26e-firebase-adminsdk-akh29-88690cc35b.json"
login = credentials.Certificate(credpath)

# initialize firebase
firebase_admin.initialize_app(login)

# reading from database
db = firestore.client()

# Create an Event for notifying main thread.
callback_done = threading.Event()

patients = db.collection("patients").stream()
deliveries = db.collection("delivery").stream()
check_delivery = db.collection("delivery")


def download_image(img_url, file_path, pat_img):
    full_path = file_path + pat_img + '.jpg'
    urllib.request.urlretrieve(img_url, full_path)


for patient in patients:
    # print("{}".format(patient.to_dict()))
    person = patient.to_dict()
    person_name = person.get("fName") + " " + person.get("lName")
    print(person_name)

    if person.get("img"):
        download_image(person.get("img"), 'PatientImages/', person_name)

delivery_list = []
d_list_counter = 0

for delivery in deliveries:
    delivery_list.append(delivery.to_dict())
    delivery_list[d_list_counter]["ID"] = delivery.id
    d_list_counter += 1


# for delivery in delivery_list:
#     print(delivery)


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




# timeStr = time.strftime("%Y%m%d-%H%M%S")
#
# img_url = "https://firebasestorage.googleapis.com/v0/b/fypweb-cf26e.appspot.com/o/ben-parker-OhKElOkQ3RE-unsplash.jpg?alt=media&token=1a0042a9-e647-4e9e-bb16-46a5989db987"
# pat_img = "pat-" + timeStr

# download_image(img_url, 'PatientImages/', pat_img)


#                             Firebase Setup/Img Download END                                     #

engine = pyttsx3.init()
voices = engine.getProperty("voices")
engine.setProperty("voice", voices[1].id)


# from PIL import ImageGrab

path = 'PatientImages'
images = []
classNames = []
myList = os.listdir(path)
print(myList)
for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
print(classNames)


def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList


def markAttendance(name):
    with open('Patients.csv', 'r+') as f:
        myDataList = f.readlines()
        nameList = []
        for line in myDataList:
            entry = line.split(',')
        nameList.append(entry[0])
        if name not in nameList:
            now = datetime.now()
            dtString = now.strftime('%H:%M:%S')
            f.writelines(f'\n{name},{dtString}')


def face_recognized(name):
    d = next((item for item in delivery_list if item["patient"] == name), None)
    if d is not None:  # found
        if d.get("status") == "pending":
            if d.get("hasReached") == "true":
                if d.get("isRecognized") == "0":
                    print(d.get("patient") + " : faceRecognized = 1")
                    check_delivery.document(d.get("ID")).set({"isRecognized": "1"}, merge=True)
                    engine.say("Hello, this is MISHA")
                    engine.say(name + ", please take the prescribed medicine")
                    engine.runAndWait()

    # for delivery in deliveries:
    #     # print("{}".format(patient.to_dict()))
    #     d_patient = delivery.to_dict()
    #     if delivery.get("name") == name:
    #         if delivery.get("status") == "pending":
    #             d_patient_name = delivery.get("patient")
    #             print(d_patient_name + " : faceRecognized = 1")


#     FOR CAPTURING SCREEN RATHER THAN WEBCAM
# def captureScreen(bbox=(300,300,690+300,530+300)):
#     capScr = np.array(ImageGrab.grab(bbox))
#     capScr = cv2.cvtColor(capScr, cv2.COLOR_RGB2BGR)
#     return capScr

encodeListKnown = findEncodings(images)
print('Encoding Complete')

cap = cv2.VideoCapture(0)

# timeout = time.time() + 60   # 5 sec from now

while True:
    success, img = cap.read()
    # img = captureScreen()
    imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    facesCurFrame = face_recognition.face_locations(imgS)
    encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

    for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
        # print(faceDis)
        matchIndex = np.argmin(faceDis)

        # if matches[matchIndex]:
        #     name = classNames[matchIndex].upper()
        #     # print(name)
        #     y1, x2, y2, x1 = faceLoc
        #     y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
        #     cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        #     cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
        #     cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
        #     markAttendance(name)

        if faceDis[matchIndex] < 0.50:
            name = classNames[matchIndex].upper()
            markAttendance(name)
            face_recognized(classNames[matchIndex])
        else:
            name = 'Unknown'
        # print(name)
        y1, x2, y2, x1 = faceLoc
        y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

    cv2.imshow('Webcam', img)
    cv2.waitKey(1)

    print('', end='', flush=True)
    time.sleep(1)

#     if time.time() > timeout:
#         break
#
# cv2.destroyAllWindows()
#
