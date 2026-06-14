export const FILE_SYSTEM = {
  Home: [
    {
      name: "Documents",
      type: "folder",
    },
    {
      name: "Downloads",
      type: "folder",
    },
    {
      name: "Pictures",
      type: "folder",
    },
    {
      name: "Music",
      type: "folder",
    },
    {
  name: "RecycleBin",
  type: "folder",
},
  ],

  Documents: [
    {
      name: "Resume.pdf",
      type: "pdf",
    },
    {
      name: "Notes.txt",
      type: "txt",
    },
    {
      name: "Projects",
      type: "folder",
    },
  ],

  Downloads: [
    {
      name: "setup.exe",
      type: "exe",
    },
    {
      name: "archive.zip",
      type: "zip",
    },
  ],

  Pictures: [
    {
      name: "wallpaper.jpg",
      type: "image",
    },
  ],

  Music: [
    {
      name: "song.mp3",
      type: "audio",
    },
  ],
  RecycleBin: [],
};

export const FILE_ICONS = {
  folder: "📁",
  pdf: "📄",
  txt: "📝",
  image: "🖼️",
  audio: "🎵",
  exe: "⚙️",
  zip: "📦",
};