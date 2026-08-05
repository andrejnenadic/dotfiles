import { Astal, Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { createPoll } from "ags/time";
import { createBinding, onCleanup } from "gnim";
import { Audio } from "./audio";

export function Bar({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
  let win: Astal.Window = null!;
  onCleanup(() => {
    // Root components (windows) are not automatically destroyed.
    win?.destroy();
  });

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
      $={(self) => (win = self)}
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
      <centerbox>
        <box $type="start" class="datetime">
          <label label={time} />
        </box>

        <box $type="end" class="basic-info">
          <Audio />
        </box>
      </centerbox>
    </window>
  );
}
