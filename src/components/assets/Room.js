import React, { Component } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import h from "./js/helpers.js";
require("./js/events");
const {
  getStats,
  getUserMedia,
  MediaStream,
  MediaStreamTrack,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} = require("@twilio/webrtc");
export default class Room extends Component {
  componentDidMount() {
    const room = h.getQString(window.location.href, "room");
    const username = sessionStorage.getItem("username");
    var stompClient = null;
    if (!room) {
      document
        .querySelector("#room-create")
        .attributes.removeNamedItem("hidden");
    } else if (!username) {
      document
        .querySelector("#username-set")
        .attributes.removeNamedItem("hidden");
    } else {
      let commElem = document.getElementsByClassName("room-comm");

      for (let i = 0; i < commElem.length; i++) {
        commElem[i].attributes.removeNamedItem("hidden");
      }

      var pc = [];

      var socket = new SockJS("http://localhost:8080/stream");

      var socketId = "";
      var myStream = "";
      var screen = "";
      var recordedStream = [];
      var mediaRecorder = "";

      //Get user video by default
      getAndSetUserStream();

      stompClient = Stomp.over(socket);
      console.log("--------------------- stopm over sockjs");
      stompClient.connect({}, function (frame) {
        socketId = Math.round(Math.random() * 100000000);
        stompClient.send(
          "/app/subscribe",
          {},
          JSON.stringify({
            room: room,
            socketId: socketId,
          })
        );
        console.log("--------------------- stopm after sockjs");
        console.log(room);
        stompClient.subscribe("/topic/new_user/" + room, (data) => {
          data = JSON.parse(data.body);
          if (data.socketId === socketId) return;

          stompClient.send(
            "/app/newUserStart/" + room,
            {},
            JSON.stringify({ to: data.socketId, sender: socketId })
          );
          console.log("data");
          console.log(data);
          console.log("data");
          pc.push(data.socketId);
          init(true, data.socketId);
        });

        stompClient.subscribe("/topic/newUserStart/" + socketId, (data) => {
          data = JSON.parse(data.body);

          pc.push(data.sender);
          init(false, data.sender);
        });

        stompClient.subscribe(
          "/topic/ice_candidates/" + socketId,
          async (data) => {
            data = JSON.parse(data.body);

            const caca = JSON.parse(data.candidate);

            if (caca)
              await pc[data.sender].addIceCandidate(new RTCIceCandidate(caca));
          }
        );

        stompClient.subscribe("/topic/chat/" + room, (data) => {
          data = JSON.parse(data.body);
          if (data.sender === username) return;
          h.addChat(data, "remote");
        });

        stompClient.subscribe("/topic/sdp/" + socketId, async (data) => {
          data = JSON.parse(data.body);
          const ss = JSON.parse(data.description);
          if (ss.type === "offer") {
            if (ss)
              await pc[data.sender].setRemoteDescription(
                new RTCSessionDescription(ss)
              );

            h.getUserFullMedia()
              .then(async (stream) => {
                if (!document.getElementById("local").srcObject) {
                  h.setLocalStream(stream);
                }

                //save my stream
                myStream = stream;

                stream.getTracks().forEach((track) => {
                  pc[data.sender].addTrack(track, stream);
                });

                let answer = await pc[data.sender].createAnswer();

                await pc[data.sender].setLocalDescription(answer);
                const oo = JSON.stringify(pc[data.sender].localDescription);

                stompClient.send(
                  "/app/sdp/" + room,
                  {},
                  JSON.stringify({
                    description: oo,
                    to: data.sender,
                    sender: socketId,
                  })
                );
              })
              .catch((e) => {
                console.error(e);
              });
          } else if (data.description.type === "answer") {
            await pc[data.sender].setRemoteDescription(
              new RTCSessionDescription(data.description)
            );
          }
        });
      });

      /*  socket.on("connect", () => {
        //set socketId
        socketId = socket.io.engine.id;
  
        socket.emit("subscribe", {
          room: room,
          socketId: socketId,
        });
        socket.on("ice candidates", async (data) => {
          data.candidate
            ? await pc[data.sender].addIceCandidate(
                new RTCIceCandidate(data.candidate)
              )
            : "";
        });
  
        socket.on("new user", (data) => {
          socket.emit("newUserStart", { to: data.socketId, sender: socketId });
          pc.push(data.socketId);
          init(true, data.socketId);
        });
  
        socket.on("newUserStart", (data) => {
          pc.push(data.sender);
          init(false, data.sender);
        });
  
        socket.on("sdp", async (data) => {
          if (data.description.type === "offer") {
            data.description
              ? await pc[data.sender].setRemoteDescription(
                  new RTCSessionDescription(data.description)
                )
              : "";
  
            h.getUserFullMedia()
              .then(async (stream) => {
                if (!document.getElementById("local").srcObject) {
                  h.setLocalStream(stream);
                }
  
                //save my stream
                myStream = stream;
  
                stream.getTracks().forEach((track) => {
                  pc[data.sender].addTrack(track, stream);
                });
  
                let answer = await pc[data.sender].createAnswer();
  
                await pc[data.sender].setLocalDescription(answer);
  
                socket.emit("sdp", {
                  description: pc[data.sender].localDescription,
                  to: data.sender,
                  sender: socketId,
                });
              })
              .catch((e) => {
                console.error(e);
              });
          } else if (data.description.type === "answer") {
            await pc[data.sender].setRemoteDescription(
              new RTCSessionDescription(data.description)
            );
          }
        });
  
        socket.on("chat", (data) => {
          h.addChat(data, "remote");
        });
      });*/

      function getAndSetUserStream() {
        h.getUserFullMedia()
          .then((stream) => {
            //save my stream
            myStream = stream;

            h.setLocalStream(stream);
          })
          .catch((e) => {
            console.error(`stream error: ${e}`);
          });
      }

      function sendMsg(msg) {
        let data = {
          room: room,
          msg: msg,
          sender: username,
        };

        //emit chat message
        stompClient.send("/app/chat/" + room, {}, JSON.stringify(data));

        //add localchat
        h.addChat(data, "local");
      }

      function init(createOffer, partnerName) {
        pc[partnerName] = new RTCPeerConnection(h.getIceServer());

        if (screen && screen.getTracks().length) {
          screen.getTracks().forEach((track) => {
            pc[partnerName].addTrack(track, screen); //should trigger negotiationneeded event
          });
        } else if (myStream) {
          myStream.getTracks().forEach((track) => {
            pc[partnerName].addTrack(track, myStream); //should trigger negotiationneeded event
          });
        } else {
          h.getUserFullMedia()
            .then((stream) => {
              //save my stream
              myStream = stream;

              stream.getTracks().forEach((track) => {
                pc[partnerName].addTrack(track, stream); //should trigger negotiationneeded event
              });

              h.setLocalStream(stream);
            })
            .catch((e) => {
              console.error(`stream error: ${e}`);
            });
        }

        //create offer
        if (createOffer) {
          pc[partnerName].onnegotiationneeded = async () => {
            let offer = await pc[partnerName].createOffer();

            await pc[partnerName].setLocalDescription(offer);
            const oll = JSON.stringify(pc[partnerName].localDescription);
            stompClient.send(
              "/app/sdp/" + room,
              {},
              JSON.stringify({
                description: oll,
                to: partnerName,
                sender: socketId,
              })
            );
          };
        }

        //send ice candidate to partnerNames
        pc[partnerName].onicecandidate = ({ candidate }) => {
          const lili = JSON.stringify(candidate);
          stompClient.send(
            "/app/ice_candidates/" + room,
            {},
            JSON.stringify({
              candidate: lili,
              to: partnerName,
              sender: socketId,
            })
          );
        };

        //add
        pc[partnerName].ontrack = (e) => {
          let str = e.streams[0];
          if (document.getElementById(`${partnerName}-video`)) {
            document.getElementById(`${partnerName}-video`).srcObject = str;
          } else {
            //video elem
            let newVid = document.createElement("video");
            newVid.id = `${partnerName}-video`;
            newVid.srcObject = str;
            newVid.autoPlay = true;
            newVid.className = "remote-video";

            //video controls elements
            let controlDiv = document.createElement("div");
            controlDiv.className = "remote-video-controls";
            controlDiv.innerHTML = `<i class="fa fa-microphone text-white pr-3 mute-remote-mic" title="Mute"></i>
                          <i class="fa fa-expand text-white expand-remote-video" title="Expand"></i>`;

            //create a new div for card
            let cardDiv = document.createElement("div");
            cardDiv.className = "card card-sm";
            cardDiv.id = partnerName;
            cardDiv.appendChild(newVid);
            cardDiv.appendChild(controlDiv);

            //put div in main-section elem
            document.getElementById("videos").appendChild(cardDiv);

            h.adjustVideoElemSize();
          }
        };

        pc[partnerName].onconnectionstatechange = (d) => {
          switch (pc[partnerName].iceConnectionState) {
            case "disconnected":
            case "failed":
              h.closeVideo(partnerName);
              break;

            case "closed":
              h.closeVideo(partnerName);
              break;
          }
        };

        pc[partnerName].onsignalingstatechange = (d) => {
          switch (pc[partnerName].signalingState) {
            case "closed":
              console.log("Signalling state is 'closed'");
              h.closeVideo(partnerName);
              break;
          }
        };
      }

      function shareScreen() {
        h.shareScreen()
          .then((stream) => {
            h.toggleShareIcons(true);

            //disable the video toggle btns while sharing screen. This is to ensure clicking on the btn does not interfere with the screen sharing
            //It will be enabled was user stopped sharing screen
            h.toggleVideoBtnDisabled(true);

            //save my screen stream
            screen = stream;

            //share the new stream with all partners
            broadcastNewTracks(stream, "video", false);

            //When the stop sharing button shown by the browser is clicked
            screen.getVideoTracks()[0].addEventListener("ended", () => {
              stopSharingScreen();
            });
          })
          .catch((e) => {
            console.error(e);
          });
      }

      function stopSharingScreen() {
        //enable video toggle btn
        h.toggleVideoBtnDisabled(false);

        return new Promise((res, rej) => {
          if (screen.getTracks().length)
            screen.getTracks().forEach((track) => track.stop());

          res();
        })
          .then(() => {
            h.toggleShareIcons(false);
            broadcastNewTracks(myStream, "video");
          })
          .catch((e) => {
            console.error(e);
          });
      }

      function broadcastNewTracks(stream, type, mirrorMode = true) {
        h.setLocalStream(stream, mirrorMode);

        let track =
          type === "audio"
            ? stream.getAudioTracks()[0]
            : stream.getVideoTracks()[0];

        for (let p in pc) {
          let pName = pc[p];

          if (typeof pc[pName] == "object") {
            h.replaceTrack(track, pc[pName]);
          }
        }
      }

      function toggleRecordingIcons(isRecording) {
        let e = document.getElementById("record");

        if (isRecording) {
          e.setAttribute("title", "Stop recording");
          e.children[0].classList.add("text-danger");
          e.children[0].classList.remove("text-white");
        } else {
          e.setAttribute("title", "Record");
          e.children[0].classList.add("text-white");
          e.children[0].classList.remove("text-danger");
        }
      }

      function startRecording(stream) {
        mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp9",
        });

        mediaRecorder.start(1000);
        toggleRecordingIcons(true);

        mediaRecorder.ondataavailable = function (e) {
          recordedStream.push(e.data);
        };

        mediaRecorder.onstop = function () {
          toggleRecordingIcons(false);

          h.saveRecordedStream(recordedStream, username);

          setTimeout(() => {
            recordedStream = [];
          }, 3000);
        };

        mediaRecorder.onerror = function (e) {
          console.error(e);
        };
      }

