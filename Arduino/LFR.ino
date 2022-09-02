#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>
#include <analogWrite.h>

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

//Ultrasonic Sensor
#define echopin 4   //Echo pin
#define trigpin 5   //Trigger pin

// Motor A connections
#define EN_A 33     //Enable pin A
#define IN_1 26     //motor A = +
#define IN_2 25     //motor A = -

// Motor B connections
#define IN_3 14     //motor B = +
#define IN_4 27     //motor B = -
#define EN_B 12     //Enable pin A

//IR Sensors
#define R_S0 36   //sensor R_0
#define R_S 39      //sensor R
#define S_S 34      //sensor S
#define L_S 35      //sensor L
#define L_S0 32     //sensor L_0

//LED Pins
#define Setup 19
#define Firebase_Update 18
#define hasReached_Led 17
#define LFR_Led 16
unsigned long bedtimer = 0;
int bedLed_dur = 0;
int bLed_state = LOW;

int  frontdist;
long duration;

int setdist = 15;

void setup() 
{
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

  pinMode(IN_1, OUTPUT);
  pinMode(IN_2, OUTPUT);
  pinMode(IN_3, OUTPUT);
  pinMode(IN_4, OUTPUT);
  pinMode(EN_A, OUTPUT);
  pinMode(EN_B, OUTPUT);
  
  pinMode(L_S0, INPUT);
  pinMode(L_S, INPUT);
  pinMode(S_S, INPUT);
  pinMode(R_S, INPUT);
  pinMode(R_S0, INPUT);
  
  pinMode (trigpin, OUTPUT);
  pinMode (echopin, INPUT);
   
  analogWrite(EN_A, LOW); 
  analogWrite(EN_B, LOW);
  
  // Turn off motors - Initial state
  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, LOW);
  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, LOW);

  pinMode(Setup, OUTPUT);
  pinMode(Firebase_Update, OUTPUT);
  pinMode(hasReached_Led,OUTPUT);
  pinMode(LFR_Led,OUTPUT);

  digitalWrite(Setup, HIGH);
  
  delay(200);
}

bool isDelivery = false;
int bedNo = -1;
int currBed = 0;
bool inTransit = false;

void loop()
{   
  if(bedLed_dur>0)
  {
    if (millis() - bedtimer > bedLed_dur) 
    {
      bLed_state = !bLed_state;
      digitalWrite(Firebase_Update, bLed_state);
      bedtimer = millis(); //setting "timer = millis" makes millis-timer = 0
    }
  }
  if (inTransit == false)
  {
      bedNo = firestoreDataUpdate();
      bedLed_dur = 1000 * bedNo;
  }
  else
  {
    LFR();    
  }
}

bool alreadyStop = false;

