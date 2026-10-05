const img3336 = new URL('../image/IMG_3336.JPG', import.meta.url).href;
const img3339 = new URL('../image/IMG_3339.JPG', import.meta.url).href;
const img3329 = new URL('../image/IMG_3329.JPG', import.meta.url).href;
const img3327 = new URL('../image/IMG_3327.JPG', import.meta.url).href;
const img3326 = new URL('../image/IMG_3326.JPG', import.meta.url).href;

export type MemoryItem = {
  id: string;
  title: string;
  caption: string;
  image: string;
  message: string;
  accent: string;
};

export type TimelineItem = {
  date: string;
  title: string;
  description: string;
};

const contentConfig = {
  girlfriendName: 'My Love',
  birthdayDate: 'October 5th',
  heroTitle: 'Happy Birthday, My Love!',
  heroSubtitle:
    'Every day with you feels like a beautiful memory in motion. You are my favorite person, my sweetest comfort, and the reason my heart always feels at home.',
  cakeMessage:
    'You are the candle that lights up my life, the smile I never get tired of, and the love I pray for every single day.',
  loveLetter:
    'To the most beautiful woman in the world: I love you in the quiet moments, in the loud laughter, in every plan and every dream. My heart has found its home in you, and I will always choose you.',
  profileImage: img3336,
  profileAlt: 'Your beautiful girlfriend portrait',
  backgroundMusicUrl: new URL('../Ayra_Starr_ft_ZAYN_-_Heaven_Baby.mp3', import.meta.url).href,
  galleryPhotos: [img3336, img3339, img3329],
  loveMessages: [
    'You are the calm in my chaos and the joy in my every day.',
    'Your smile still makes my heart skip like it did on day one.',
    'I love the way you make ordinary moments feel unforgettable.',
    'With you, life feels gentle, warm, and endlessly beautiful.',
  ],
  memories: [
    {
      id: 'first-date',
      title: 'Forever Glow',
      caption: 'You make every moment feel magical.',
      image: img3339,
      message:
        'Looking at this picture reminds me of how effortlessly beautiful you are and how lucky I am to love you.',
      accent: '#f9b4b6',
    },
    {
      id: 'late-night-talks',
      title: 'My Favorite Smile',
      caption: 'The smile that makes my world brighter.',
      image: img3329,
      message:
        'This smile is the reason my heart feels warm, safe, and endlessly happy. I never get tired of admiring it.',
      accent: '#d9b3a6',
    },
    {
      id: 'travel',
      title: 'Sweet Memories',
      caption: 'Every second with you is a treasure.',
      image: img3327,
      message:
        'I cherish every little moment with you because they all turn into memories I want to keep forever.',
      accent: '#e7cdb8',
    },
    {
      id: 'small-joys',
      title: 'You Are My Home',
      caption: 'Home is wherever you are.',
      image: img3326,
      message:
        'Being with you feels like peace, comfort, and love all at once. You are my favorite place to be.',
      accent: '#f3c8d7',
    },
  ] as MemoryItem[],
  timeline: [
    {
      date: 'Our Beginning',
      title: 'The Day We Met',
      description: 'Everything changed the moment our worlds connected, and I knew there was something unforgettable about you.',
    },
    {
      date: 'First Memory',
      title: 'Our First Laugh Together',
      description: 'One small moment turned into the start of a million more. Your laughter became one of my favorite sounds.',
    },
    {
      date: 'Our Growth',
      title: 'Learning Each Other',
      description: 'We kept discovering layers of each other and building a bond that felt calm, safe, and deeply real.',
    },
    {
      date: 'Now',
      title: 'A Love Worth Celebrating',
      description: 'Every day with you is a reminder that love is not just a feeling—it is a beautiful life we are building together.',
    },
  ] as TimelineItem[],
  surpriseMessage:
    'You are my forever favorite person, my greatest blessing, and the reason my heart feels so full. Happy Birthday, my love.',
};

export default contentConfig;
