import { createPoll } from "ags/time";
import { scripts } from "../app";
import { Accessor, With } from "gnim";
import Gtk from "gi://Gtk?version=4.0";

type Stats = Partial<{
  cpu: {
    usage: number;
    temp: number;
  };
  gpu: {
    usage: number;
    temp: number;
    used_vram: number;
    total_vram: number;
  };
  memory: {
    used: number;
    total: number;
  };
  disk: {
    used: number;
    total: number;
  };
}>;

export function Stats({ expanded }: { expanded: Accessor<boolean> }) {
  const stats = createPoll(
    "",
    5000,
    `bash -c "scripts/stats.sh"`,
  ).as<Stats | null>((statsJson) => {
    try {
      return JSON.parse(statsJson) as Stats;
    } catch {
      return null;
    }
  });

  return (
    <box $type="end">
      <With value={stats}>
        {(x) =>
          x && (
            <box
              orientation={Gtk.Orientation.VERTICAL}
              spacing={12}
              class="stats-container"
            >
              {x.cpu && (
                <box class="stat" orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                  <label xalign={Gtk.Align.START} label="CPU" />
                  <label
                    xalign={Gtk.Align.START}
                    label={`Usage: ${x.cpu.usage.toFixed(0)}%`}
                  />
                  <label
                    xalign={Gtk.Align.START}
                    label={`Temp: ${x.cpu.temp.toFixed(0)}°C`}
                  />
                </box>
              )}

              {x.gpu && (
                <box class="stat" orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                  <label xalign={Gtk.Align.START} label="GPU" />
                  <label
                    xalign={Gtk.Align.START}
                    label={`Usage: ${x.gpu.usage.toFixed(0)}%`}
                  />
                  <label
                    xalign={Gtk.Align.START}
                    label={`Temp: ${x.gpu.temp.toFixed(0)}°C`}
                  />
                  <label
                    xalign={Gtk.Align.START}
                    label={`VRAM: ${(x.gpu.used_vram / 1024).toFixed(
                      2,
                    )} GB / ${(x.gpu.total_vram / 1024).toFixed(2)} GB`}
                  />
                </box>
              )}

              {x.memory && (
                <box class="stat" orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                  <label xalign={Gtk.Align.START} label="RAM" />
                  <label
                    xalign={Gtk.Align.START}
                    label={`Usage: ${(
                      (x.memory.used / x.memory.total) *
                      100
                    ).toFixed(0)}%`}
                  />
                  <label
                    xalign={Gtk.Align.START}
                    label={`Used: ${(x.memory.used / 1024).toFixed(
                      2,
                    )} GB / ${(x.memory.total / 1024).toFixed(2)} GB`}
                  />
                </box>
              )}

              {x.disk && (
                <box class="stat" orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                  <label xalign={Gtk.Align.START} label="Disk" />
                  <label
                    xalign={Gtk.Align.START}
                    label={`Usage: ${(
                      (x.disk.used / x.disk.total) *
                      100
                    ).toFixed(0)}%`}
                  />
                  <label
                    xalign={Gtk.Align.START}
                    label={`Used: ${(x.disk.used / 1024).toFixed(
                      2,
                    )} GB / ${(x.disk.total / 1024).toFixed(2)} GB`}
                  />
                </box>
              )}
            </box>
          )
        }
      </With>
    </box>
  );
}
