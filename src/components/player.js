import React from "react";
import dashjs from "dashjs";
import Plyr from "plyr";
import $ from "jquery";
import "plyr/src/sass/plyr.scss";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      video: props.video,
      player: null,
      sourceData: [],
    };
  }

  componentDidMount() {
    const video = document.querySelector("video");
    if (video === null) return;
    const player = new Plyr(video, {
      captions: { active: true, update: true },
      /*quality: {
        forced: true,
        default: 480,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
        onChange: null,
      },*/
    });

    const sourceData = [
      /*{
          src: "http://localhost:3000/assets/video/1080.mpd",
          size: 1080,
          mode: "mpd", // How to analyze
        },
        {
          src: "http://localhost:3000/assets/video/480.mpd",
          size: 480,
          mode: "mpd", // How to analyze
        }*/
    ];

    this.setState({
      player,
      sourceData,
    });

    player.source = {
      // type: 'audio',
      type: "video",
      title: "Titulo",
      sources: this.state.sourceData,
    };

    player.on("qualitychange", (event) => {
      this.initPlayer(this.state.sourceData, this.state.player);
    });
    this.initPlayer(sourceData, player);
  }

  initPlayer(sourceData, player) {
    $.each(sourceData, function () {
      const video = document.querySelector("video");
      $.each(sourceData, function () {
        // dash Adaptation
        if (
          this.mode === "mpd" &&
          this.size === player.config.quality.selected
        ) {
          // For more dash options, see https://github.com/Dash-Industry-Forum/dash.js
          const dash = dashjs.MediaPlayer().create();
          dash.updateSettings({
            debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE },
          });
          dash.initialize(video, this.src, true);
          // Expose player and dash so they can be used from the console
          window.player = player;
          window.dash = dash;
        }
      });
    });
  }

  render() {
    return (
      <video
        controls
        crossOrigin="true"
        playsInline
        poster={`/assets/${this.state.video.thumb}`}
      />
    );
  }
}

export default Player;
