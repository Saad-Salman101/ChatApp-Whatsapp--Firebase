import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import CryptoJS from "crypto-js";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const secretKey = "helloworld"; // Replace with your secret key
  const iv = CryptoJS.lib.WordArray.random(16); // Initialization vector

  const encrypt = (text) => {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey, { iv });
    return {
      iv: iv.toString(),
      encryptedData: encrypted.toString(),
    };
  };

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    const encryptedText = encrypt(text); // Encrypt the message text
    // console.log(encryptedText)
    // console.log(encryptedText)
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: encryptedText.encryptedData, // Store the encrypted text in Firestore
                iv:encryptedText.iv,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
                
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: encryptedText.encryptedData,
            iv:encryptedText.iv, // Store the encrypted text in Firestore
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    // Rest of your code...
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
