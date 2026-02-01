import { useState, useRef } from "react";
import { Modal } from "../ui/modal";
import { MatchService } from "@/lib/api/services";

interface UploadReplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UploadReplayModal({ isOpen, onClose, onSuccess }: UploadReplayModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await MatchService.upload(formData);

      onSuccess();
      onClose();
      setFile(null);
    } catch (err: any) {
      setError(err.message || "Failed to upload replay");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Replay">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div 
          className="border-2 border-dashed border-surface-border rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 transition-colors bg-background-dark/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".rofl,.webm,.mp4" // Adjust extensions based on game
            onChange={handleFileChange}
            aria-label="Replay file"
          />
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">upload_file</span>
          </div>
          <div className="text-center">
            <p className="text-white font-medium">
              {file ? file.name : "Click to upload or drag and drop"}
            </p>
            <p className="text-sm text-[#9db0b9] mt-1">
              Supported formats: .rofl, .webm, .mp4
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#9db0b9] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !file}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                Uploading...
              </>
            ) : (
              "Upload Replay"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
