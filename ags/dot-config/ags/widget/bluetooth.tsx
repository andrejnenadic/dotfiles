import { For, onCleanup, With } from "ags";
import AstalBluetooth from "gi://AstalBluetooth";
import { createBinding } from "gnim";
import Gtk from "gi://Gtk?version=4.0";

export function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default();

  bluetooth.adapter?.start_discovery();
  onCleanup(() => {
    bluetooth.adapter?.stop_discovery();
  });

  return (
    <box>
      <menubutton class="bluetooth">
        <box>
          <image iconName="bluetooth" />
          <label
            label={createBinding(bluetooth, "isConnected").as((x) =>
              x
                ? (bluetooth.devices.find((d) => d.connected)?.alias ??
                  "Connected")
                : "-",
            )}
          />
        </box>

        <popover>
          <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
            <For each={createBinding(bluetooth, "devices")}>
              {(dev: AstalBluetooth.Device) => {
                return (
                  <button
                    class={createBinding(dev, "connected").as((x) =>
                      x ? "connected" : "",
                    )}
                    onClicked={() => {
                      if (!dev.paired) {
                        dev.pair();
                      }

                      if (!dev.connected) {
                        dev.connect_device((_, x) => {
                          console.log(x);
                        });
                      }
                    }}
                  >
                    <box>
                      <image
                        iconName={createBinding(dev, "icon").as(
                          (x) => x ?? "dialog-question-symbolic",
                        )}
                      />

                      <label label={createBinding(dev, "alias")} />

                      <With
                        value={createBinding(dev, "batteryPercentage").as(
                          (x) => x >= 0,
                        )}
                      >
                        {(x: boolean) =>
                          x && (
                            <box>
                              <image iconName="battery" />
                              <label
                                label={createBinding(
                                  dev,
                                  "batteryPercentage",
                                ).as((x) => (x * 100).toFixed(0))}
                              />
                            </box>
                          )
                        }
                      </With>
                    </box>
                  </button>
                );
              }}
            </For>
          </box>
        </popover>
      </menubutton>
    </box>
  );
}
