import { Widget, Bluetooth, Utils } from "../../imports.js";
const { execAsync } = Utils
const { Box } = Widget;

export const BluetoothWidget = () =>
	Widget.Button({
		onClicked: () => Bluetooth.toggle(),
        onSecondaryClickRelease: () => {
            execAsync(['bash', '-c', 'blueman-manager', '&']);
            App.closeWindow('dashboard');
        },
		child: Box({
			className: "bluetooth",
			vpack: "center",
			vexpand: true,
			setup: (self) => {
				self.hook(Bluetooth, (self) => {
					if (Bluetooth.enabled) {
						self.toggleClassName("off", false);
					} else {
						self.toggleClassName("off", true);
					}
				});
			},
			children: [
				Widget.Label({
					className: "bluetoothIcon",
					label: "󰂲",
					setup: (self) => {
						self.hook(Bluetooth, (self) => {
							if (Bluetooth.enabled) {
								self.label = "󰂯";
							} else {
								self.label = "󰂲";
							}
						});
					},
				}),
				Box({
					vertical: true,
					vpack: "center",
					children: [
						Widget.Label({
							className: "bluetoothLabel",
							label: "Bluetooth",
							hpack: "start",
						}),
					],
				}),
			],
		}),
	});
