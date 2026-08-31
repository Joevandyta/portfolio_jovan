import {
  Smartphone,
  Code2,
  Cpu,
  Globe,
  Database,
  Layout,
  Layers,
} from "lucide-react";
import descripixBanner from "../assets/descripix_banner.jpg";
import artscape from "../assets/artscape.jpg";
import stickerifyWeb from "../assets/stickerify-web.png";
import stickerifyMobile from "../assets/stickerify-mobile.jpeg";
export const DATA = {
  name: "Joe Aqilla Vandyta",
  nickname: "Jovan",
  titles: ["Android Developer", "Flutter Developer", "Full Stack Developer"],
  tagline:
    "Crafting seamless mobile experiences and robust full-stack solutions with a keen eye for design and performance.",
  about:
    "I am a passionate developer with a strong foundation in mobile and web technologies. I specialize in building high-quality applications that combine elegant user interfaces with powerful backend systems. I enjoy the process of building something from scratch and seeing it come to life.",
  skills: [
    { name: "Dart", icon: <Code2 className="w-5 h-5" />, category: "Language" },
    { name: "Python", icon: <Cpu className="w-5 h-5" />, category: "Language" },
    {
      name: "Flutter",
      icon: <Layers className="w-5 h-5" />,
      category: "Mobile",
    },
    {
      name: "Kotlin",
      icon: <Smartphone className="w-5 h-5" />,
      category: "Mobile",
    },
    {
      name: "MongoDB",
      icon: <Database className="w-5 h-5" />,
      category: "Database",
    },
    {
      name: "Django",
      icon: <Globe className="w-5 h-5" />,
      category: "Framework",
    },
    {
      name: "Next.js",
      icon: <Layout className="w-5 h-5" />,
      category: "Framework",
    },
  ],
  projects: [
    {
      name: "Descripix",
      description:
        "An AI-powered Android application that leverages Artificial Intelligence to breathe life into your photos by automatically generating descriptive, creative, and context-aware captions.",
      tech: ["Kotlin", "Jetpack Compose", "Retrofit", "Python", "Django REST"],
      link: "https://github.com/Joevandyta/Descripix.git",
      
      image: descripixBanner,
    },
    {
      name: "Stickerify - Sticker web",
      description:
        "A sticker web application that allows users to explore sticker, memes, and other pixel arts created by the community. Users can also upload their own sticker and share it with the community. Also available for download as sticker pack for WhatsApp and Telegram.",
      tech: ["NextJS", "Tailwind CSS", "TypeScript", "mongoDB", "cloudinary"],
      link: "https://stickerify-web.vercel.app",
      image: stickerifyWeb,
    },
    {
      name: "Stickerify App",
      description:
        "An android application that allows users to create, save, edit and share sticker packs to whatsapp. Also browse sticker from Stickerify - Sticker web",
      tech: ["Dart", "Flutter", "REST API", "Isar"],
      link: "https://github.com/Joevandyta/stickerify-mobile-app.git",
      image: stickerifyMobile,
    },
    {
      name: "Artscape",
      description:
        "ArtScape is an Android application designed to connect artists and art enthusiasts. ArtScape provides a platform for artists to showcase and sell their paintings, and for users to discover, search, and purchase artworks.",
      tech: ["Kotlin", "Jetpack Compose", "Retrofit"],
      link: "https://github.com/ArtScape-Capstone-C241-PS054/Mobile-Development.git",
      image: artscape,
    },
  ],
  contact: {
    email: "joevandyta@gmail.com",
    github: "Joevandyta",
    linkedin: "www.linkedin.com/in/joe-aqilla-vandyta-b73220300",
  },
};
