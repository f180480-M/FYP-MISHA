#include <Firebase_ESP_Client.h>
#include <ESP8266WiFi.h>
#include <addons/TokenHelper.h>

////////////////////////////////Firebase//////////////////////////////////////////

const char* ssid = "cxxx[]:;:;:;:;:;:;:;:;>";
const char* password = "infinity";

#define API_KEY "AIzaSyAsqq7n2ZUe6Nk_zQk4dYw9s9qVfmWxt4k"
#define FIREBASE_PROJECT_ID "fypweb-cf26e"
#define USER_EMAIL "esp32MISHA@misha.com"
#define USER_PASSWORD "5131370367@abc"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void firebaseInit(){
  config.api_key = API_KEY;

  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  Firebase.setDoubleDigits(5);
}

FirebaseJson content;
FirebaseJsonData result;
FirebaseJsonArray arr;

String documentPath = "delivery/";
String documentId="";
/////////////////////////////////////////////////////////////////////////////////


int IN1 = D1;
int IN2 = D2;
int IN3 = D3;
int IN4 = D4;

void setup() {
  
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  firebaseInit();

  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void loop() {

  Serial.println();
  setDirection(firestoreDataUpdate());
  Serial.println();
  Serial.println();


  delay(3000);
}

void setDirection(String med) {
  
  if(med == "Panadol")
  {
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
    
    delay(150); // now turn off motors
    
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);
    
    delay(20000); // Wait for patient -- now change motor directions
    
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, HIGH);
    
    delay(250); // now turn off motors
    
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);

    deliveryCompleted();

  }
  else if(med == "Aspirin")
  {
    digitalWrite(IN3, HIGH);
    digitalWrite(IN4, LOW);
    
    delay(150); // now turn off motors
    
    digitalWrite(IN3, LOW);
    digitalWrite(IN4, LOW);
    
    delay(20000); // Wait for patient -- now change motor directions
    
    digitalWrite(IN3, LOW);
    digitalWrite(IN4, HIGH);
    
    delay(250); // now turn off motors
    
    digitalWrite(IN3, LOW);
    digitalWrite(IN4, LOW);

    deliveryCompleted();

  }
}
void deliveryCompleted()
{
    String documentPath2 = documentId;

    FirebaseJson content2;

    content2.set("fields/status/stringValue", "completed");
    content2.set("fields/isRecognized/stringValue", "0");

    if(Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath2.c_str(), content2.raw(), "status,isRecognized")){
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
    }
    else{
      Serial.println(fbdo.errorReason());
    }
//    if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath2.c_str(), "")) {
//        Serial.printf("Get ok\n%s\n\n", fbdo.payload().c_str());
//    }   

    Serial.println("Delivery Drawer Success");  
}
String firestoreDataUpdate(){
  String medicine="";
  if(WiFi.status() == WL_CONNECTED && Firebase.ready()){

    Serial.print("Get documents... ");
    if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), ""))
    {
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
    
      // Create a FirebaseJson object and set content with received payload
      content.setJsonData(fbdo.payload().c_str());
//      content.toString(Serial, true);
//      Serial.println();
//      Serial.println();
    
      content.get(result, "documents");
       
      //Get array data
      result.get<FirebaseJsonArray>(arr);
   
      for (size_t i = 0; i < arr.size(); i++)
      {
        arr.get(result, "["+String(i)+"]/fields/status/stringValue");
          
        if (result.to<String>()=="pending")
        {    
          arr.get(result, "["+String(i)+"]/fields/isRecognized/stringValue");
      
          if (result.to<int>()== 1)
          {
            
            arr.get(result, "["+String(i)+"]/fields/medicine/stringValue");
    
            //Print type of parsed data e.g string, int, double, bool, object, array, null and undefined
//            Serial.println(result.type);
            //Print its content e.g.string, int, double, bool whereas object, array and null also can access as string
            Serial.println(result.to<String>());
    
            medicine = result.to<String>();
    
            Serial.println("Storing document ID... ");
            arr.get(result, "["+String(i)+"]/name");
            if (result.success)
            {          
                String tempId = result.to<String>();          
                documentId = tempId.substring(52);
          
                Serial.println(documentId);
          
            }
          }
        }
      }
    }        
  }
  return medicine;
}
