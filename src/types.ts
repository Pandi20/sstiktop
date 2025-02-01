export interface Download {
  url: string;
  timestamp: number;
  author?: string;
  description?: string;
  stats?: {
    plays: number;
    likes: number;
    comments: number;
    shares: number;
  };
  videoInfo?: {
    duration: number;
    hdSize: number;
    musicInfo?: {
      title: string;
      author: string;
      duration: number;
    };
  };
  type: 'video' | 'music';
}