void LFR()
{
  frontdist = data();
  Serial.println(frontdist);

  Serial.println("1");
  Serial.print("bedNo: ");
  Serial.println(bedNo);

  if(currBed!=bedNo)
  {
     Serial.println("2");

     if(frontdist>setdist)
    {
      Serial.println("3");


      if ((digitalRead(L_S0) == 0)&&(digitalRead(L_S) == 0)&&(digitalRead(S_S) == 0)&&(digitalRead(R_S) == 0)&&(digitalRead(R_S0) == 0)){Forward(); alreadyStop = false;}    
      if ((digitalRead(L_S0) == 0)&&(digitalRead(L_S) == 0)&&(digitalRead(S_S) == 1)&&(digitalRead(R_S) == 0)&&(digitalRead(R_S0) == 0)){Forward(); alreadyStop = false;}
        
      if ((digitalRead(L_S0) == 0)&&(digitalRead(L_S) == 1)&&(digitalRead(S_S) == 0)&&(digitalRead(R_S) == 0)&&(digitalRead(R_S0) == 0)){turnLeft(); alreadyStop = false;}
      if ((digitalRead(L_S0) == 1)&&(digitalRead(L_S) == 0)&&(digitalRead(S_S) == 0)&&(digitalRead(R_S) == 0)&&(digitalRead(R_S0) == 0)){turnLeft(); alreadyStop = false;}
      
      if ((digitalRead(L_S0) == 0)&&(digitalRead(L_S) == 0)&&(digitalRead(S_S) == 0)&&(digitalRead(R_S) == 1)&&(digitalRead(R_S0) == 0)){turnRight(); alreadyStop = false;}
      if ((digitalRead(L_S0) == 0)&&(digitalRead(L_S) == 0)&&(digitalRead(S_S) == 0)&&(digitalRead(R_S) == 0)&&(digitalRead(R_S0) == 1)){turnRight(); alreadyStop = false;}
      
      if ((digitalRead(L_S0) == 1)&&(digitalRead(L_S) == 1)&&(digitalRead(S_S) == 1)&&(digitalRead(R_S) == 1)&&(digitalRead(R_S0) == 1))
      {
        Stop();
        Serial.println("4");

        if(!alreadyStop)
        {
          currBed++;
        }
        digitalWrite(LFR_Led, HIGH);
        alreadyStop = true;

        Serial.println(currBed);

        if(currBed == 4)
        {
          currBed == 0;
          inTransit = false;
//          return;
        }
      }
    }
    else
    {
      Stop();
    }
  }
  else
  {
    int deliveryState=-100;
    digitalWrite(hasReached_Led, HIGH);
    patchDocument("true");

    digitalWrite(IN_1, LOW);
    digitalWrite(IN_2, LOW);
    digitalWrite(IN_3, LOW);
    digitalWrite(IN_4, LOW);

    delay(4000);          //25000

    while(deliveryState != 1)
    {
     deliveryState = isCompleted(); 

     Serial.print("deliveryState : ");
     Serial.println(deliveryState);
     delay(4000);          //25000
    }

    if(deliveryState == 1)
    {
      bedNo=0;
    }
  } 
}
void patchDocument(String hasReached)
{
  if(WiFi.status() == WL_CONNECTED && Firebase.ready())
  {
    String documentPath2 = documentId;
    FirebaseJson content2;
    content2.set("fields/hasReached/stringValue", hasReached);
  
    if(Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath2.c_str(), content2.raw(), "hasReached"))
    {
      Serial.printf("Patch 'hasReached' Success\n%s\n\n", fbdo.payload().c_str());
      Serial.println("");
    }
    else
    {
      Serial.println(fbdo.errorReason());
      if (Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath2.c_str(), content2.raw()))
      {
        Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
      }
      else
      {
        Serial.println(fbdo.errorReason());
      }
    }
  }
}
int firestoreDataUpdate()
{
  if(WiFi.status() == WL_CONNECTED && Firebase.ready())
  {
    Serial.print("Get documents... ");
    if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), ""))
    {
      Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());

      content.setJsonData(fbdo.payload().c_str());
      content.get(result, "documents");
       
      //Get array data
      result.get<FirebaseJsonArray>(arr);
   
      for (size_t i = 0; i < arr.size(); i++)
      {
        arr.get(result, "["+String(i)+"]/fields/status/stringValue");

        if (result.to<String>()=="pending")
        {    
          arr.get(result, "["+String(i)+"]/fields/bed/stringValue");
      
          bedNo = result.to<int>();
          inTransit = true;
    
          Serial.println("Storing document ID... ");
          arr.get(result, "["+String(i)+"]/name");
          if (result.success)
          {          
              String tempId = result.to<String>();          
              documentId = tempId.substring(52);
          
              Serial.println(documentId);          
          }
          patchDocument("false");

          return bedNo;
        }
      }
    }        
  }
  return 0;
}
int isCompleted()
{  
  if(WiFi.status() == WL_CONNECTED && Firebase.ready())
  {
    FirebaseJson contentStatus;
    FirebaseJsonArray arrStatus;

    String tempId_Status;

    Serial.print("Get documents... ");
    if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), ""))
    {
      Serial.printf("Get OK\n%s\n\n", fbdo.payload().c_str());
      Serial.println("");

      contentStatus.setJsonData(fbdo.payload().c_str());
      contentStatus.get(result, "documents");
       
      //Get array data
      result.get<FirebaseJsonArray>(arrStatus);
   
      for (size_t i = 0; i < arrStatus.size(); i++)
      {
        arrStatus.get(result, "["+String(i)+"]/name");
        if (result.success)
        {          
            tempId_Status = result.to<String>();       
            tempId_Status = tempId_Status.substring(52);
//            Serial.println("Get temp ID Success");
            if(tempId_Status == documentId)
            {
//          Serial.println("true");
              
              arrStatus.get(result, "["+String(i)+"]/fields/status/stringValue");
    
              Serial.println(result.to<String>());
    
              if (result.to<String>()=="completed")
              {
                Serial.println("Status: ");
                Serial.println(result.to<String>());    
                
                return 1;
              }
                
            }
        }

//        Serial.print("tempId: ");
//        Serial.println(tempId_Status);
//        Serial.print("documentId: ");
//        Serial.println(documentId);
      }
      return 0;
    }    
    else
    {
      Serial.println(fbdo.errorReason());
      return -1;
    }
  }
  else
  {
    return -2;
  }
}
long data(){
 digitalWrite(trigpin,LOW);
 delayMicroseconds(2);
 digitalWrite(trigpin,HIGH);
 delayMicroseconds(10);
 duration=pulseIn (echopin,HIGH);
 return duration / 29 / 2;
}

void Forward()
{
  Serial.println("Forward");

  digitalWrite(LFR_Led, LOW);


  analogWrite(EN_A, 120);
  analogWrite(EN_B, 120);
  
  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, HIGH);
  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, HIGH);
}


void turnRight()
{
  Serial.println("Right");

  digitalWrite(LFR_Led, LOW);

  analogWrite(EN_A, 150);
  analogWrite(EN_B, 150);
  
  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, HIGH);
  digitalWrite(IN_3, HIGH);
  digitalWrite(IN_4, LOW);
}

void turnLeft()
{
  Serial.println("Left");

  digitalWrite(LFR_Led, LOW);

  analogWrite(EN_A, 150);
  analogWrite(EN_B, 150);

  digitalWrite(IN_1, HIGH);
  digitalWrite(IN_2, LOW);
  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, HIGH);
}

void Stop()
{
  Serial.println("Stop");

  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, LOW);
  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, LOW);

}
