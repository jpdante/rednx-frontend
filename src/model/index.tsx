export type VideoThumbnail = {
  title: string;
  guid: string;
  views: number;
  creationDate: number;
  time: number;
  thumb: string;
  channel: ChannelThumbnail;
};

export type ChannelThumbnail = {
  link: string;
  name: string;
  picture: string;
};

export type Video = {
  id: string;
  title: string;
  guid: string;
  views: number;
  creationDate: number;
  time: number;
  thumb: string;
  icon: string;
  description: string;
  classification: number;
  channel: Channel;
};

export type Channel = {
  id: string;
  link: string;
  name: string;
  picture: string;
  followers: number;
};