      //Chat textarea
      document
        .getElementById("chat-input")
        .addEventListener("keypress", (e) => {
          if (e.which === 13 && e.target.value.trim()) {
            e.preventDefault();

            sendMsg(e.target.value);

            setTimeout(() => {
              e.target.value = "";
            }, 50);
          }
        });

      //When the video icon is clicked
      document.getElementById("toggle-video").addEventListener("click", (e) => {
        e.preventDefault();

        let elem = document.getElementById("toggle-video");

        if (myStream.getVideoTracks()[0].enabled) {
          e.target.classList.remove("fa-video");
          e.target.classList.add("fa-video-slash");
          elem.setAttribute("title", "Show Video");

          myStream.getVideoTracks()[0].enabled = false;
        } else {
          e.target.classList.remove("fa-video-slash");
          e.target.classList.add("fa-video");
          elem.setAttribute("title", "Hide Video");

          myStream.getVideoTracks()[0].enabled = true;
        }

        broadcastNewTracks(myStream, "video");
      });

      //When the mute icon is clicked
      document.getElementById("toggle-mute").addEventListener("click", (e) => {
        e.preventDefault();

        let elem = document.getElementById("toggle-mute");

        if (myStream.getAudioTracks()[0].enabled) {
          e.target.classList.remove("fa-microphone-alt");
          e.target.classList.add("fa-microphone-alt-slash");
          elem.setAttribute("title", "Unmute");

          myStream.getAudioTracks()[0].enabled = false;
        } else {
          e.target.classList.remove("fa-microphone-alt-slash");
          e.target.classList.add("fa-microphone-alt");
          elem.setAttribute("title", "Mute");

          myStream.getAudioTracks()[0].enabled = true;
        }

        broadcastNewTracks(myStream, "audio");
      });

