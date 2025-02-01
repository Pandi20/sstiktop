import React from 'react';
import { ThumbsUp, MessageCircle, Share2, Music } from 'lucide-react';
import { Download } from '../types';
import { formatNumber, formatDuration, formatFileSize } from '../utils';

interface ContentPreviewProps {
  data: Download;
}

export function ContentPreview({ data }: ContentPreviewProps) {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-lg mb-2">Content Information</h3>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">Author:</span>
          <span className="ml-2">{data.author}</span>
        </div>
        {data.description && (
          <p className="text-sm text-gray-600">{data.description}</p>
        )}
        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{formatNumber(data.stats?.likes || 0)} likes</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{formatNumber(data.stats?.comments || 0)} comments</span>
          </div>
          <div className="flex items-center">
            <Share2 className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{formatNumber(data.stats?.shares || 0)} shares</span>
          </div>
        </div>
        {data.videoInfo && (
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div>Duration: {formatDuration(data.videoInfo.duration)}</div>
            <div>Size: {formatFileSize(data.videoInfo.hdSize)}</div>
          </div>
        )}
        {data.videoInfo?.musicInfo && (
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <Music className="w-4 h-4 mr-2" aria-hidden="true" />
            <span>{data.videoInfo.musicInfo.title} - {data.videoInfo.musicInfo.author}</span>
          </div>
        )}
      </div>
    </div>
  );
}