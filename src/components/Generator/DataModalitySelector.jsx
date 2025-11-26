import { FileText, Image } from 'lucide-react';

export default function DataModalitySelector({
  dataModality,
  onModalityChange,
  imageSource,
  onImageSourceChange
}) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-4">Data Type</h3>

      {/* Primary Selection: Text vs Image */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Content Modality
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => onModalityChange('text')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all"
            style={dataModality === 'text'
              ? {
                  backgroundColor: '#1e3a8a',
                  color: 'white',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }
              : {
                  backgroundColor: '#f1f5f9',
                  color: '#334155'
                }
            }
          >
            <FileText size={18} />
            Text
          </button>
          <button
            onClick={() => onModalityChange('image')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all"
            style={dataModality === 'image'
              ? {
                  backgroundColor: '#1e3a8a',
                  color: 'white',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }
              : {
                  backgroundColor: '#f1f5f9',
                  color: '#334155'
                }
            }
          >
            <Image size={18} />
            Image
          </button>
        </div>
      </div>

      {/* Secondary Selection: Image Source (only shown when Image is selected) */}
      {dataModality === 'image' && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Image Source
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => onImageSourceChange('url')}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={imageSource === 'url'
                ? {
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }
                : {
                    backgroundColor: '#f1f5f9',
                    color: '#334155'
                  }
              }
            >
              CSV of URLs
            </button>
            <button
              onClick={() => onImageSourceChange('local')}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={imageSource === 'local'
                ? {
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }
                : {
                    backgroundColor: '#f1f5f9',
                    color: '#334155'
                  }
              }
            >
              Local Files
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {imageSource === 'url'
              ? 'Images hosted online (e.g., S3, cloud storage). Provide CSV with filenames and base URL.'
              : 'Images stored on your computer. Will use base64 encoding.'}
          </p>
        </div>
      )}

      {dataModality === 'text' && (
        <p className="text-xs text-slate-500">
          Text data from a CSV file with a text column.
        </p>
      )}
    </div>
  );
}