      //When user clicks the 'Share screen' button
      document.getElementById("share-screen").addEventListener("click", (e) => {
        e.preventDefault();

        if (
          screen &&
          screen.getVideoTracks().length &&
          screen.getVideoTracks()[0].readyState !== "ended"
        ) {
          stopSharingScreen();
        } else {
          shareScreen();
        }
      });

      //When record button is clicked
      document.getElementById("record").addEventListener("click", (e) => {
        /**
         * Ask user what they want to record.
         * Get the stream based on selection and start recording
         */
        if (!mediaRecorder || mediaRecorder.state === "inactive") {
          h.toggleModal("recording-options-modal", true);
        } else if (mediaRecorder.state === "paused") {
          mediaRecorder.resume();
        } else if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
      });

      //When user choose to record screen
      document.getElementById("record-screen").addEventListener("click", () => {
        h.toggleModal("recording-options-modal", false);

        if (screen && screen.getVideoTracks().length) {
          startRecording(screen);
        } else {
          h.shareScreen()
            .then((screenStream) => {
              startRecording(screenStream);
            })
            .catch(() => {});
        }
      });

      //When user choose to record own video
      document.getElementById("record-video").addEventListener("click", () => {
        h.toggleModal("recording-options-modal", false);

        if (myStream && myStream.getTracks().length) {
          startRecording(myStream);
        } else {
          h.getUserFullMedia()
            .then((videoStream) => {
              startRecording(videoStream);
            })
            .catch(() => {});
        }
      });
    }

    document
      .querySelector("#toggle-chat-pane")
      .addEventListener("click", (e) => {
        let chatElem = document.querySelector("#chat-pane");
        let mainSecElem = document.querySelector("#main-section");

        if (chatElem.classList.contains("chat-opened")) {
          chatElem.setAttribute("hidden", true);
          mainSecElem.classList.remove("col-md-9");
          mainSecElem.classList.add("col-md-12");
          chatElem.classList.remove("chat-opened");
        } else {
          chatElem.attributes.removeNamedItem("hidden");
          mainSecElem.classList.remove("col-md-12");
          mainSecElem.classList.add("col-md-9");
          chatElem.classList.add("chat-opened");
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout(() => {
          if (
            document
              .querySelector("#chat-pane")
              .classList.contains("chat-opened")
          ) {
            h.toggleChatNotificationBadge();
          }
        }, 300);
      });

    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById("local").addEventListener("click", () => {
      if (!document.pictureInPictureElement) {
        document
          .getElementById("local")
          .requestPictureInPicture()
          .catch((error) => {
            // Video failed to enter Picture-in-Picture mode.
            console.error(error);
          });
      } else {
        document.exitPictureInPicture().catch((error) => {
          // Video failed to leave Picture-in-Picture mode.
          console.error(error);
        });
      }
    });

    //When the 'Create room" is button is clicked
    document.getElementById("create-room").addEventListener("click", (e) => {
      e.preventDefault();
      console.log("hhhhhhhhhhhhhhhhhhhhh");
      let roomName = document.querySelector("#room-name").value;
      let yourName = document.querySelector("#your-name").value;

      if (roomName && yourName) {
        //remove error message, if any
        document.querySelector("#err-msg").innerHTML = "";

        //save the user's name in sessionStorage
        sessionStorage.setItem("username", yourName);
        console.log(window.location.origin);
        //create room link
        let roomLink = `${
          window.location.origin + "/room/"
        }?room=${roomName
          .trim()
          .replace(" ", "_")}_${h.generateRandomString()}`;
        console.log(window.location.origin);
        //show message with link to room
        document.querySelector(
          "#room-created"
        ).innerHTML = `Room successfully created. Click <a href='${roomLink}'>here</a> to enter room. 
                Share the room link with your partners.`;

        //empty the values
        document.querySelector("#room-name").value = "";
        document.querySelector("#your-name").value = "";
      } else {
        document.querySelector("#err-msg").innerHTML =
          "All fields are required";
      }
    });

    //When the 'Enter room' button is clicked.
    document.getElementById("enter-room").addEventListener("click", (e) => {
      e.preventDefault();

      let name = document.querySelector("#username").value;

      if (name) {
        //remove error message, if any
        document.querySelector("#err-msg-username").innerHTML = "";

        //save the user's name in sessionStorage
        sessionStorage.setItem("username", name);

        //reload room
        window.location.reload();
      } else {
        document.querySelector("#err-msg-username").innerHTML =
          "Please input your name";
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("expand-remote-video")) {
        h.maximiseStream(e);
      } else if (e.target && e.target.classList.contains("mute-remote-mic")) {
        h.singleStreamToggleMute(e);
      }
    });

    document.getElementById("closeModal").addEventListener("click", () => {
      h.toggleModal("recording-options-modal", false);
    });
  }
  render() {
    return (
      <>
        <div className="custom-modal" id="recording-options-modal">
          <div className="custom-modal-content">
            <div className="row text-center">
              <div className="col-md-6 mb-2">
                <span className="record-option" id="record-video">
                  Record video
                </span>
              </div>
              <div className="col-md-6 mb-2">
                <span className="record-option" id="record-screen">
                  Record screen
                </span>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12 text-center">
                <button className="btn btn-outline-danger" id="closeModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <nav className="navbar fixed-top bg-info rounded-0 d-print-none">
          <div className="text-white">Video Call</div>

          <div className="pull-right room-comm" hidden>
            <button
              className="btn btn-sm rounded-0 btn-no-effect"
              id="toggle-video"
              title="Hide Video"
            >
              <i className="fa fa-video text-white"></i>
            </button>

            <button
              className="btn btn-sm rounded-0 btn-no-effect"
              id="toggle-mute"
              title="Mute"
            >
              <i className="fa fa-microphone-alt text-white"></i>
            </button>

            <button
              className="btn btn-sm rounded-0 btn-no-effect"
              id="share-screen"
              title="Share screen"
            >
              <i className="fa fa-desktop text-white"></i>
            </button>

            <button
              className="btn btn-sm rounded-0 btn-no-effect"
              id="record"
              title="Record"
            >
              <i className="fa fa-dot-circle text-white"></i>
            </button>

            <button
              className="btn btn-sm text-white pull-right btn-no-effect"
              id="toggle-chat-pane"
            >
              <i className="fa fa-comment"></i>
              <span
                className="badge badge-danger very-small font-weight-lighter"
                id="new-chat-notification"
                hidden
              >
                New
              </span>
            </button>

            <button className="btn btn-sm rounded-0 btn-no-effect text-white">
              <a href="/" className="text-white text-decoration-none">
                <i className="fa fa-sign-out-alt text-white" title="Leave"></i>
              </a>
            </button>
          </div>
        </nav>

        <div className="container-fluid" id="room-create" hidden>
          <div className="row">
            <div className="col-12 h2 mt-5 text-center">Create Room</div>
          </div>

          <div className="row mt-2">
            <div className="col-12 text-center">
              <span className="form-text small text-danger" id="err-msg"></span>
            </div>

            <div className="col-12 col-md-4 offset-md-4 mb-3">
              <label htmlFor="room-name">Room Name</label>
              <input
                type="text"
                id="room-name"
                className="form-control rounded-0"
                placeholder="Room Name"
              />
            </div>

            <div className="col-12 col-md-4 offset-md-4 mb-3">
              <label htmlFor="your-name">Your Name</label>
              <input
                type="text"
                id="your-name"
                className="form-control rounded-0"
                placeholder="Your Name"
              />
            </div>

            <div className="col-12 col-md-4 offset-md-4 mb-3">
              <button
                id="create-room"
                className="btn btn-block rounded-0 btn-info"
              >
                Create Room
              </button>
            </div>

            <div
              className="col-12 col-md-4 offset-md-4 mb-3"
              id="room-created"
            ></div>
          </div>
        </div>

        <div className="container-fluid" id="username-set" hidden>
          <div className="row">
            <div className="col-12 h4 mt-5 text-center">Your Name</div>
          </div>

          <div className="row mt-2">
            <div className="col-12 text-center">
              <span
                className="form-text small text-danger"
                id="err-msg-username"
              ></span>
            </div>

            <div className="col-12 col-md-4 offset-md-4 mb-3">
              <label htmlFor="username">Your Name</label>
              <input
                type="text"
                id="username"
                className="form-control rounded-0"
                placeholder="Your Name"
              />
            </div>

            <div className="col-12 col-md-4 offset-md-4 mb-3">
              <button
                id="enter-room"
                className="btn btn-block rounded-0 btn-info"
              >
                Enter Room
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid room-comm" hidden>
          <div className="row">
            <video
              className="local-video mirror-mode"
              id="local"
              volume="0"
              autoPlay
              muted
            ></video>
          </div>

          <div className="row">
            <div className="col-md-12 main" id="main-section">
              <div className="row mt-2 mb-2" id="videos"></div>
            </div>

            <div
              className="col-md-3 chat-col d-print-none mb-2 bg-info"
              id="chat-pane"
              hidden
            >
              <div className="row">
                <div className="col-12 text-center h2 mb-3">CHAT</div>
              </div>

              <div id="chat-messages"></div>

              <div className="row">
                <textarea
                  id="chat-input"
                  className="form-control rounded-0 chat-box border-info"
                  rows="3"
                  placeholder="Type here..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
