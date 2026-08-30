import { Astal, Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { createPoll } from "ags/time";
import AstalHyprland01 from "gi://AstalHyprland";
import { Accessor, createBinding, onCleanup, With } from "gnim";
import { Audio } from "./audio";
import { Workspace } from "./workspace";

export function Bar({
  gdkmonitor,
  expanded,
}: {
  gdkmonitor: Gdk.Monitor;
  expanded: Accessor<boolean>;
}) {
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

  const hypr = AstalHyprland01.get_default();

  hypr.connect("event", (_, event, ...args) => {
    const syncWindow = (fullscreen: boolean) => {
      win.layer = Astal.Layer.TOP;
      if (fullscreen) {
        win.layer = expanded() ? Astal.Layer.OVERLAY : Astal.Layer.BOTTOM;
      } else {
        win.exclusivity = Astal.Exclusivity.EXCLUSIVE;
        win.layer = Astal.Layer.OVERLAY;
      }
    };

    if (event === "fullscreen") {
      syncWindow(+args[0] !== 0);
    } else if (event === "workspacev2") {
      syncWindow(hypr.focusedWorkspace.hasFullscreen);
    }
  });

  expanded.subscribe(() => {
    win.layer = Astal.Layer.TOP;

    if (expanded()) {
      win.layer = Astal.Layer.OVERLAY;
    } else {
      win.layer = Astal.Layer.BOTTOM;
    }
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
      heightRequest={40}
    >
      <centerbox valign={Gtk.Align.CENTER}>
        <box $type="start" class="datetime">
          <label label={time} />
        </box>

        <box $type="end" class="basic-info">
          <With value={expanded}>
            {(x) =>
              x && (
                <box spacing={12}>
                  <Audio />
                  <Workspace />
                </box>
              )
            }
          </With>
        </box>
      </centerbox>
    </window>
  );
}
