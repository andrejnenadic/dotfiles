import { Astal, Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { createPoll } from "ags/time";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const time = createPoll("", 5000, () => {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const date = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const dayOfWeek = now.toLocaleDateString(undefined, { weekday: "short" });

    return `${hours}:${minutes}, ${dayOfWeek} ${date}.${month}`;
  });

  return (
    <window
      visible
      name="bar"
      class="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={app}
    >
      <box halign={Gtk.Align.START} class="datetime">
        <label label={time} />
      </box>
    </window>
  );
}
