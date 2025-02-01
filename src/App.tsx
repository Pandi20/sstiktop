import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Download, Heart } from 'lucide-react';
import { Download as DownloadType } from './types';
import { DownloadForm } from './components/DownloadForm';
import { ContentPreview } from './components/ContentPreview';
import { DownloadHistory } from './components/DownloadHistory';

function App() {
  const [url, setUrl] = useState('');
  const [downloads, setDownloads] = useState<DownloadType[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<DownloadType | null>(null);
  const [downloadType, setDownloadType] = useState<'video' | 'music'>('video');

  useEffect(() => {
    const storedDownloads = localStorage.getItem('downloads');
    if (storedDownloads) {
      setDownloads(JSON.parse(storedDownloads));
    }
  }, []);

  const getTodayDownloads = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    return downloads.filter(d => d.timestamp >= today).length;
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    setPreviewData(null);

    if (!url) {
      setError('Please enter a valid TikTok URL');
      setIsLoading(false);
      return;
    }

    if (!url.includes('tiktok.com')) {
      setError('Please enter a valid TikTok URL');
      setIsLoading(false);
      return;
    }

    if (getTodayDownloads() >= 3) {
      setError('Daily download limit reached');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('url', url);
      formData.append('hd', '1');

      const response = await fetch('https://tikwm.com/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await response.json();

      if (data.code !== 0) {
        throw new Error(data.msg || 'Failed to process video');
      }

      const downloadData: DownloadType = {
        url,
        timestamp: Date.now(),
        author: data.data.author.nickname,
        description: data.data.title,
        stats: {
          plays: data.data.play_count,
          likes: data.data.digg_count,
          comments: data.data.comment_count,
          shares: data.data.share_count
        },
        videoInfo: {
          duration: data.data.duration,
          hdSize: data.data.hd_size,
          musicInfo: data.data.music_info ? {
            title: data.data.music_info.title,
            author: data.data.music_info.author,
            duration: data.data.music_info.duration
          } : undefined
        },
        type: downloadType
      };

      setPreviewData(downloadData);

      const link = document.createElement('a');
      if (downloadType === 'video') {
        link.href = `${data.data.hdplay}`;
        link.download = `tiktok-${data.data.id}.mp4`;
      } else {
        link.href = `${data.data.music}`;
        link.download = `tiktok-${data.data.id}.mp3`;
      }
      document.body.appendChild(link);
      link.click();
      // document.body.removeChild(link);
      
      const updatedDownloads = [...downloads, downloadData];
      setDownloads(updatedDownloads);
      localStorage.setItem('downloads', JSON.stringify(updatedDownloads));
      setSuccess(`${downloadType === 'video' ? 'Video' : 'Music'} download started! The file will begin downloading shortly.`);
      setUrl('');
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to process download. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <img src='src/icon.svg' className="w-10 h-10 text-indigo-600 mr-3" aria-hidden="true"></img>
            <h1 className="text-3xl font-bold text-gray-800">TikTok Downloader</h1>
          </div>

          <DownloadForm
            url={url}
            setUrl={setUrl}
            downloadType={downloadType}
            setDownloadType={setDownloadType}
            todayDownloads={getTodayDownloads()}
            isLoading={isLoading}
            onSubmit={handleDownload}
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-start" role="alert">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-red-800">{error}</p>
                {getTodayDownloads() >= 3 && (
                  <div className="mt-2">
                    <p className="text-gray-700">Consider supporting us to get unlimited downloads!</p>
                    <button className="mt-2 flex items-center text-pink-600 hover:text-pink-700">
                      <Heart className="w-4 h-4 mr-1" aria-hidden="true" />
                      <a href='https://detiknonstop.vercel.app'>Support this project</a>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {success && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center" role="status">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" aria-hidden="true" />
              <p className="text-green-800">{success}</p>
            </div>
          )}

          {previewData && <ContentPreview data={previewData} />}
          <DownloadHistory downloads={downloads} />
        </div>
      </div>
    </div>
  );
}

export default App;