import { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import { ScrimService, Scrim } from "@/lib/api/services";

interface ScheduleScrimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Scrim | null;
}

export function ScheduleScrimModal({ isOpen, onClose, onSuccess, initialData }: ScheduleScrimModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    team_name: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      const d = new Date(initialData.date);
      // Format date as YYYY-MM-DD (Local)
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      // Format time as HH:MM (Local)
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}`;
      
      setFormData({
        team_name: initialData.team_name,
        date: dateStr,
        time: timeStr,
        notes: initialData.notes || "",
      });
    } else {
        // Only reset if opening fresh (no initialData)
        if (isOpen && !initialData) {
            setFormData({
                team_name: "",
                date: "",
                time: "",
                notes: "",
            });
        }
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Combine date and time
      const dateTime = new Date(`${formData.date}T${formData.time}`).toISOString();
      const payload = {
        team_name: formData.team_name,
        date: dateTime,
        notes: formData.notes,
      };

      if (initialData) {
        await ScrimService.update(initialData.id, payload);
      } else {
        await ScrimService.schedule(payload);
      }

      onSuccess();
      onClose();
      // Reset form if it was a create action
      if (!initialData) {
        setFormData({ team_name: "", date: "", time: "", notes: "" });
      }
    } catch (err: any) {
      setError(err.message || "Failed to save scrim");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Scrim Block" : "Schedule New Scrim"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#9db0b9]">Opponent Team</label>
          <input
            type="text"
            required
            className="bg-background-dark border border-surface-border rounded-lg p-2 text-white focus:outline-none focus:border-primary"
            placeholder="e.g. Team Liquid"
            value={formData.team_name}
            onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#9db0b9]">Date</label>
            <input
              type="date"
              required
              className="bg-background-dark border border-surface-border rounded-lg p-2 text-white focus:outline-none focus:border-primary"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#9db0b9]">Time</label>
            <input
              type="time"
              required
              className="bg-background-dark border border-surface-border rounded-lg p-2 text-white focus:outline-none focus:border-primary"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#9db0b9]">Notes</label>
          <textarea
            className="bg-background-dark border border-surface-border rounded-lg p-2 text-white focus:outline-none focus:border-primary min-h-[100px]"
            placeholder="Focus areas, restrictions, etc."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
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
            disabled={loading}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                {initialData ? "Saving..." : "Scheduling..."}
              </>
            ) : (
              initialData ? "Save Changes" : "Schedule Scrim"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
