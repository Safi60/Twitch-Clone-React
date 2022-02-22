import React, { useState, useEffect } from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { useParams } from "react-router-dom";
import api from "../../Api";
import "./ChannelLive.css";
import Viewer from "./Settings.svg";

export default function ChannelLive() {
  let { slug } = useParams();

  const [infoChannel, setInfoChannel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?user_login=${slug}`
      );

      let dataArray = result.data.data;

      function getHourFormatFromMilliSeconds(millisec) {
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(Number(seconds) / 60).toString();
        let hours;
        if (Number(minutes) > 59) {
          hours = Math.floor(Number(minutes) / 60);
          hours = hours >= 10 ? hours : "0" + hours;
          minutes = (Number(minutes) - hours * 60).toString();
          minutes = Number(minutes) >= 10 ? minutes : "0" + minutes;
        }

        seconds = Math.floor(Number(seconds) % 60).toString();
        seconds = Number(seconds) >= 10 ? seconds : "0" + seconds;
        if (!hours) {
          hours = "00";
        }
        if (!minutes) {
          minutes = "00";
        }
        if (!seconds) {
          seconds = "00";
        }
        return hours + ":" + minutes + ":" + seconds;
      }

      const datenow = Date.now();
      dataArray[0].duration = dataArray[0].started_at;
      dataArray[0].duration = Date.parse(dataArray[0].duration);
      dataArray[0].duration = datenow - dataArray[0].duration;
      dataArray[0].duration = getHourFormatFromMilliSeconds(
        dataArray[0].duration
      );

      let userURL = `https://api.twitch.tv/helix/users?login=${slug}`;
      let getUser = await api.get(userURL);
      let arrayUser = getUser.data.data;

      dataArray[0].imageProfile = "";
      if (dataArray[0].user_login === arrayUser[0].login) {
        dataArray[0].imageProfile = arrayUser[0].profile_image_url;
      }

      setInfoChannel(dataArray[0]);
    };

    fetchData();
  }, [slug]);

  return (
    <div className="ChannelLive">
      <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
      <div className="containerChannel">
        <div className="channelLivePicture">
          <img src={infoChannel.imageProfile} alt="" />
        </div>
        <div className="cardChannel">
          <div className="channelLiveBody">
            <div className="username">
              <h1>{infoChannel.user_name}</h1>
            </div>
            <div className="infoUserChannel">
              <div>
                <h2>{infoChannel.title}</h2>
                <h3>{infoChannel.game_name}</h3>
              </div>
            </div>
          </div>
          <div className="startAndView">
            <div className="container-viewer">
              <img src={Viewer} alt="viewer" className="viewerLive" />
              <span>{infoChannel.viewer_count}</span>
            </div>
            <div className="containerStreamStart">
              <p>{infoChannel.duration}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
