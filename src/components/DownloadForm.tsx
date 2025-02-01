import React from 'react';
import { Download, Video, Music } from 'lucide-react';

interface DownloadFormProps {
  url: string;
  setUrl: (url: string) => void;
  downloadType: 'video' | 'music';
  setDownloadType: (type: 'video' | 'music') => void;
  todayDownloads: number;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function DownloadForm({
  url,
  setUrl,
  downloadType,
  setDownloadType,
  todayDownloads,
  isLoading,
  onSubmit
}: DownloadFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          TikTok Video URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter TikTok video URL"
          aria-label="TikTok video URL"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setDownloadType('video')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              downloadType === 'video'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-pressed={downloadType === 'video'}
          >
            <Video className="w-4 h-4 mr-2" aria-hidden="true" />
            Video
          </button>
          <button
            type="button"
            onClick={() => setDownloadType('music')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              downloadType === 'music'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-pressed={downloadType === 'music'}
          >
            <Music className="w-4 h-4 mr-2" aria-hidden="true" />
            Music
          </button>
        </div>
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <span className="text-sm text-gray-600">
            Downloads today: {todayDownloads}/3
          </span>
          <button
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            aria-busy={isLoading}
          >
            <Download className="w-4 h-4 mr-2" aria-hidden="true" />
            {isLoading ? 'Processing...' : 'Download'}
          </button>
        </div>
      </div>
    </form>
  );
}