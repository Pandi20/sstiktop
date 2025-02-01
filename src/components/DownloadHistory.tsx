import React from 'react';
import { Video, Music, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Download } from '../types';
import { formatNumber } from '../utils';

interface DownloadHistoryProps {
  downloads: Download[];
}

export function DownloadHistory({ downloads }: DownloadHistoryProps) {
  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Downloads</h2>
      <div className="space-y-3">
        {downloads
          .slice()
          .reverse()
          .slice(0, 5)
          .map((download, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-600">
                {download.type === 'video' ? (
                  <Video className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                ) : (
                  <Music className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                )}
                <span className="truncate"><a href={download.url}>{download.url}</a></span>
                <span className="ml-auto text-gray-400">
                  {new Date(download.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {download.author && (
                <div className="mt-1 text-sm text-gray-500">
                  By: {download.author}
                </div>
              )}
              {download.description && (
                <div className="mt-1 text-sm text-gray-500 truncate">
                  {download.description}
                </div>
              )}
              {download.stats && (
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  <div className="flex items-center">
                    <ThumbsUp className="w-3 h-3 mr-1" aria-hidden="true" />
                    {formatNumber(download.stats.likes)}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1" aria-hidden="true" />
                    {formatNumber(download.stats.comments)}
                  </div>
                  <div className="flex items-center">
                    <Share2 className="w-3 h-3 mr-1" aria-hidden="true" />
                    {formatNumber(download.stats.shares)}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}