import { SunIcon, BedDoubleIcon, MoonIcon, BellIcon } from "lucide-react";
import { format } from "date-fns";

const groupLogsByDate = (sleepLogs: any[], naps: any[]) => {
  const grouped: Record<string, any> = {};

  sleepLogs.forEach(log => {
    const date = log.date;
    if (!grouped[date]) grouped[date] = { wake: null, sleep: null, wakeups: [] };
    if (log.isSleepHour) {
      grouped[date].sleep = log;
    } else {
      grouped[date].wake = log;
    }

    if (log.notes) {
      try {
        const notes = JSON.parse(log.notes);
        grouped[date].wakeups = notes;
      } catch {}
    }
  });

  naps.forEach(nap => {
    const date = nap.date;
    if (!grouped[date]) grouped[date] = {};
    grouped[date].naps = grouped[date].naps || [];
    grouped[date].naps.push(nap);
  });

  return grouped;
};

const SleepTable = ({ sleepLogs, naps }: { sleepLogs: any[]; naps: any[] }) => {
  const logsByDate = groupLogsByDate(sleepLogs, naps);
  const dates = Object.keys(logsByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return (
    <div className="overflow-auto mt-4">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">📅 Día</th>
            <th className="px-4 py-2">
              <SunIcon className="inline w-4 h-4 mr-1 text-yellow-500" />
              Despertar
            </th>
            <th className="px-4 py-2">
              <BedDoubleIcon className="inline w-4 h-4 mr-1 text-green-500" />
              Siestas
            </th>
            <th className="px-4 py-2">
              <MoonIcon className="inline w-4 h-4 mr-1 text-indigo-500" />
              Dormir
            </th>
            <th className="px-4 py-2">
              <BellIcon className="inline w-4 h-4 mr-1 text-pink-500" />
              Despertares nocturnos
            </th>
          </tr>
        </thead>
        <tbody>
          {dates.map(date => {
            const log = logsByDate[date];
            const siestasCount = log.naps?.length || 0;
            const wakeupsCount = log.wakeups?.length || 0;

            return (
              <tr key={date} className="border-t align-top">
                <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">
                  {format(new Date(date), "dd/MM/yyyy")}
                </td>
                <td className="px-4 py-2">{log.wake?.wakeTime || "—"}</td>
                <td className="px-4 py-2 space-y-1">
                  <div className="font-semibold text-green-600 mb-1">
                    {siestasCount} {siestasCount === 1 ? "siesta" : "siestas"}
                  </div>
                  {(log.naps || []).map((nap: any, i: number) => (
                    <div key={i}>
                      {nap.startTime} - {nap.endTime}
                      {nap.notes && (
                        <div className="text-xs text-gray-500">{nap.notes}</div>
                      )}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">{log.sleep?.sleepTime || "—"}</td>
                <td className="px-4 py-2 space-y-1">
                  <div className="font-semibold text-pink-600 mb-1">
                    {wakeupsCount} {wakeupsCount === 1 ? "evento" : "eventos"}
                  </div>
                  {log.wakeups?.length > 0
                    ? log.wakeups.map((event: any, i: number) => (
                        <div key={i} className="text-xs">
                          <span className="font-semibold">{event.time}</span>
                          {event.endTime && <> - {event.endTime}</>}
                          {event.duration && (
                            <span className="ml-2 bg-pink-100 text-pink-800 text-xs rounded-full px-2 py-0.5">
                              {formatDuration(event.duration)}
                            </span>
                          )}
                          {event.notes && (
                            <div className="text-gray-500">{event.notes}</div>
                          )}
                        </div>
                      ))
                    : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SleepTable;
